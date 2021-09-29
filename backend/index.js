const mysql = require('mysql');
const express = require('express');
const constants = require("./config.json");
const bodyparser = require('body-parser');
const e = require('express');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');


var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var connection = mysql.createPool({
    host:constants.DB.host,

    user:constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database 
});

connection.getConnection((err) =>{
    if(err){
        throw 'Error occoured' + err;
    }
    console.log("Connection Created");
});

app.use(cors())

//Get all restaurants
app.get('/restaurants', function (req, res) {
    connection.query('SELECT * FROM UberEats.Restaurants;', (err, rows, fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

//Get a restaurant
app.get('/restaurants/:id',(req,res)=>{
    connection.query('SELECT * FROM UberEats.Restaurants WHERE ID = ?',[req.params.id], (err, rows, fields)=>{
        if(!err){
            console.log(rows);
        }else{
            console.log(err);
        }
    })
})


//Update phone number.
app.put('/restaurants/:restaurantID/:restaurantContact', (req,res,next)=>{
        let data = [req.params.restaurantID, req.params.restaurantContact];
        connection.query('UPDATE UberEats.Restaurants SET Contact= ? where ID = ?', data, (err,results,fields)=>{
            !err? res.json(results): res.json(err);
        })
})

//add Dishes
app.post('/restaurants/addDishes',(req,res,next)=>{
    let data = [req.body.restaurantID,req.body.dishName,req.body.mainIngredients,req.body.dishImage,req.body.dishPrice,req.body.description,req.body.dishCategory];
    connection.query('INSERT INTO UberEats.Dishes VALUES (?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.json(results): res.json(err);
    })
})

app.get('/dishes/:dishTag', function (req, res) {
    connection.query(`Select dish.dishID as id,dish.dishImage,res.id as restaurantId  , dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag ,res.name from Restaurants as res Inner Join Dishes  as dish ON res.id=dish.restaurantId where dishTag = '${req.params.dishTag}'`, 
    (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});
//Dishes by restaurant
app.get('/dishes/restaurant/:restaurantId', function (req, res) {
    connection.query(`Select dish.dishID as id,dish.dishImage,res.id as restaurantId  , dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag ,res.name from Restaurants as res Inner Join Dishes  as dish ON res.id=dish.restaurantId where dish.restaurantId = '${req.params.restaurantId}'`, (err, rows, fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err);
        }
    })
});

//list of customers
app.get('/customers', function (req, res) {
    connection.query('SELECT * FROM UberEats.Customers;', (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

//Update phone number.
app.put('/restaurants/:restaurantID/:restaurantContact', (req,res,next)=>{
    let data = [req.params.restaurantID, req.params.restaurantContact];
    connection.query('UPDATE UberEats.Restaurants SET Contact= ? where ID = ?', data, (err,results,fields)=>{
        !err? res.json(results): res.json(err);
    })
})


//Update phone number.
app.put('/customers/:customerID/:phoneNumber', (req,res,next)=>{
    let data = [req.params.restaurantID, req.params.restaurantContact];
    connection.query('UPDATE UberEats.Restaurants SET PhoneNumber= ? where CustomerID = ?', data, (err,results,fields)=>{
        !err? res.json(results): res.json(err);
    })
})





app.post('/addToCart', (req, res) =>{
    const itemId = req.body.itemId;
    const customerId =req.body.customerId;
    connection.query(`select dish.dishID as id,dish.dishImage,res.id as restaurantId , dish.dishName, dish.dishPrice as price from cart, Restaurants as res, Dishes as dish where cart.dishId = dish.dishId and cart.restaurantId = res.id and dish.dishId = ${itemId};`,
    (err, rows, fields)=>{
        restaurantId = rows[0].restaurantId;
        itemPrice = rows[0].price;
        totalPrice = itemPrice * 1;

        quantity=1

        connection.query('INSERT INTO cart VALUES(?,?,?,?,?,?, ?)', [customerId,itemId, restaurantId, quantity, itemPrice, totalPrice, 0],
            (err, data, fields)=>{
                if(!err){
                    res.send(data);
                }else{
                    console.log(err);
                }
            })

    });
    
})


app.post('/removeFromCart', (req, res) =>{
    const itemId = req.body.itemId;
    console.log(itemId);
    connection.query(`DELETE FROM cart WHERE dishId= ${itemId};`,
    (err, rows, fields)=>{
        if(!err){
            res.send(200);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    });
    
})

app.get('/cart', function(req,res){
    connection.query('select dish.dishID as id,dish.dishImage,res.id as restaurantId , dish.dishName, dish.dishPrice as price from cart, Restaurants as res, Dishes as dish where cart.dishId = dish.dishId and cart.restaurantId = res.id;',
    (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

app.get('/getRestaurantOrders/:id', (req, res) =>{
    console.log("called restaurantOrders");
   // console.log(req.params.id);
    connection.query(`SELECT * FROM Orders where restaurantID=` + req.params.id,
    (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    });
})

app.post('/removeFromCart', (req, res) =>{
    const itemId = req.body.itemId;
    console.log(itemId);
    connection.query(`DELETE FROM cart WHERE dishId= ${itemId};`,
    (err, rows, fields)=>{
        if(!err){
            res.send(200);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    });
    
})


app.post('/updateOrderStatus',(req,res)=>{
    const orderStatus = req.body.orderStatus;
    const orderID = req.body.orderID;
    console.log(orderStatus, orderID);
    connection.query(`UPDATE Orders SET orderStatus=${orderStatus} where orderID=${orderID}`,
    (err,rows,fields)=>{
        if(!err){
            res.send(200);
        }else{
            console.log(err);
        }
    });
    
})


app.post('/addRestaurantBasicDetail', (req,res)=>{
    const restID = uuidv4();
    let data = [restID, req.body.name, req.body.country, req.body.provience,  req.body.pincode, null, req.body.description, req.body.restaurantUsername, req.body.restaurantPassword ]
    connection.query ('INSERT INTO UberEats.Restaurants VALUES (?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.json(restID): res.json(err);
    } )
})

app.post('/addRestaurantMenu', (req,res)=>{
    let data = [ '',req.body.restaurantId, req.body.dishName, req.body.dishIngredients,'', req.body.dishPrice,req.body.dishDescription, req.body.dishCategory, req.body.mealType, req.body.dishType ]
    connection.query ('INSERT INTO UberEats.Dishes VALUES (?,?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.json(results): res.json(err);
    } )
})


app.get('/basicDetail/:restaurantID',(req,res) => {
    connection.query(`SELECT * FROM Restaurants where id='${req.params.restaurantID}'`,
    (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    })
});

app.get('/menuDetails/:restaurantID',(req,res) => {
    connection.query(`SELECT * FROM Dishes where restaurantID='${req.params.restaurantID}'`,
    (err, rows, fields)=>{
        if(!err){
            console.log("Reached menu");
            res.send(rows);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    })
});

app.listen(3001, function () {
    console.log("Server listening on port 3001");
});
