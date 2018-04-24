//Display all items available for sale
//then prompt with 2 messages: enter the id of the item you'd like to buy,
//THEN ask how many units of the product they would like to buy
var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "What would you like to do?"
            },
        ])
            .then(function (answer) {
                if (answer.choice === "View Products For Sale") {
                    //list every available item
                    for (var i = 0; i < results.length; i++) {
                        console.log(`${results[i].id}: ${results[i].product_name} @ $${results[i].price}, ${results[i].stock_quantity} in stock`)
                    }
                    start();
                } else if (answer.choice === "View Low Inventory") {
                    //list all items with stock_quantity < 5
                    connection.query(
                        "SELECT * FROM `products` WHERE `stock_quantity` < 5",
                        function (err, result) {
                            if (err) throw err;
                            for (var i = 0; i < result.length; i++) {
                                console.log(`${result[i].id}: ${result[i].product_name} @ $${result[i].price}, ${result[i].stock_quantity} in stock`)
                            }
                            start();
                        }
                    )
                } else if (answer.choice === "Add to Inventory") {
                    //Display prompt to increase stock of any item in store
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Please enter the id of the item you'd like to purchase more stock of:",
                            name: "stock"
                        },
                        {
                            type: "input",
                            message: "How much total stock would you like for this item?",
                            name: "quantity"
                        }
                    ]).then(function (answer) {
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: answer.quantity 
                                },
                                {
                                    id: answer.stock
                                }
                            ],
                            function(error) {
                                if (error) throw error;
                                console.log("Stock updated!")
                                start();
                            }
                        )
                    });
                } else if (answer.choice === "Add New Product") {
                    //add totally new product
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Please enter the name of the item you'd like to add.",
                            name: "productName"
                        },
                        {
                            type: "input",
                            message: "Please enter the department the item belongs in.",
                            name: "departmentName"
                        },
                        {
                            type: "input",
                            message: "Please enter the value of the item.",
                            name: "price"
                        },
                        {
                            type: "input",
                            message: "Please enter the amount of item to have on hand.",
                            name: "stock"
                        },
                    ]).then(function(response) {
                        connection.query(
                            "INSERT INTO products SET ?",
                            {
                                product_name: response.productName,
                                department_name: response.departmentName,
                                price: response.price,
                                stock_quantity: response.stock
                            },
                            function(error) {
                                if (error) throw error;
                                console.log("Your item was successfully added!");
                                start();
                            }
                        )
                    })
                };
            });
    });
}