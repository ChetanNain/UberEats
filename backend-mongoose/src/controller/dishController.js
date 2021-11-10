const Dish = require("../schema/Dishes");
var jwt = require('jsonwebtoken');

const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";

async function getDishes(req, res) {
    let query  = Dish.find({}).populate("restaurantId");
    if(req.body.mealType?.length){
        query = query.where('dishType').in(req.body.mealType)
    }
    if(req.body.dishType?.length){
      query = query.where('dishTag').in(req.body.dishType)
    }
    if( req.body.dishCategory?.length){
      query = query.where('dishCategory').in(req.body.dishCategory)
    }
    if( req.body.restaurantType?.length){
      query = query.where('restaurantType').in(req.body.restaurantType)
    }
      let dish = await query.exec();
      if(req.body.searchQuery) {
        dish = dish.filter(row => {
          const searchArr = [row.dishName?.toLowerCase(), row.city?.toLowerCase(), row.dishTag?.toLowerCase(), row.dishType?.toLowerCase(), row.name?.toLowerCase(), row.dishCategory?.toLowerCase()];
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
    var myquery = { _id: req.params.dishID };
    Dish.findByIdAndDelete(req.params.dishID);
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

