const {CustomerModel} = require("../models/index");

exports.getCustomerUserByID = async (userId) => {

    try {

        const user = await CustomerModel.findById(userId);

        return user;

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
    
}

exports.getCustomerByEmail = async (userEmail) => {

    try {

        const user = await CustomerModel.findOne({email:userEmail});

        return user

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
    
}