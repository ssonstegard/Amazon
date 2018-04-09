/////////////////////////////////////////////
//////////////// Amazon HW //////////////////
/////////////////////////////////////////////

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "amazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    displayItems();
});

var displayItems = function () {
    var query = 'Select * FROM amazonItems'
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
        }
    });
    selectItem();
}

// function which prompts the user for what action they should take
function selectItem() {

    inquirer
        .prompt([{
            name: "product_id",
            type: "input",
            message: "What product ID number would you like to select?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }])

        .then(function (answer) {
            var query = 'SELECT * FROM amazonItems WHERE id=' + answer.quantity;
            connection.query(query, function (err, res) {
                if (answer.quantity <= res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("We have " + res[i].stock_quantity + " " + res[i].product_name + ".");
                        console.log("Your order of " + res[i].stock_quantity + " " + res[i].product_name + " is complete.");
                    }
                } else {
                    console.log("Sold out of this product.");
                }
                displayItems();
            })
        })
};

