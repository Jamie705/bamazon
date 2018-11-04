DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

-- Electronics
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Fire TV Stick", "Electronics", 39.99, 20),
("Echo Dot", "Electronics", 49.99, 50),
("Roku Express", "Electronics", 29.88, 20);

-- Video Games
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("PS4 Red Dead Redemption II", "Video Games", 59.96, 20),
("PS4 Spider-Man", "Video Games", 56.68, 20),
("PS4 Madden 19", "Video Games", 59.96, 20);

-- Books
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("The Wonky Donkey", "Books", 7.13, 15),
("Cook like a Pro", "Books", 20.99, 20),
("Girls Wash Your Face", "Books", 13.78, 10);

-- Toys
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Uno Card Game", "Toys", 4.95, 25),
("Play-Doh Party Bag Dough", "Toys", 5.95, 30),
("Jenga", "Toys", 8.77, 10);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
