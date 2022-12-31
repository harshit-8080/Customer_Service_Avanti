const jwt  = require("jsonwebtoken");
const {JWT_SECRET} = require("../configs/server.config");

exports.auth = async (req, res,next) => {

    try {

        const token = req.get("Authorization");
        
        if(token){
            const payload  = await jwt.verify(token.split(" ")[1],JWT_SECRET);
            req.id = payload.id;
            req.email = payload.email;
            next();
        }
        else{
            return res.json({
                "msg":'Invalid Token'
            })
        }

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
    
}