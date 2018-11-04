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

connection.connect(function (err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);
    managerOptions();
});


// //function to choose options available to manage
function managerOptions() {
    // prompt for options available 
    inquirer
        .prompt(
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                ]
            }
        )
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowQuantity();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        });
}

// function to query and show all products available
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                "Id: " +
                res[i].id +
                " || Product Name: " +
                res[i].product_name +
                " || Price: " +
                res[i].price +
                " || Quantity: " +
                res[i].quantity +
                "\n================================================================================"
            );
        }
    });
    continueManage();
}

//funtion to show/check low quantity for all products
function lowQuantity() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
            for (let j = 0; j < res.length; j++){
                productName = res[j].product_name;
                //else if statement to show if product is under 5 qty
                if (res[j].quantity <= 5){
                    console.log( 
                        "\n*************** Warning: Inventoy is low!! ***************\n",
                        "Id: " +
                        res[j].id +
                        " || Product Name: " +
                        res[j].product_name +
                        " || Quantity: " +
                        res[j].quantity +
                        "\n**********************************************************",
                    )
                }     
                else {
                    console.log(
                        "\n************************* Inventoy is Good *************************\n"
                        + productName + " has inventory of 5 or greater in quantity",
                        "\n********************************************************************",
                    );
                } 
            }           
    });
    continueManage();
}

//function to update inventory
function addInventory() {                
    console.log("Update inventory...\n");
        inquirer
            .prompt([
                {
                    name: "productID",
                    type: "input",
                    message: "Enter the ID of the product you want to update: ",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Enter the new quantity: ",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
            ])

            .then(function (answer) {
                idUpdate = answer.productID;
                quantity = answer.quantity;

                connection.query(
                    "UPDATE products SET ? WHERE ?", 
                    [
                        {
                            quantity: quantity,
                        },
                        {
                            id: idUpdate,  
                        }
                    ],
                function (err, res) {
                    console.log("Id: " + idUpdate + " quantity has been updated to" + quantity);
                })
                continueManage(); 
            }); 
}

//function to add a new product
function addProduct() {
    console.log("Insert a new product...\n");
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the product name?",
            },
            {
                name: "department",
                type: "list",
                message: "What department is this product for?",
                choices: [
                    "Electronics",
                    "Books",
                    "Video Games",
                    "Toys"
                ]
            },
            {
                name: "price",
                type: "input",
                message: "What is product price?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items are available?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            newItem = answer.product;
            departmentName = answer.department;
            price = answer.price;
            quantity = answer.quantity;

            connection.query(
                "INSERT INTO products SET ?",
                {
                product_name: newItem,
                department_name: departmentName,
                price: price,
                quantity: quantity,
                },

                function (err, res) {
                    console.log(res.affectedRows + " Product Added!\n");
                    // Call updateProduct AFTER the INSERT completes
                    // updateProduct();
                }
            )
            continueManage();
        });
}

//function to ask if they want to continue to manage
function continueManage() {
    // prompt if another action is needed 
    inquirer
        .prompt(
            {
                name: "confirm",
                type: "confirm",
                message: "Would you like to do something else?",
                default: true

            })
        .then(function (answer) {
            if (answer.confirm) {
                managerOptions();
            }
            else {
                console.log("Thank you! Goodbye.")
                connection.end();
            }
        });
}
