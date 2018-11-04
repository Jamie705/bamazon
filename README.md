# Bamazon

There are two options to run bamazonCustomer.js and bamazonManager.js.

### Bamazon Customer
This appication is a small amazon mock CLI. The application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. Then request item id, and quantity to place order.

### Bamazon Manager
This application provides manager options View Products for Sale, View Low Inventory, Add to Inventory and Add New Product.

## How to use bamazonCustomer.js
The app will prompt user to select ID of the product they would like to buy, next message will ask how many units of the product they would like to buy.

The application will check if your store has enough of the product to meet the request.

* If item is not available, the app should show message of item quantity not being available.

* If enough of the product is available, order will be fulfulled and a message will display to confirm orde was placed and total for the order.

The database will update as items are sold.

## How to use BamazonManager.js
The app will promt options available. Select one of the options:

* `View Products for Sale` the app will list every available item: the item IDs, Names, Prices, and Quantities.

* `View Low Inventory`, will list all items with an inventory count lower than five.

* `Add to Inventory`, will display a prompt that will let the manager "add more" of any item currently in the store.

* `Add New Product`, will allow the manager to add a completely new product to the store.

## Technologies Used
* JavaScript
* Node.js
* MySQL
* Node Inquirer
* Node MySQL