const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String
    },
    address:[{
        type:Schema.Types.ObjectId,
        ref:"AddressModel",
        require:true
    }],
    cart:[{
        product:{
            _id:{type:String,require:true},
            name:{type:String,require:true},
            category:{type:String,require:true},
            price:{type:Number,require:true},
        },
        unit:{
            type:Number,
            require:true
        }
    }],
    order:[{
        _id: {type: String, required: true},
        amount: { type: String},
        date: {type: Date, default: Date.now()}
    }]


},{
    toJSON:{
        transform(doc,ret){
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret.__v,
            delete ret.password
        }
    }
})

const CustomerModel = mongoose.model("CustomerModel", CustomerSchema);

module.exports = CustomerModel;