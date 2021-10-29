var mongoose = require('mongoose');
  
var Customers = new mongoose.Schema({
    //_id : Number,
    fullName: String,
    dateOfBirth: String,
    email: String,
    mobileNumber: Number,
    password: String,
    favorites:Array,
    profilePicture: String,
    language:String,
    restFlg:Number,
    address:Array    
});
  
module.exports = mongoose.model('Customers', Customers);