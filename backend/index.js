const mysql = require('mysql');
const express = require('express');
const constants = require("./config.json");
const bodyparser = require('body-parser');
const e = require('express');

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

//Get all restaurants
app.get('/restaurants', function (req, res) {
    connection.query('SELECT * FROM UberEats.Restaurants;', (err, rows, fields)=>{
        if(!err){
            console.log(rows);
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


//Register restaurant Profile.
app.post('/restaurants',(req,res,next)=>{
    let data = [req.body.restaurantID, req.body.restaurantName, req.body.restaurantContact, req.body.restaurantImages, req.body.restaurantUsername, req.body.restaurantPassword, req.body.restaurantDescription, req.body.restaurantAddress];
    connection.query ('INSERT INTO UberEats.Restaurants VALUES (?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.json(results): res.json(err);
    } )
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

//Dishes by restaurant
app.get('/dishes/:restaurantID', function (req, res) {
    let data = [req.params.restaurantID];
    connection.query('SELECT * FROM UberEats.Dishes where restaurantID = ?',data, (err, rows, fields)=>{
        if(!err){
            console.log(rows);
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
app.listen(3001, function () {
    console.log("Server listening on port 3000");
});
