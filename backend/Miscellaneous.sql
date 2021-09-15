SELECT * FROM UberEats.Customers;
INSERT INTO UberEats.Customers VALUES (1,'Chetan','Nain','chetan@gmail.com','123456789','','abcdef','123456');Restaurants
INSERT INTO UberEats.Restaurants VALUES (1,'MyRes','1234567','','MyResta','Password','ResDesc','ResAdd');

SELECT * FROM UberEats.Restaurants;
SELECT * FROM UberEats.Dishes;
DELETE FROM UberEats.Dishes where restaurantID=null;

UPDATE UberEats.Restaurants SET RestaurantContact= '1234567891' where RestaurantID = '1'


SELECT * FROM UberEats.Customers;
