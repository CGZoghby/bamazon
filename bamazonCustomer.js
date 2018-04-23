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
    buyItem();
});

function buyItem() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy
        inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to buy?"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function (answer) {
                //once order is placed then check to see if store has enough product to meet request. 
                //if not, console log "Insufficient quantity!" and prevent order from going through.
                //if do, fulfill order -> deduct stock, show total cost of purchase.
                var chosenItem; // get the information of the chosen item
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                // determine if enough stock
                if (chosenItem.stock_quantity > parseInt(answer.units)) {
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: parseInt(chosenItem.stock_quantity) - parseInt(answer.units)
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Purchase Successful! You spent $" + parseInt(answer.units)*chosenItem.price);
                            buyItem();
                        }
                    );
                }
                else {
                    // Not enough stock
                    console.log("Insufficient Quantity!");
                    buyItem();
                }
            });
    });
}