const Customers = require("../schema/Customers.js");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Restaurant = require("../schema/Restaurant")
const SALT_ROUNTD = 10;
const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";
async function handle_request(req, callback){
    console.log("==============================================1", req.body);
    bcrypt.hash(req.body.password, SALT_ROUNTD, async function (err, hash) {
        console.log("==============================================2");
        let uType = 0;
        if (req.body.userType == "Restaurant") {
            uType = 1;
        }
        const customer = await Customers.findOne({
            mobileNumber: req.body.mobileNumber,
        });
        //console.log("==================Customer--->",customer);
        var customerObj = {
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            password: hash,
            profilePicture: req.body.uploadedFile,
            address: [{ address: req.body.address, city: req.body.city, state: req.body.provience, country: req.body.country }]
        };
        console.log("==============CUSTOMER OBJECT-> ",customerObj);
        if (customer) {
            //console.log("==============================================3",customer);
            Customers.updateOne(
                { mobileNumber: req.body.mobileNumber },
                { $set: customerObj },
                function (err, result) {
                    if (err) throw err;
                    //res.sendStatus(200);
                    callback(null,{status: 200, response: {}})
                } 
            );
        } else {
            console.log("==============================================4");
            customerObj = {
                fullName: req.body.fullName,
                dateOfBirth: req.body.dateOfBirth,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: hash,
                address: [{ address: req.body.address, city: req.body.city, state: req.body.state, country: req.body.country }],
                restFlg: uType
            };
            const newCustomer = new Customers(customerObj);
            const data = newCustomer.save();
            if (data) {
                console.log("==============================================5");
                const token = jwt.sign(
                    {
                        data: {
                            fullName: req.body.fullName,
                            email: req.body.email,
                            mobileNumber: req.body.mobileNumber,
                            role: req.body.restFlg,
                        },
                    },
                    SECRET_KEY,
                    { expiresIn: "12h" }
                );
                // res.status(200).json({
                //     token: token,
                //     msg: "LoggedIn successfully",
                //     data: {
                //         fullName: req.body.fullName,
                //         email: req.body.email,
                //         mobileNumber: req.body.mobileNumber,
                //         role: uType,
                //     },
                // });
                const response = {
                    token: token,
                    msg: "LoggedIn successfully",
                    data: {
                        fullName: req.body.fullName,
                        email: req.body.email,
                        mobileNumber: req.body.mobileNumber,
                        role: uType,
                    },
                }
                console.log("==============================================6", response);
                            
            }
        }
    });
    // callback(null, {a: 2})


    
};
 
exports.handle_request = handle_request;















// async function addUser(req, res) {
//     bcrypt.hash(req.body.password, SALT_ROUNTD, async function (err, hash) {
//         let uType = 0;
//         if (req.body.userType == "Restaurant") {
//             uType = 1;
//         }
//         const customer = await Customers.findOne({
//             mobileNumber: req.body.mobileNumber,
//         });
//         var customerObj = {
//             fullName: req.body.fullName,
//             dateOfBirth: req.body.dateOfBirth,
//             email: req.body.email,
//             mobileNumber: req.body.mobileNumber,
//             password: hash,
//             profilePicture: req.body.uploadedFile,
//             address: [{ address: req.body.address, city: req.body.city, state: req.body.state, country: req.body.country }]
//         };
//         if (customer) {
//             Customers.updateOne(
//                 { mobileNumber: req.body.mobileNumber },
//                 { $set: customerObj },
//                 function (err, result) {
//                     if (err) throw err;
//                     res.sendStatus(200);
//                 }
//             );
//         } else {
//             customerObj = {
//                 fullName: req.body.fullName,
//                 dateOfBirth: req.body.dateOfBirth,
//                 email: req.body.email,
//                 mobileNumber: req.body.mobileNumber,
//                 password: hash,
//                 address: [{ address: req.body.address, city: req.body.city, state: req.body.state, country: req.body.country }],
//                 restFlg: uType
//             };
//             const newCustomer = new Customers(customerObj);
//             const data = newCustomer.save();
//             if (data) {
//                 const token = jwt.sign(
//                     {
//                         data: {
//                             fullName: req.body.fullName,
//                             email: req.body.email,
//                             mobileNumber: req.body.mobileNumber,
//                             role: req.body.restFlg,
//                         },
//                     },
//                     SECRET_KEY,
//                     { expiresIn: "12h" }
//                 );
//                 res.status(200).json({
//                     token: token,
//                     msg: "LoggedIn successfully",
//                     data: {
//                         fullName: req.body.fullName,
//                         email: req.body.email,
//                         mobileNumber: req.body.mobileNumber,
//                         role: uType,
//                     },
//                 });
//             }
//         }
//     });
// }
