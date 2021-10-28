const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const Customers = require("./schema/Customers");
const Restaurant = require("./schema/Restaurant");
const Dish = require("./schema/Dishes");
const Orders = require("./schema/Orders");
const Cart = require("./schema/Cart");
app.use(express.json());

const cors = require('cors')
app.use(cors())
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
//const { response } = require("../backend");
//const { request } = require("../backend");
const saltRounds = 10;

mongoose.connect("mongodb://localhost/UberEats", { useNewUrlParser: true });
//const customers = require('./schema/Customers');
//connect the DB
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));
app.listen(3001, () => console.log("Server Listening at port 3001."));

router.use(express.json());

function verifyToken(req, res, next) {
  const tokenHeader = req.headers["x-authentication-header"];
  if (tokenHeader != "null") {
    if (jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432")) {
      next();
    }
  } else {
    res.status(401).json({ msg: "Unauthorized!" });
  }
}

app.get("/", async function (req, res) {
  res.send("Hello World");
});

//Need Modification with restuarant without token ID
app.get("/restaurants", async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  if (tokenHeader != "null") {
    var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
    try {
      var restaurantMobileNumber = {
        restaurantMobileNumber: decoded.data.mobileNumber,
      };
      const restaurant = await Restaurant.find(restaurantMobileNumber);
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } 
  else {
    connection.query(
      "SELECT * FROM UberEats.Restaurants WHERE mobileNumber = ?",req.query?.restaurandId,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
});


app.post("/restaurants/addDishes", (request, response, next) => {
  db.collection("dishes").insertOne(request.body, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    response.sendStatus(200);
  });
});

app.get("/customers", async function (req, res) {
  console.log("In Customers.");
  try {
    const customers = await Customers.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addRestaurantBasicDetail", (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
  // let data = [decoded.data.mobileNumber, req.body.restaurantName, req.body.restaurantAddress, req.body.restaurantCity, req.body.restaurantProvience, req.body.restaurantCountry, req.body.restaurantPincode,null, req.body.restaurantDescription, req.body.restaurantType ]
  db.collection("restaurants").insertOne(req.body, function (err, result) {
    if (err) throw err;
    console.log("1 document inserted");
    res.sendStatus(200);
  });
});

app.post("/addRestaurantMenu", async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
  const dish = { ... req.body };
  const dishObj = new Dish(dish);
  const dishId = req.body._id || undefined;
  const existingDish = await Dish.findById(dishId);
  if(existingDish){
        dishObj._id = dishId
        const d = await dishObj.updateOne();
        console.log("Record Updated")
        res.json(d);
  } else{
      const data  = await dishObj.save();
      res.status(200).json({data})
  }
});

app.get("/addToCart/:dishId", async (req, res) => {
  console.log(req.params.dishId, "params");
  const type = req.query.type || 0;
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
  const dish = await Dish.findById(mongoose.Types.ObjectId(req.params.dishId));
  console.log(dish);
  cartData = {
    customerMobileNumber: decoded.data.mobileNumber,
    dishId: req.params.dishId,
    restaurantMobileNumber: dish.restaurantMobileNumber,
    quantity: 1,
    itemPrice: parseFloat(dish.dishPrice),
    totalPrice: dish.dishPrice * 1,
    checkedOut: 0,
  };
  const cart = new Cart(cartData);
  cart.save();
  res.sendStatus(200);
});

//needToHandleError
app.post("/removeFromCart", (req, res) => {
  var myquery = { _id: req.body.itemId };
    Cart.findByIdAndRemove(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.sendStatus(200);
    db.close();
  });
});

//not working with customerMobileNumber
//cart and order tables have just one column different.
app.get("/checkout", async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
 // console.log(decoded);
  const filters = req.body;
  let matcher = {customerMobileNumber:parseInt(decoded.data.mobileNumber),checkedOut: 0};
  console.log(matcher);
  const result = await Cart.find(matcher);
  console.log(result);
  res.status(200).json(result);

  // connection.query(
  //   "SELECT * FROM cart, Dishes where cart.dishId = Dishes.dishId and checkedOut = 0 and customerMobileNumber=" +
  //     decoded.data.mobileNumber,
  //   (err, rows, fields) => {
  //     rows.map((row) => {
  //       connection.query(
  //         "INSERT INTO Orders Values (?,?,?,?,?,?, ?)",
  //         [
  //           "",
  //           row.customerMobileNumber,
  //           row.restaurantMobileNumber,
  //           row.dishId,
  //           0,
  //           row.dishName,
  //           row.dishPrice,
  //         ],
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //       connection.query(
  //         "Update cart set checkedOut=1 where dishId = " +
  //           row.dishId +
  //           " AND  customerMobileNumber = " +
  //           decoded.data.mobileNumber
  //       );
  //     });
  //   }
  // );
  // res.send(200);
});



app.post("/updateOrderStatus", (req, res) => {
  var myquery = { orderId: req.body.orderID };
  var newvalues = { $set: { orderStatus: req.body.orderStatus } };
  db.collection("orders").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});



app.get("/restaurantDishes", async function (req, res) {
  const tokenHeader = req.headers["x-authentication-header"];
  if (tokenHeader != "null") {
    var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");

    try {
      //const restaurantMobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber;
      var restaurantMobileNumber = { restaurantMobileNumber: decoded.data.mobileNumber };
      const restaurant = await Dish.find(restaurantMobileNumber);
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    connection.query(
      `Select dish.dishID as id, dish.dishImage, res.mobileNumber as restaurantMobileNumber, dish.dishType as dishType, dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag, res.name from Restaurants as res Inner Join Dishes  as dish ON res.mobileNumber=dish.restaurantMobileNumber where dish.restaurantMobileNumber = '${req.query?.restaurandId}'`,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
});



app.post("/addCustomerDetail", async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    let uType = 0;
    if (req.body.userType == "Restaurant") {
      uType = 1;
    }
    const customer = await Customers.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    var customerObj = {
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: hash,
      address: req.body.address,
    };
    if (customer) {
      Customers.updateOne(
        { mobileNumber: req.body.mobileNumber },
        { $set: customerObj },
        function (err, result) {
          if (err) throw err;
          console.log("1 document updated");
          res.sendStatus(200);
        }
      );
    } else {
      db.collection("customers").insertOne(
        customerObj,
        function (err, results) {
          if (err) throw err;
          if (results) {
            console.log("Inside third if");
            const token = jwt.sign(
              {
                data: {
                  fullName: req.body.fullName,
                  email: req.body.email,
                  mobileNumber: req.body.mobileNumber,
                  role: req.body.restFlg,
                },
              },
              "my-secret-key-0001xx01212032432",
              { expiresIn: "12h" }
            );
            res.status(200).json({
              token: token,
              msg: "LoggedIn successfully",
              data: {
                fullName: req.body.fullName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                role: uType,
              },
            });
          } else {
            console.log("Inside second else");
            res.status(400).json({ msg: "Unable to register" });
          }
        }
      );
    }
  });
});






app.post("/dishes", async function (req, res) {
  let matcher = {
    dishType: { $in: req.body.mealType },
     /* dishTag: { $in: req.body.dishType },
    dishCategory: { $in: req.body.dishCategory },
    restaurantType: { $in: req.body.restaurantType } */ 
  };
  let query = Dish.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurantMobileNumber",
        foreignField: "mobileNumber",
        as: "restaurantMobileNumber",
      },
    },
    { $match: matcher },
  ]);
  var response = await query;
  console.log(response);
  res.status(200).json(response);
});


// need to do as making joins with 3 tables.
app.get("/cart", verifyToken, async function (req, res) {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
  let matcher = { customerMobileNumber: { $eq: decoded.data.mobileNumber } };
  let query = Cart.aggregate([
    {
      $lookup: {
        from: "dishes", //or Races.collection.name
        localField: "restaurantMobileNumber",
        foreignField: "mobileNumber",
        as: "mobileNumber",
      },
    },
    { $match: matcher },
  ]);
  var response = await query;
  res.status(200).json(response);
});

app.get("/orders", async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");

  if (decoded.data.role == 1) {
    var mobileNumber = { restaurantMobileNumber: decoded.data.mobileNumber };
  } else {
    var mobileNumber = { customerMobileNumber: decoded.data.mobileNumber };
  }
  const response = await Orders.find(mobileNumber);
  res.json(response);
});

app.get("/removeItem/:dishID", (req, res) => {
  var myquery = { _id: req.params.dishID };
  db.collection("dishes").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    res.sendStatus(200);
    console.log("1 document deleted from carts");
    db.close();
  });
});

app.get("/menuDetails", async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
  var myquery = { restaurantMobileNumber: decoded.data.mobileNumber };
  const restaurant = await Dish.find(myquery);
  res.json(restaurant);
});

app.get("/customerBasicDetail", verifyToken, async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
  const filters = req.body;
  console.log(decoded.data.mobileNumber);
  let matcher = { mobileNumber: decoded.data.mobileNumber };
  let query = Customers.find(matcher);
  var response = await query;
  res.status(200).json(response);
});

app.get("/basicDetail", verifyToken, async (req, res) => {
  const tokenHeader = req.headers["x-authentication-header"];
  const mobileNumber = req.query.restaurandId
    ? req.query.restaurandId
    : decoded.data.mobileNumber;
  if (tokenHeader != "null") {
    var decoded = jwt.verify(tokenHeader, "my-secret-key-0001xx01212032432");
    console.log(mobileNumber);
    try {
      //const restaurantMobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber;
      var restaurantMobileNumber = { restaurantMobileNumber: mobileNumber };
      const restaurant = await Restaurant.find(restaurantMobileNumber);
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    //check the else part.
    connection.query(
      `SELECT * FROM Restaurants where mobileNumber='${req.query?.restaurandId}'`,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows[0]);
        } else {
          console.log(err);
        }
      }
    );
  }
});

app.post('/login', async (req, res)=>{
  const mobileNumber = req.body.mobileNumber;
  const password = req.body.password;
  const results = await Customers.find({email: mobileNumber})
  console.log(results)
      if(results.length > 0){
          bcrypt.compare(password, results[0].password, function(err, result) {
              if(!err){
                  const token = jwt.sign({
                      data: {
                          fullName: results[0].fullName,
                          email: results[0].email,
                          mobileNumber: results[0].mobileNumber,
                          role: results[0].restFlg,
                      }
                    }, 'my-secret-key-0001xx01212032432', { expiresIn: '12h' });
                    res.status(200).json({
                      token: token,
                      msg: 'LoggedIn successfully',
                      data: {
                       fullName: results[0].fullName,
                       email: results[0].email,
                       mobileNumber: results[0].mobileNumber,
                       role: results[0].restFlg
                      }
                  })
                }
              })
            }else{
              res.status(401).json({msg: 'Invalid user name or password'});
            }
})

app.get("/logout", function (req, res) {
  const tokenHeader = req.headers['x-authentication-header'];
  var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
  const token = jwt.sign({
      data: {
          fullName: decoded.data.fullName,
          email: decoded.data.email,
          mobileNumber: decoded.data.mobileNumber,
          role: decoded.data.restFlg,
      }
    }, 'my-secret-key-0001xx01212032432', { expiresIn: '-1s' });
    res.status(200).json({
      token: token,
      msg: 'Logged out successfully',
      data: {
       fullName:  decoded.data.fullName,
       email:  decoded.data.email,
       mobileNumber:  decoded.data.mobileNumber,
       role:  decoded.data.restFlg
      }
  })
});
