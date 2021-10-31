const mysql = require('mysql');
const express = require('express');
const constants = require("./config.json");
const e = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
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


// var connection = mysql.createConnection({
//     host:constants.DB.host,
//     user:constants.DB.username,
//     password: constants.DB.password,
//     port: constants.DB.port,
//     database: constants.DB.database 
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
//   });



app.use(cors())
//done
//Get a restaurant
app.get('/restaurants',(req,res)=>{
    const tokenHeader = req.headers['x-authentication-header'];
    if(tokenHeader != 'null'){
        var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
        const restaurantMobileNumber = req.query?.restaurandId ? req.query?.restaurandId : decoded.data.mobileNumber;
        connection.query('SELECT * FROM UberEats.Restaurants WHERE mobileNumber = ?', restaurantMobileNumber, (err, rows, fields)=>{
            if(!err){
               res.send(rows);
            }else{
                console.log(err);
            }
        })
    }else{
        connection.query('SELECT * FROM UberEats.Restaurants WHERE mobileNumber = ?', req.query?.restaurandId, (err, rows, fields)=>{
            if(!err){
               res.send(rows);
            }else{
                console.log(err);
            }
        })
    }
   
})


//done
//add Dishes
app.post('/restaurants/addDishes',(req,res,next)=>{
    let data = [req.body.restaurantID,req.body.dishName,req.body.mainIngredients,req.body.dishImage,req.body.dishPrice,req.body.description,req.body.dishCategory];
    connection.query('INSERT INTO UberEats.Dishes VALUES (?,?,?,?,?,?,?)', data, (err, results, fields)=>{
        !err? res.json(results): res.json(err);
    })
})

//done
app.post('/dishes', function (req, res) {
    const filters = req.body;
    let query = 'Select dish.dishId as id, dish.dishImage, dish.dishType as dishType, res.mobileNumber as mobileNumber, dish.dishName, dish.dishCategory, dish.dishPrice as price, dish.dishTag as dishTag, res.name, res.city, res.restaurantType from Restaurants as res Inner Join Dishes  as dish ON res.mobileNumber=dish.restaurantMobileNumber where 1 = 1';
    if(filters.mealType?.length){
        query +=` AND dishTag in ("${filters.mealType.join('", "')}") `;
    }
    if(filters.dishType?.length){
        query +=` AND dishType in ("${filters.dishType.join('", "')}") `;
    }
    if(filters.dishCategory?.length){
        query +=` AND dishCategory in ("${filters.dishCategory.join('", "')}") `;
    }if(filters.restaurantType?.length){
        query +=` AND res.restaurantType in ("${filters.restaurantType.join('", "')}") `;
    }
    connection.query(query, 
    (err, rows, fields)=>{
        if(!err){
            if(filters.searchQuery){
                rows = rows.filter(row => {
                    const searchArr = [row.dishName, row.city, row.dishTag, row.dishType, row.name, row.dishCategory];
                    return searchArr.includes(filters.searchQuery)
                });
            }
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

//done
//Dishes by restaurant
app.get('/restaurantDishes', function (req, res) {
    const tokenHeader = req.headers['x-authentication-header'];
    if(tokenHeader != 'null'){
        var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
        const restaurantMobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber; 
        connection.query(`Select dish.dishID as id, dish.dishImage, res.mobileNumber as restaurantMobileNumber, dish.dishType as dishType, dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag, res.name from Restaurants as res Inner Join Dishes  as dish ON res.mobileNumber=dish.restaurantMobileNumber where dish.restaurantMobileNumber = '${restaurantMobileNumber}'`, (err, rows, fields)=>{
            if(!err){
                res.send(rows)
            }else{
                console.log(err);
            }
        })
    }else{
        connection.query(`Select dish.dishID as id, dish.dishImage, res.mobileNumber as restaurantMobileNumber, dish.dishType as dishType, dish.dishName, dish.dishPrice as price, dish.dishTag as dishTag, res.name from Restaurants as res Inner Join Dishes  as dish ON res.mobileNumber=dish.restaurantMobileNumber where dish.restaurantMobileNumber = '${req.query?.restaurandId}'`, (err, rows, fields)=>{
            if(!err){
                res.send(rows)
            }else{
                console.log(err);
            }
        })
    }
    
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




//done
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
    connection.query("SELECT * FROM cart, Dishes where cart.dishId = Dishes.dishId and checkedOut = 0 and customerMobileNumber=" + decoded.data.mobileNumber,
    (err, rows, fields)=>{
        rows.map(row =>{
            connection.query("INSERT INTO Orders Values (?,?,?,?,?,?, ?)", ['',row.customerMobileNumber, row.restaurantMobileNumber, row.dishId, 0, row.dishName, row.dishPrice], (err)=>{
                console.log(err);
            });
            connection.query("Update cart set checkedOut=1 where dishId = " + row.dishId + " AND  customerMobileNumber = "+ decoded.data.mobileNumber);
        })        
    })
    res.send(200);
});

//done
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
//done
app.get('/cart', verifyToken, function(req,res){
        const tokenHeader = req.headers['x-authentication-header'];
        var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
        console.log(decoded);
        connection.query(`select dish.dishID as id, dish.dishImage, res.name, res.mobileNumber, dish.dishName, dish.dishPrice as price, cart.checkedOut from cart, Restaurants as res, Dishes as dish where cart.dishId = dish.dishId and cart.restaurantMobileNumber = res.mobileNumber and cart.customerMobileNumber=${decoded.data.mobileNumber};`,
        
        (err, rows, fields)=>{
            console.log(rows);
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
     })
});
//done
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
//done
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

//done
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

//done
app.post('/addRestaurantBasicDetail', (req,res)=>{
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
   
    let data = [decoded.data.mobileNumber, req.body.restaurantName, req.body.restaurantAddress, req.body.restaurantCity, req.body.restaurantProvience, req.body.restaurantCountry, req.body.restaurantPincode,null, req.body.restaurantDescription, req.body.restaurantType ]
    connection.query ('INSERT INTO UberEats.Restaurants VALUES (?,?,?,?,?,?,?,?,?, ?)', data, (err, results, fields)=>{
        !err? res.send(200):res.json(err);
    } )
})
//done
app.post('/addCustomerDetail', (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let uType=0;
        if(req.body.userType == 'Restaurant'){
            uType=1;
        }
        let addressData = [req.body.mobileNumber, req.body.address, req.body.city,req.body.provience, req.body.country];
        connection.query(`SELECT * from Customers where mobileNumber = '${req.body.mobileNumber}'`, (err, result)=>{
            if(result.length > 0){
                console.log("Inside if");
                let url1=`UPDATE Addresses set address= '${req.body.address}',city='${req.body.city}', state='${req.body.provience}', country = '${req.body.country}' where mobileNumber='${req.body.mobileNumber}'`;
                let url2=`Update Customers set fullName='${req.body.fullName}', dateOfBirth='${req.body.dateOfBirth}', email='${req.body.email}', password='${hash}' where mobileNumber='${req.body.mobileNumber}'`;
                console.log(url1);
                console.log(url2);
                connection.query(url1, (err1, res)=>{
                    console.log(res, err1)
                });
                console.log("Inside Second if");
                connection.query(url2, (err2, res)=>{
                    console.log(err2)
                });
                res.send(200);
            }else {
                console.log("Inside else");
            connection.query('INSERT INTO UberEats.Addresses VALUES (?,?,?,?,?)', addressData);
        let data = [req.body.fullName, req.body.dateOfBirth, req.body.email, req.body.mobileNumber, hash, req.body.uploadedFile, req.body.uploadedFile, req.body.language,uType ]
        connection.query ('INSERT INTO UberEats.Customers VALUES (?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
            if(results.affectedRows){
                console.log("Inside third if");
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
                console.log("Inside second else");
                res.status(400).json({msg: 'Unable to register'})
            }
        })
            }
        });
    })
})

//done
app.post('/addRestaurantMenu', (req,res)=>{
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
    let data = [ '',decoded.data.mobileNumber, req.body.dishName, req.body.dishIngredients, req.body.image, req.body.dishPrice,req.body.dishDescription, req.body.dishCategory, req.body.mealType, req.body.dishType ]
    console.log(data);
    if(req.body.dishId){
        connection.query (`update UberEats.Dishes set dishName='${req.body.dishName}', dishPrice='${req.body.dishPrice}', mainIngredients='${req.body.dishIngredients}', dishCategory='${req.body.dishCategory}', dishType= '${req.body.dishType}', dishTag='${req.body.mealType}' where dishID=${req.body.dishId}`, data, (err, results, fields)=>{
            !err? res.json(results): res.json(err);
        } )
    }else{
        connection.query ('INSERT INTO UberEats.Dishes VALUES (?,?,?,?,?,?,?,?,?,?)', data, (err, results, fields)=>{
            !err? res.json(results): res.json(err);
        } )
    }
})


app.get('/basicDetail', verifyToken, (req,res) => {
    const tokenHeader = req.headers['x-authentication-header'];
    if(tokenHeader != 'null'){
        var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
        const mobileNumber = req.query.restaurandId ? req.query.restaurandId : decoded.data.mobileNumber
        console.log(mobileNumber);
        connection.query(`SELECT * FROM Restaurants where mobileNumber='${mobileNumber}'`,
        (err, rows, fields)=>{
            if(!err){
                res.send(rows[0]);
            }else{
                console.log(err);
            }
        })
    }else{
    connection.query(`SELECT * FROM Restaurants where mobileNumber='${req.query?.restaurandId}'`,
    (err, rows, fields)=>{
        if(!err){
            res.send(rows[0]);
        }else{
            console.log(err);
        }
    })
    }

});
//done
app.get('/customerBasicDetail', verifyToken, (req,res) => {
    const tokenHeader = req.headers['x-authentication-header'];
    var decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
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

//done
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

//done
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
    
    connection.query (`select * from Customers where email = '${mobileNumber}'`, (err, results, fields)=>{
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

//added
function verifyToken(req, res, next){
    const tokenHeader = req.headers['x-authentication-header'];
    if(tokenHeader != 'null'){ 
        if(jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432')){
            next();
        }
    }else{
        res.status(401).json({msg: 'Unauthorized!'})
    }
}

app.post("/upload", (req, res)=> {
    upload(req, res, (err) => {
       if(!err)
          return res.status(200).json({fileName: fileName});
    });
 });

 app.use('/resources',express.static(__dirname + '/public/uploads'));

app.listen(3001, function () {
    console.log("Server listening on port 3001");
});

module.exports = app;



