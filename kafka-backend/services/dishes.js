const Dish = require("../schema/Dishes");
var jwt = require('jsonwebtoken');

const Restaurant = require("../schema/Restaurant")
const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";

async function handle_request(req, callback){
    let query  = Dish.find({}).populate("restaurantId");
    //console.log("request",req);
    if(req.mealType?.length){
        query = query.where('dishType').in(req.mealType)
    }
    if(req.dishType?.length){
      query = query.where('dishTag').in(req.dishType)
    }
    if( req.dishCategory?.length){
      query = query.where('dishCategory').in(req.dishCategory)
    }
    if( req.restaurantType?.length){
      query = query.where('restaurantType').in(req.restaurantType) 
    }
      let dish = await query.exec();
      if(req.searchQuery) {
        dish = dish.filter(row => {
          const searchArr = [row.dishName?.toLowerCase(), row.city?.toLowerCase(), row.dishTag?.toLowerCase(), row.dishType?.toLowerCase(), row.name?.toLowerCase(), row.dishCategory?.toLowerCase()];
          return searchArr.join(" ").includes(req.searchQuery.toLowerCase())
      });
      }
    callback(null, dish);
};

exports.handle_request = handle_request;


