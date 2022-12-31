const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../configs/server.config");

exports.createToken = (id,email) => {

    const token = jwt.sign({id,email}, JWT_SECRET, { expiresIn: '2d' });

    return token;
}

exports.verifyToken = (token) => {

    const decode = jwt.verify(token,JWT_SECRET);

    return decode;
}