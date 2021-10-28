var mongoose = require('mongoose');
//var SchemaTypes = mongoose.Schema.Types;

var Cart = new mongoose.Schema({
    //_id : mongoose.Obj,
    customerMobileNumber: Number,
    dishId: mongoose.Schema.ObjectId,
    restaurantMobileNumber: Number,
    quantity: Number,
    itemPrice: mongoose.Types.Decimal128,
    totalPrice:mongoose.Types.Decimal128,
    checkedOut: Number
});
  
module.exports = mongoose.model('Cart', Cart);