const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:password12345@cluster0.x1bu5.mongodb.net/UberEats?retryWrites=true&w=majority",(err)=>{
  if(!err){
    console.log("Connected to mongodb");
  }else{
    console.log(err);
  }
});