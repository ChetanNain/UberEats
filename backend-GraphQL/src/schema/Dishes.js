var mongoose = require('mongoose');
var Dishes = new mongoose.Schema({
    dishId: Number,
    restaurantMobileNumber: Number,
    dishName: String,
    mainIngredients: String,
    dishImage: String,
    dishPrice: Number,
    description: String,
    dishCategory:String,
    dishTag:String,
    dishType:String,  
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant'},
});
  
module.exports = mongoose.model('Dishes', Dishes);