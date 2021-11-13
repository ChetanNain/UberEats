const Cart = require("../schema/Cart.js");
var jwt = require('jsonwebtoken');

const Restaurant = require("../schema/Restaurant")


async function handle_request(req, callback){
    console.log(req)
    let matcher = { customerMobileNumber: { $eq: req.mobileNumber } }
    console.log("matcher",matcher);
    let query = Cart.find(matcher).populate("dishId").exec();
    //console.log("cart request", req);
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
    callback(null, response);
};
 
exports.handle_request = handle_request;


