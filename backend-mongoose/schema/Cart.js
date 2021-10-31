var mongoose = require('mongoose');
//var SchemaTypes = mongoose.Schema.Types;

var Cart = new mongoose.Schema({
    //_id : mongoose.Obj,
    customerMobileNumber: Number,
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dishes'},
    restaurantMobileNumber: Number,
    quantity: Number,
    itemPrice: Number,
    totalPrice:Number,
    checkedOut: Number,
});
  
module.exports = mongoose.model('Cart', Cart);