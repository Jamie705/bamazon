var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require("dotenv").config();

var keys = require("./keys.js");
var password = keys.password;
// connect to the mysql server and sql database

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: password,
    database: "bamazon_db"
});

connection.connect (function (err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);
    showProducts();
    setTimeout(chooseId, 300);
});

// function to query and show products available
function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                "Id: " +
                res[i].id +
                " || Product: " +
                res[i].product_name +
                " || Price: " +
                res[i].price +
                "\n------------------------------------------------------------",
            );
        }
    // connection.end();
    });
}

//funtion to show/check quantity available for all products. ==Did not use==
function showQuantity() {
    connection.query("SELECT id, quantity FROM products", function (err, res) {
        if (err) throw err;
        for (let j = 0; j < res.length; j++) {
            console.log(
                "Id: " +
                res[j].id +
                " || Quantity Available : " +
                res[j].quantity +
                "\n==================================="
            );
        }
    });       
}

function orderMore() {
    // prompt if another order is placed 
    inquirer
        .prompt(
            {
                name: "confirm",
                type: "confirm",
                message: "Would you like to place another order?",  
                default: true

            })
        .then(function (answer) {
            if (answer.confirm){
                showProducts();
                setTimeout(chooseId, 300);
            }
            else{
                console.log("Thanks for visiting! Goodbye.")
                connection.end();
            }
        });
}
var price;
// //function to choose id 
function chooseId() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        idArr=[];
        for (let i = 0; i < res.length; i++) {
            idArr.push(res[i].id)
        }
        // prompt for id choice 
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "What is the ID number of the product you would like to purchase?",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like order?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                //save answer into variable to check id against qty
                var chosenId = answer.id;
                //save answer into variable to save qty
                var chosenQuantity= answer.quantity;

                if (idArr.indexOf(parseInt(chosenId)) === -1) {
                    console.log("Sorry " + chosenId + " is not a valid ID#. Please try again.");
                        chooseId(); 
                }
                else {
                    console.log("Great choice. Checking inventory .....");
                    
                    //query to check available quantity
                    var query = "SELECT quantity FROM products WHERE id=?"
                    connection.query(query, chosenId, function (err, res) {
                        if (err) throw err;

                        var qtyAvailable = res[0].quantity
                        // check chosen id against available qty and assign variable
                        var newQuantity = (qtyAvailable - chosenQuantity);
                        // console.log(newQuantity);
                        //if quantity is available place order else start over
                        if (chosenQuantity < qtyAvailable) {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        quantity: newQuantity
                                    },
                                    {
                                        id: answer.id
                                    }
                                ],
                                function (err) {
                                    if (err) throw err;

                                    //query for price
                                    var priceQuery = "SELECT price FROM products WHERE id=?"
                                    connection.query(priceQuery, chosenId, function (err, res) {
                                        if (err) throw err;

                                        else if (price != null) {
                                            price += res[0].price * chosenQuantity;
                                        }
                                        else {
                                            //store variable to display price
                                            price = res[0].price * chosenQuantity
                                        }
                                        console.log(
                                            "\n==========================================================================",
                                            "\nYour order has been placed successfully. Your total cost is: $" + price +
                                            "\n==========================================================================\n"
                                        );

                                        // re-prompt the user for if they want to placce another order
                                        orderMore();
                                    });
                                }
                            );
                        }
                        else {
                            //Quantity was not available, so apologize and start over
                            console.log("Sorry, the quantity requested for this product is not available. Please try again....\n");
                            setTimeout(chooseId, 300);
                        }
                    });

                    
                }
                   
        });          
    });
}
