const jwt = require('jsonwebtoken');
const JWT_SECRET = "paytm-aditya";

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            error : "Authorization header is missing"
        })
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            error : "Token is missing"
        })
    }
    try{
        const decode = jwt.verify(token, JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch(err){
        return res.status(401).json({
            error : "Invalid token" })
}}

module.exports = authMiddleware;
