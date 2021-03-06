const Dish = require("../schema/Dishes");
const Cart = require("../schema/Cart");
const Customers = require('../schema/Customers');
const Restaurant = require('../schema/Restaurant');

var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";

const SALT_ROUNTD = 10;

async function addToCart(req, res) {
    console.log("req.query", req.query.type)
    const type = req.query.type || 0;
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    const dish = await Dish.findById(req.params.dishId);
    cartData = {
        customerMobileNumber: decoded.data.mobileNumber,
        dishId: req.params.dishId,
        restaurantMobileNumber: dish.restaurantMobileNumber,
        quantity: 1,
        itemPrice: parseFloat(dish.dishPrice),
        totalPrice: dish.dishPrice * 1,
        checkedOut: req.query.type,
    };
    const cart = new Cart(cartData);
    await cart.save();
    res.sendStatus(200);
}

async function removeFromCart(req, res) {
    var myquery = { _id: req.body.itemId };
    await Cart.findByIdAndRemove(myquery);
    res.sendStatus(200);
}

async function checkout(req, res) {
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    await Cart.updateMany({$and: [{mobileNumber: decoded.mobileNumber}, {checkedOut: 0}] }, { $set: { checkedOut: 1, specialInstruction: req.body.specialInstruction, date: new Date().toISOString() } });
    res.sendStatus(200);
}

async function updateOrderStatus(req, res) {
    console.log("orderId", req.body.orderId);
    console.log("orderStatus", req.body.orderStatus);
    await Cart.updateOne({ _id: req.body.orderId }, { $set: { status: req.body.orderStatus } });
    res.sendStatus(200);
}


async function addUser(args) {
    let req = {};
    req.body = {...args};
    console.log("reqeust body",req.body)
    bcrypt.hash(req.body.password, SALT_ROUNTD, async function (err, hash) {
        let uType = 0;
        if (req.body.userType == "Restaurant") {
            uType = 1;
        }
        const customer = await Customers.findOne({
            mobileNumber: req.body.mobileNumber,
        });
        var customerObj = {
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            password: hash,
            profilePicture: req.body.uploadedFile,
            address: [{ address: req.body.address, city: req.body.city, state: req.body.provience, country: req.body.country }]
        };
        if (customer) {
            Customers.updateOne(
                { mobileNumber: req.body.mobileNumber },
                { $set: customerObj },
                function (err, result) {
                    if (err) throw err;
                   return true;
                }
            );
        } else {
            customerObj = {
                fullName: req.body.fullName,
                dateOfBirth: req.body.dateOfBirth,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: hash,
                address: [{ address: req.body.address, city: req.body.city, state: req.body.provience, country: req.body.country }],
                restFlg: uType
            };
            const newCustomer = new Customers(customerObj);
            const data = newCustomer.save();
            if (data) {
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
                return {
                        fullName: req.body.fullName,
                        email: req.body.email,
                        mobileNumber: req.body.mobileNumber,
                        role: uType,
                    }
            }
        }
    });
}

async function getCart(context) {
    const tokenHeader = context.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    let matcher = { customerMobileNumber: { $eq: decoded.data.mobileNumber } };
    let query = Cart.find(matcher).populate("dishId").exec();
    var response = await query;
    const restaurantMobileNumbers = response.map(response1 => {
        return response1.restaurantMobileNumber
    })
    const listOfRest = await Restaurant.find({ $in: restaurantMobileNumbers });
    const finalObject = response.map(resp => {
        listOfRest.map(restaurant => {
            if (restaurant.mobileNumber == resp.restaurantMobileNumber) {
                resp.restaurantName = restaurant.name
                return resp;
            }
        })
    })
    return response;
}

async function getOrders(context){
    const tokenHeader = context.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    let response = [];
    console.log("data", decoded.data);
    if(decoded.data.role == 0){
        response = await Cart.find({customerMobileNumber: decoded.data.mobileNumber , checkedOut: 1})//.populate("dishId").exec();
    }else{
        response = await Cart.find({restaurantMobileNumber: decoded.data.mobileNumber , checkedOut: 1})//.populate("dishId").exec();
    }
    return response;
  }

  async function getCustomerBasicDetail(req, res){
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    let response = await Customers.findOne({mobileNumber: decoded.data.mobileNumber});
    res.status(200).json(response);
  }

  async function login(req, res){
     const mobileNumber = req.body.mobileNumber
      const password = req.body.password
    const results = await Customers.find({email: mobileNumber});
        if(results.length > 0){
            bcrypt.compare(password, results[0].password, function(err, result){
                if(!err){
                    const token = jwt.sign({
                        data: {
                            fullName: results[0].fullName,
                            email: results[0].email,
                            mobileNumber: results[0].mobileNumber,
                            role: results[0].restFlg,
                        }
                      }, SECRET_KEY, { expiresIn: '12h' });
                     res.send({
                        token: token,
                        msg: 'LoggedIn successfully',
                        data: {
                         fullName: results[0].fullName,
                         email: results[0].email,
                         mobileNumber: results[0].mobileNumber,
                         role: results[0].restFlg
                        }
                    })
                  }
                })
              }else{
                res.send("Invalid user name or password");
              }
  }

  async function logout(req, res) {
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    const token = jwt.sign({
        data: {
            fullName: decoded.data.fullName,
            email: decoded.data.email,
            mobileNumber: decoded.data.mobileNumber,
            role: decoded.data.restFlg,
        }
      }, SECRET_KEY, { expiresIn: '-1s' });
      res.status(200).json({
        token: token,
        msg: 'Logged out successfully',
        data: {
         fullName:  decoded.data.fullName,
         email:  decoded.data.email,
         mobileNumber:  decoded.data.mobileNumber,
         role:  decoded.data.restFlg
        }
    })
  }

async function updateCart (req, res){
    await Cart.updateOne({_id: req.query.id}, {$set: {quantity: req.query.quantity}});
    res.sendStatus(200);
}

module.exports = {
    addToCart,
    removeFromCart,
    checkout,
    updateOrderStatus,
    addUser,
    getCart,
    getOrders,
    getCustomerBasicDetail,
    login,
    logout,
    updateCart
}