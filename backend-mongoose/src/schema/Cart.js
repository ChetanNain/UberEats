var mongoose = require('mongoose');

var Cart = new mongoose.Schema({
    customerMobileNumber: Number,
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dishes'},
    restaurantMobileNumber: Number,
    quantity: Number,
    itemPrice: Number,
    totalPrice:Number,
    checkedOut: Number,
    specialInstruction: String,
    date: {
        type: Date,
        default: new Date().toISOString()
    },
    status: {
        type: Number,
        default: 0
    }
});
  
module.exports = mongoose.model('Cart', Cart);