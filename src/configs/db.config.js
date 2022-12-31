const MONGO_URL = process.env.MONGO_URL;
const mongoose = require("mongoose");

const dbConnection = async() => {

    await mongoose.connect(MONGO_URL)
    .then((r)=>{
        console.log("db connected");
    }).catch((e)=>{
        console.log("db connection falied");
    })
}


module.exports = dbConnection;