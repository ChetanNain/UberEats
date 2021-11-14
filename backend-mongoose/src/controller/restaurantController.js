const Restaurant = require("../schema/Restaurant");
const Dish = require('../schema/Dishes');
var jwt = require('jsonwebtoken');

const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";

async function getRestaurant (req, res){
        const tokenHeader = req.headers[AUTHENTICATION_HEADER];
        if (tokenHeader != "null") {
          var decoded = jwt.verify(tokenHeader, SECRET_KEY);
          try {
            var restaurantMobileNumber = {
              restaurantMobileNumber: decoded.data.mobileNumber,
            };
            const restaurant = await Restaurant.find(restaurantMobileNumber);
            res.json(restaurant);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        }
}

async function addBasicDetail (req, res){
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    const find = await Restaurant.findOne({mobileNumber: decoded.data.mobileNumber})
    const restObj = {...req.body,
      mobileNumber: decoded.data.mobileNumber};
      console.log(restObj);
      console.log(find);
    if(find){
      Restaurant.updateOne(
        { mobileNumber: decoded.data.mobileNumber },
        { $set: restObj },
        function (err, result) {
          if (err) throw err;
          console.log("1 document updated");
          res.sendStatus(200);
        }
      );
    }else{
    const rest = new Restaurant(restObj);
    const data  = await rest.save();
    res.status(200).json({data})
    }
    }

async function addMenu(req, res){
        const tokenHeader = req.headers[AUTHENTICATION_HEADER];
        var decoded = jwt.verify(tokenHeader, SECRET_KEY);
        let matcher = {mobileNumber: { $eq: decoded.data.mobileNumber } };
        const restaurant = await Restaurant.findOne(matcher);
        const dish = {
          restaurantMobileNumber: decoded.data.mobileNumber,
          dishName: req.body.dishName,
          mainIngredients: req.body.dishIngredients,
          dishImage: req.body.image,
          dishPrice: req.body.dishPrice,
          description: req.body.dishDescription,
          dishCategory: req.body.dishCategory,
          dishTag: req.body.mealType,
          dishType: req.body.dishType,  
          restaurantId:  restaurant._id,
      };
        const dishObj = new Dish(dish);
        const dishId = req.body.dishId || undefined;
        const existingDish = await Dish.findById(dishId);
        if(existingDish){
          dishObj._id =  dishId
          const d = await Dish.updateOne({ _id:dishId},
            {$set: dishObj}
            );
              res.json(d);
        } else{
            const data  = await dishObj.save();
            console.log("Save Data.")
            res.status(200).json({data})
        }
      }

async function restaurantDishes(req, res) {
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    
    if (tokenHeader != "null") {
        var decoded = jwt.verify(tokenHeader, SECRET_KEY);
        const mobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber;
        try {
        var restaurantMobileNumber = { restaurantMobileNumber: mobileNumber };
        const restaurant = await Dish.find(restaurantMobileNumber);
        res.json(restaurant);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }
}

async function basicDetail(req, res){
    const tokenHeader = req.headers[AUTHENTICATION_HEADER];
    var decoded = jwt.verify(tokenHeader, SECRET_KEY);
    const mobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber;
    if (tokenHeader != "null") {
        var restaurantMobileNumber = { mobileNumber: mobileNumber };
        const restaurant = await Restaurant.findOne(restaurantMobileNumber);
        res.json(restaurant);
    }
  }

module.exports = {
    getRestaurant,
    addBasicDetail,
    addMenu,
    restaurantDishes,
    basicDetail
};