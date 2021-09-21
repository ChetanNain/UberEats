SELECT * FROM UberEats.Customers;
INSERT INTO UberEats.Customers VALUES (1,'Chetan','Nain','chetan@gmail.com','123456789','','abcdef','123456');Restaurants
INSERT INTO UberEats.Restaurants VALUES (1,'MyRes','1234567','','MyResta','Password','ResDesc','ResAdd');

SELECT * FROM UberEats.Restaurants;
SELECT * FROM UberEats.Dishes;
DELETE FROM UberEats.Dishes where restaurantID=null;
dishId

INSERT INTO Dishes VALUES ('1', 'Taco', 'Cheese', '', '10.55', 'its not very healthy for you, but sometimes you can listen to your tongue that your brains.', 'Snacks', 5)

UPDATE UberEats.Restaurants SET RestaurantContact= '1234567891' where RestaurantID = '1'
UPDATE Dishes set dishId=1 where restaurantID=1;
Restaurants
SELECT * FROM UberEats.Dishes;

USE UberEats;
Select dish.dishID as id,dish.dishImage,res.id as restaurantId  , dish.dishName, dish.dishPrice as price ,res.name from Restaurants as res Inner Join Dishes  as dish ON
res.id=dish.restaurantId

'1', 'Pizza', 'Cheese', ?, '10.55', 'its not very healthy for you, but sometimes you can listen to your tongue that your brains.', 'Snacks', '1'
