const express = require("express");
const multer = require("multer");
const path = require("path");
var jwt = require('jsonwebtoken');
const router = express.Router();
const RestaurantController = require('./src/controller/restaurantController');
const DishController = require('./src/controller/dishController');
const UserController = require('./src/controller/userController');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const SALT_ROUNTD = 10;
const FIlE_UPLOAD_DIR = "./public/uploads/";

let fileName;
const storage = multer.diskStorage({
   destination: FIlE_UPLOAD_DIR,
   filename: function(req, file, cb){
       fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
       cb(null, fileName);
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");



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
app.post("/checkout", UserController.checkout);
app.post("/updateOrderStatus", UserController.updateOrderStatus);
app.get("/restaurantDishes", RestaurantController.restaurantDishes)
app.post("/addCustomerDetail", UserController.addUser);
app.post("/dishes", DishController.getDishes);
app.get("/cart", verifyToken, UserController.getCart);
app.get("/orders", UserController.getOrders);
app.get("/removeItem/:dishID", DishController.removeDish);
app.get("/menuDetails", DishController.getMenuDetail);
app.get("/customerBasicDetail", verifyToken, UserController.getCustomerBasicDetail);
app.get("/basicDetail", verifyToken, RestaurantController.basicDetail);
app.post('/login', UserController.login)
app.get("/logout", UserController.logout);
app.post("/upload", (req, res)=> {
  upload(req, res, (err) => {
     if(!err)
        return res.status(200).json({fileName: fileName});
  });
});

app.get("/updateCart", UserController.updateCart)


app.use('/resources',express.static(__dirname + '/public/uploads'));