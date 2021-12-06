var mongoose = require('mongoose');
//mongoose.Types.Decimal128var SchemaTypes = mongoose.Schema.Types;
var Orders = new mongoose.Schema({
    orderId: Number,
    customerMobileNumber: Number,
    restaurantMobileNumber: Number,
    dishID: Number,
    orderStatus: String,
    dishName:String,
    dishPrice: mongoose.Types.Decimal128,
});
  
module.exports = mongoose.model('Orders', Orders);