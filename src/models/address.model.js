const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({

    street:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    }
},{
    toJSON:{
        transform(doc,ret){
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret.__v
        }
    }
})

const AddressModel = mongoose.model("AddressModel", AddressSchema);

module.exports = AddressModel;
