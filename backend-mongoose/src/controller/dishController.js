const Dish = require("../schema/Dishes");
var jwt = require('jsonwebtoken');

const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";



//const resList = await Restaurants.find();

async function getDishes(req, res) {
  let searchStringRegex = new RegExp(req.body.searchQuery.toLowerCase(), "i");
  let query  = Dish.find({}).populate("restaurantId");
  
  //let query  = await Dish.find({ $or: [ {dishName: searchStringRegex}, {'restaurantId.city': searchStringRegex},  {'restaurantId.name': searchStringRegex},  ] }).populate("restaurantId");
    if(req.body.mealType?.length){
      //console.log("mealType", req.body.mealType)
      query = query.where('dishType').in(req.body.mealType)
    }
    if(req.body.dishType?.length){
      //console.log("dishType", req.body.dishType)
      query = query.where('dishTag').in(req.body.dishType)
    }
    if( req.body.dishCategory?.length){ 
      //console.log("dishCategory", req.body.dishCategory)
      query = query.where('dishCategory').in(req.body.dishCategory) 
    }
    if( req.body.restaurantType?.length){
      //console.log("restaurantType", req.body.restaurantType)
      query = query.where('restaurantType').in(req.body.restaurantType)
      //console.log("printing Query", query);
    }
     // console.log("Searchquery1", query);
      let dish = await query.exec();
      console.log("DishList", dish);
     // console.log("DishSearch", query);
      /* if(req.body.restaurantType[0]) {
        dish = dish.filter(row => {
          console.log("restaurant array",req.body.restaurantType);
          const searchArr = [row.restaurantId.restaurantType.toLowerCase()];
          return searchArr.join(" ").includes(req.body.restaurantType[0].toLowerCase())
        });
      } */
      if(req.body.searchQuery) {
        dish = dish.filter(row => {
          const searchArr = [row.dishName?.toLowerCase(), row.restaurantId.city?.toLowerCase(), row.dishTag?.toLowerCase(), row.dishType?.toLowerCase(), row.name?.toLowerCase(), row.dishCategory?.toLowerCase()];
          return searchArr.join(" ").includes(req.body.searchQuery.toLowerCase())
        });
      }
      res.status(200).json(dish);
  } 



  async function addDish (request, response){
    await Dish.insertOne(request.body);
    res.sendStatus(200);
  }


  async function removeDish(req, res){
    console.log("request", req.params.dishID);
    var myquery = { _id: req.params.dishID };
    await Dish.findOneAndDelete(req.params.dishID);
    res.sendStatus(200);
  }

  async function getMenuDetail(req, res){
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    var myquery = { restaurantMobileNumber: decoded.data.mobileNumber };
    const restaurant = await Dish.find(myquery);
    res.json(restaurant);
  }



  module.exports = {
      getDishes,
      addDish,
      removeDish,
      getMenuDetail
  }

