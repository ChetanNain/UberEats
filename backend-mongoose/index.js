const express = require("express");
const multer = require("multer");
const path = require("path");
var jwt = require("jsonwebtoken");
const router = express.Router();
const RestaurantController = require("./src/controller/restaurantController");
const DishController = require("./src/controller/dishController");
const UserController = require("./src/controller/userController");
const db = require("./db");
const cors = require("cors");
var kafka = require("./kafka/client");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const SALT_ROUNTD = 10;
const FIlE_UPLOAD_DIR = "./public/uploads/";
const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";
const { uploadFile, getFileStream } = require("./s3");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

let fileName;
const storage = multer.diskStorage({
  destination: FIlE_UPLOAD_DIR,
  filename: function (req, file, cb) {
    fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("myImage"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  //await unlinkFile(file.path);
  console.log(result);
  res.send({ fileName: `/images/${result.key}` });
});

app.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

app.listen(PORT, () => console.log("Server Listening at port 3001."));
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

app.get("/restaurants", RestaurantController.getRestaurant);
app.post("/restaurants/addDishes", DishController.addDish);
app.post("/addRestaurantBasicDetail", RestaurantController.addBasicDetail);
app.post("/addRestaurantMenu", RestaurantController.addMenu);
app.get("/addToCart/:dishId", UserController.addToCart);
app.post("/removeFromCart", UserController.removeFromCart);
//app.post("/checkout", UserController.checkout);
app.post("/updateOrderStatus", UserController.updateOrderStatus);
app.get("/restaurantDishes", RestaurantController.restaurantDishes);
//app.post("/addCustomerDetail", UserController.addUser);
app.post("/dishes", DishController.getDishes);
app.get("/cart", verifyToken, UserController.getCart);
app.get("/orders", UserController.getOrders);
app.get("/removeItem/:dishID", DishController.removeDish);
app.get("/menuDetails", DishController.getMenuDetail);
app.get(
  "/customerBasicDetail",
  verifyToken,
  UserController.getCustomerBasicDetail
);
app.get("/basicDetail", verifyToken, RestaurantController.basicDetail);
app.post("/login", UserController.login);
app.get("/logout", UserController.logout);
// app.post("/upload", (req, res)=> {
//   upload(req, res, (err) => {
//      if(!err)
//         return res.status(200).json({fileName: fileName});
//   });
// });

// app.post('/dishes', function(req, res){
//   kafka.make_request('get_dishes',req.body, function(err,results){
//       console.log("results",results);
//       console.log('in result');
//      // console.log(results);
//       if (err){
//           console.log(err)
//           console.log("Inside err");
//           res.json({
//               status:"error",
//               msg:"System Error, Try Again."
//           })
//       }else{
//           console.log("Inside else");
//               res.json(results);
//               res.end();
//           }

//   });
// });

app.post("/addCustomerDetail", function (req, res) {
  const reqObj = { query: req.query, params: req.params, body: req.body };
  kafka.make_request("add_user", reqObj, function (err, results) {
    console.log("in result", results);
    //console.log(results);
    if (err) {
      console.log(err);
      console.log("Inside err of cart");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results.response);
      // res.status(200).end(results.response);
    }
  });
});

app.post("/checkout", function (req, res) {
  const reqObj = {
    query: req.query,
    params: req.params,
    body: req.body,
    headers: req.headers,
  };
  kafka.make_request("checkout", reqObj, function (err, results) {
    console.log("in result", results);
    //console.log(results);
    if (err) {
      console.log(err);
      console.log("Inside err of cart");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.sendStatus(200);
      // res.send({
      //   status: 200
      // })
      // res.status(200).end(results.response);
    }
  });
});

//app.post("/checkout", UserController.checkout);

// app.get('/cart', function(req, res){

//   const tokenHeader = req.headers[AUTHENTICATION_HEADER];
//   var decoded = jwt.verify(tokenHeader, SECRET_KEY);
//   const newObj = {...req.body,
//   mobileNumber: decoded.data.mobileNumber }

//   kafka.make_request('get_cart',newObj, function(err,results){

//     console.log('in result');

//       //console.log(results);
//       if (err){
//           console.log(err)
//           console.log("Inside err of cart");
//           res.json({
//               status:"error",
//               msg:"System Error, Try Again."
//           })
//       }else{
//           console.log("Inside else");
//               res.json(results);
//               res.end();
//           }

//   });
// });

app.get("/updateCart", UserController.updateCart);

app.use("/resources", express.static(__dirname + "/public/uploads"));
