var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

var Address = new mongoose.Schema({
    _id : Number,
    mobileNumber: Number,
    address: String,
    city: String,
    provience: String,
    country: String
});
  
module.exports = mongoose.model('Address', Address);