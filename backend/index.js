const mysql = require('mysql');
const express = require('express');
const constants = require("./config.json");
const e = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');


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

//Get a restaurant
app.get('/restaurants',(req,res)=>{
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    const restaurantMobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber;
    connection.query('SELECT * FROM UberEats.Restaurants WHERE mobileNumber = ?', restaurantMobileNumber, (err, rows, fields)=>{
        if(!err){
           res.send(rows);
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
    connection.query(`Select dish.dishId as id, dish.dishImage, dish.dishType as dishType, res.mobileNumber as mobileNumber, dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag ,res.name from Restaurants as res Inner Join Dishes  as dish ON res.mobileNumber=dish.restaurantMobileNumber where dishTag = '${req.params.dishTag}'`, 
    (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});
//Dishes by restaurant
app.get('/restaurantDishes', function (req, res) {
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    const restaurantMobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber; 
    connection.query(`Select dish.dishID as id, dish.dishImage, res.mobileNumber as restaurantMobileNumber, dish.dishType as dishType, dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag, res.name from Restaurants as res Inner Join Dishes  as dish ON res.mobileNumber=dish.restaurantMobileNumber where dish.restaurantMobileNumber = '${restaurantMobileNumber}'`, (err, rows, fields)=>{
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





app.get('/addToCart/:dishId', (req, res) =>{
    console.log(req.query, "params")
    const type = req.query.type || 0;
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    connection.query(`SELECT dishID, dishName, mainIngredients, dishImage, dishPrice, dishCategory, dishTag, dishType, restaurantMobileNumber
    from Dishes where dishId=` + req.params.dishId,
    (err, rows, fields)=>{
        dishID = rows[0].dishID,
        restaurantMobileNumber = rows[0].restaurantMobileNumber;
        dishPrice = rows[0].dishPrice;
        totalPrice = dishPrice * 1;
        quantity=1

        connection.query('INSERT INTO cart VALUES(?,?,?,?,?,?,?)', [decoded.data.mobileNumber,dishID, restaurantMobileNumber, quantity, dishPrice, totalPrice, type],
            (err, data, fields)=>{
                if(!err){
                    res.send(data);
                }else{
                    console.log(err);
                }
            })

    });
    
})

app.get('/checkout', (req,res) =>{
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    connection.query("SELECT * FROM cart where checkedOut = 0 and customerMobileNumber=" + decoded.data.mobileNumber,
    (err, rows, fields)=>{
        rows.map(row =>{
            connection.query("INSERT INTO Orders Values (?,?,?,?,?)",['',row.customerMobileNumber, row.restaurantMobileNumber, row.dishId,0]);
            connection.query("Update cart set checkedOut=1 where dishId = " + row.dishId + " AND  customerMobileNumber = "+ decoded.data.mobileNumber);
        })        
    })
    res.send(200);
});

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
        const tokenHeader = req.headers['x-authentication-header'];
        var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
        console.log(decoded);
        connection.query(`select dish.dishID as id, dish.dishImage,res.name, res.mobileNumber as restaurantMobileNumber , dish.dishName, dish.dishPrice as price, cart.checkedOut from cart, Restaurants as res, Dishes as dish where cart.dishId = dish.dishId and cart.restaurantMobileNumber = res.mobileNumber and cart.customerMobileNumber=${decoded.data.mobileNumber};`,
        
        (err, rows, fields)=>{
            console.log(rows);
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
     })
});

app.get('/orders', (req, res) =>{
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    let query = `SELECT * FROM Orders where customerMobile=${decoded.data.mobileNumber}`;
    if(decoded.data.role == 1){
        query = `SELECT * FROM Orders where restaurantMobile=${decoded.data.mobileNumber}`;
    }
    connection.query(query, (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log("Error in Orders Restaurant");
            console.log(err);
        }
    })
})


/* app.get("/logout", validateToken, function (req, res) {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
    if (logout) {
    res.send({msg : 'You have been Logged Out' });
    } else {
    res.send({msg:'Error'});
    }
    });
});
 */
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
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
   
    let data = [decoded.data.mobileNumber, req.body.restaurantName, req.body.restaurantAddress, req.body.restaurantCity, req.body.restaurantProvience, req.body.restaurantCountry, req.body.restaurantPincode,null, req.body.restaurantDescription ]
    connection.query ('INSERT INTO UberEats.Restaurants VALUES (?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.send(200):res.json(err);
    } )
})

app.post('/addCustomerDetail', (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let uType=0;
        if(req.body.userType == 'Restaurant'){
            uType=1;
        }
        let addressData = [req.body.mobileNumber, req.body.address, req.body.city,req.body.provience, req.body.country];
        connection.query('INSERT INTO UberEats.Addresses VALUES (?,?,?,?,?)', addressData);
        
        let data = [req.body.fullName, req.body.dateOfBirth, req.body.email, req.body.mobileNumber, hash, '','', req.body.language,uType ]

        connection.query ('INSERT INTO UberEats.Customers VALUES (?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
            if(results.affectedRows){
                const token = jwt.sign({
                    data: {
                        fullName: req.body.fullName,
                        email: req.body.email,
                        mobileNumber: req.body.mobileNumber,
                        role: req.body.restFlg,
                    }
                  }, 'my-secret-key-0001xx01212032432', { expiresIn: '12h' });
                  res.status(200).json({
                    token: token,
                    msg: 'LoggedIn successfully',
                    data: {
                        fullName: req.body.fullName,
                        email: req.body.email,
                        mobileNumber: req.body.mobileNumber,
                        role: uType
                    }
                }) 
            }else{
                res.status(400).json({msg: 'Unable to register'})
            }
        })
    })
})


app.post('/addRestaurantMenu', (req,res)=>{
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    let data = [ '',decoded.data.mobileNumber, req.body.dishName, req.body.dishIngredients,'', req.body.dishPrice,req.body.dishDescription, req.body.dishCategory, req.body.mealType, req.body.dishType ]
    connection.query ('INSERT INTO UberEats.Dishes VALUES (?,?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.json(results): res.json(err);
    } )
})


app.get('/basicDetail',(req,res) => {
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    connection.query(`SELECT * FROM Restaurants where mobileNumber='${decoded.data.mobileNumber}'`,
    (err, rows, fields)=>{
        if(!err){
            res.send(rows[0]);
        }else{
            console.log(err);
        }
    })
});

app.get('/customerBasicDetail',(req,res) => {
    const tokenHeader = req.headers['x-authentication-header'];
    console.log(tokenHeader);
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    console.log(decoded);
    connection.query(`SELECT Customers.fullName as fullName, Customers.dateOfBirth as dateOfBirth, 
    Customers.email as email, Customers.mobileNumber as mobileNumber, Customers.Password as password, 
    Customers.favorites as favorites, Customers.profilePicture as profilePic, Customers.language as language, 
    Addresses.Address as address, Addresses.City as city, Addresses.State as state, 
    Addresses.Country as country FROM Customers inner join Addresses 
    On (Customers.mobileNumber = Addresses.mobileNumber) and Customers.mobileNumber='${decoded.data.mobileNumber}'`,
    (err, rows, fields)=>{
        if(!err){
            res.send(rows[0]);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    })
});

app.get('/menuDetails',(req,res) => {
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    connection.query(`SELECT * FROM Dishes where restaurantMobileNumber='${decoded.data.mobileNumber}'`,
    (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

app.get('/removeItem/:dishID',(req,res)=> {
    console.log(req.params.dishID);
    connection.query(`DELETE FROM Dishes where dishId='${req.params.dishID}'`,
    (err, rows, fields)=>{
        if(!err){
            res.send(200);
        }else{
            console.log("Error in delete");
            console.log(err);
        }
    })
});

app.post('/login', (req, res)=>{
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    
    connection.query (`select * from Customers where mobileNumber = '${mobileNumber}'`, (err, results, fields)=>{
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
              }else{
                  console.log(err);
              }
          });
      }else{
          res.status(401).json({msg: 'Invalid user name or password'});
      } 
  })
})



app.listen(3001, function () {
    console.log("Server listening on port 3001");
});
