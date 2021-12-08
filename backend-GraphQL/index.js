const express = require("express");
const db = require("./db");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { query } = require('./src/Graphql/Query');
const { mutation } = require('./src/Graphql/Mutation');
const UserController = require('./src/controller/userController');
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'application/graphql' }));
const Auth = require('./src/Auth');
const RestaurantController = require('./src/controller/restaurantController');
const DishController = require('./src/controller/dishController');
const multer = require("multer");
const path = require("path");

let fileName;
const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
       fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
       cb(null, fileName);
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.post("/upload", (req, res)=> {
    upload(req, res, (err) => {
       if(!err)
          return res.status(200).json({fileName: fileName});
    });
 });


app.get(
    "/customerBasicDetail",
    Auth.verifyToken,
    UserController.getCustomerBasicDetail
  );
app.get("/basicDetail", Auth.verifyToken, RestaurantController.basicDetail);
app.post("/login", UserController.login);
app.get("/logout", UserController.logout);
app.get("/updateCart", UserController.updateCart);

app.get("/restaurants", RestaurantController.getRestaurant);
app.post("/restaurants/addDishes", DishController.addDish);
app.post("/addRestaurantBasicDetail", RestaurantController.addBasicDetail);
app.post("/addRestaurantMenu", RestaurantController.addMenu);
app.get("/addToCart/:dishId", UserController.addToCart);
app.post("/removeFromCart", UserController.removeFromCart);
app.post("/checkout", UserController.checkout);
app.post("/updateOrderStatus", UserController.updateOrderStatus);
app.get("/restaurantDishes", RestaurantController.restaurantDishes);
//app.post("/addCustomerDetail", UserController.addUser);
app.post("/dishes", DishController.getDishes);
app.get("/cart", Auth.verifyToken, UserController.getCart);
app.get("/removeItem/:dishID", DishController.removeDish);
app.get("/menuDetails", DishController.getMenuDetail);

app.use('/resources',express.static(__dirname + '/public/uploads'));

app.listen(4000, (err)=>{
    if(!err){
        console.log('server started at port 4000');
    }
})