const {CustomerModel,AddressModel} = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require("../utils/tokenHelper");
const CustomerService = require("../services/customer.service");

exports.signupCustomer = async (req, res) => {

    try {
        
        const user = {
            name:req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        }

        const checkUser = await CustomerModel.findOne({email:user.email})

        if(checkUser){
            return res.json({
                "response":"User is already on the app"
            })
        }

        const salt =  passwordHelper.generateSalt();
        user.password =  passwordHelper.hashPassword(user.password,salt);


        const response = await CustomerModel.create(user);
        if(response){

            const token = tokenHelper.createToken(response._id,response.email);
            return res.json({
                "success":true,
                "response":response,
                "otp":'success',
                "token":token
            })
        }else{
            throw "something went wrong"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.getCustomer = async (req, res) => {

    try {

        const user = await CustomerModel.findById(req.params.customerId)
        .populate("address");

        if(user){
            return res.json({
                "success":true,
                "response":user
            })
        }
        else{
            return res.json({
                "success":false,
                "response":"user not found"
            })
        }

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.getAllCustomer = async (req, res) => {

    try {

        const users = await CustomerModel.find()
        .populate("address");

        if(users){
            return res.json({
                "success":true,
                "response":users
            })
        }
        else{
            return res.json({
                "success":false,
                "response":"users not found"
            })
        }

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.addAddress = async(req, res) => {

    try {
        
        const address = {
            street:req.body.street,
            pincode: req.body.pincode,
            city: req.body.city,
            country: req.body.country
        }

        const response = await AddressModel.create(address);
        if(response){

            const customer = await CustomerModel.findById(req.id);
            if(customer){
                customer.address.push(response);
                await customer.save();
            }

            
            return res.json({
                "success":true,
                "response":response
            })
        }else{
            throw "something went wrong"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.deleteAddress = async(req, res) => {

    try {
        
        const response = await AddressModel.deleteMany({city:"Chapra"});
        
        return res.json({
            "success":true,
            "response":response
        })

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.addToCart = async(req, res) => {

    try {
        
        const customer = await CustomerService.getCustomerUserByID(req.id);
        if(!customer){
            return res.json({
                "success":false,
                "response":"No User Found"
            })
        }

        const product = {
            _id:req.body.productId,
            name:req.body.name,
            category:req.body.category,
            price:req.body.price
        }
        const unit = req.body.unit;


        if(customer.cart.length > 0){
                
            let exitFood = false;
            customer.cart.forEach((p)=>{
                if(p.product._id == product._id){
                    if(unit > 0){
                        p.unit = unit;
                    }else{
                        customer.cart.remove(p);
                    }
                    exitFood = true;        
                }
            })
            if(!exitFood){
                customer.cart.push({product:product,unit:unit});
            }
        }
        else{
            customer.cart.push({product:product,unit:unit});
        }

        await customer.save();

        return res.json({
            "success":true,
            "response":customer.cart
        })

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
    
}

exports.addOrder = async(req, res) => {

    try {
        
        const order = {
            _id:req.body.orderId,
            amount: req.body.amount,
            date:new Date()
        }

        const customer = await CustomerService.getCustomerUserByID(req.id);
        if(customer){

            customer.order.push(order);
            customer.cart = [];
            await customer.save();
            
            return res.json({
                "success":true,
                "response":customer
            })
        }else{
            throw "something went wrong"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.subscribeEvents = async(req, res) => {

    const event = req.body.event;

    switch(event){

        case 'getAllCustomer':
            this.getAllCustomer(req,res);
            break;

        case 'getAllCustomer':
            this.getCustomer(req,res);
            break;   

        case 'test':
            console.log("checkkk");
            return res.json({
                "response":"this is test check"
            })
            break;   

        default:
            return res.json({
                "msg":"Invalid Event"
            })
            break     
            
    }

}