var mongoose = require('mongoose');
var Restaurant = new mongoose.Schema({
    mobileNumber: Number,
    name: String,
    address: String,
    city: String,
    provience: String,
    pincode:String,
    images: String, 
    description:String,
    restaurantType:String    
});
module.exports = mongoose.model('restaurant', Restaurant);