const {CustomerModel,AddressModel} = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require("../utils/tokenHelper");


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

        const users = await CustomerModel.find();

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

        const checkAddress = await AddressModel.findOne({street:address.street});

        if(checkAddress){
            return res.json({
                "response":"Address is already added"
            })
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