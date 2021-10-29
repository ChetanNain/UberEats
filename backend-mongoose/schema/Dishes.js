var mongoose = require('mongoose');
//var SchemaTypes = mongoose.Schema.Types;
var Dishes = new mongoose.Schema({
   // _id : mongoose.Schema.ObjectId,
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