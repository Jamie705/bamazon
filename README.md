# Bamazon

This appication is a small amazon mock CLI. The application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. Then request item id, and quantity to place order.

## How to use 
The app will prompt user to select ID of the product they would like to buy, next message will ask how many units of the product they would like to buy.

The application will check if your store has enough of the product to meet the request.

* If item is not available, the app should show message of item quantity not being available.

* If enough of the product is available, order will be fulfulled and a message will display to confirm orde was placed and total for the order.

The database will update as items are sold.

## Technologies Used
* JavaScript
* Node.js
* MySQL
* Node Inquirer
* Node MySQL