const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverConfig = require("./configs/server.config");
const dbConnection = require("./configs/db.config");
const {

        CustomerRouter,

    } = require("./routes/index");



const app = express();

const startServer = async() => {


    // middlewares
    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(CustomerRouter);

    // test api
    app.get("/",(req,res)=>{
        res.json({"response":"For Customer"})
    })

    app.listen(serverConfig.PORT,async () => {

        console.log(`Customer Service started at ${serverConfig.PORT}`);
        await dbConnection();
        
    })
}

startServer();