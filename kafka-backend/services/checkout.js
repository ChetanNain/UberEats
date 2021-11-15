const Cart = require("../schema/Cart.js");
var jwt = require('jsonwebtoken');
const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";


async function handle_request(req, callback){
    console.log(req);
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    await Cart.updateMany({$and: [{mobileNumber: decoded.mobileNumber}, {checkedOut: 0}] }, { $set: { checkedOut: 1, specialInstruction: req.body.specialInstruction, date: new Date().toISOString() } });
//    res.sendStatus(200);
    callback(null, {status:200});

    
};  
 
exports.handle_request = handle_request;