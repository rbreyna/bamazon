var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var index;
var execute = true;
var amount;
var itemList = [];


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayList();
});

function displayList() {

  var query = "Select item_id, product_name, department_name, price, stock_quantity from products";
    connection.query(query, function (err, res) {

        var table = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"]
        });

        itemList = res;

        for(i=0;i<res.length;i++){
            var row = res[i];
            row = Object.values(row);
            table.push(row);
        }

        console.log(table.toString()+"\n");

        if(execute === true){
            userchoices()};
    });
}


function userchoices() {
    inquirer
        .prompt({
            type: "number",
            name: "selection",
            message: "What is the ID of the product that you would like to buy?",
            validate: function(ID){
                if(ID > 0  && ID < 11){
                    return true;
                } else {
                    return console.log("\nInvalid ID number. Choose an appropriate ID.\n");
                }
            }
        })
        .then(function(response){
            index = response.selection;

            inquirer
                .prompt({
                    type: "number",
                    name: "quantity",
                    message: "How many of these products would you like to purchase?",
                    validate: function(ID){
                        if(ID < 0 || ID > itemList[index-1].stock_quantity){
                            return console.log("\nEnter a valid amount!")
                        } else { return true }
                    }
                })
                .then(function(response){
                    amount = response.quantity;
                    productSearch(index, amount);
                    displayList();
                })
        })
}

function productSearch(item, amount){

    var newStock = itemList[index-1].stock_quantity - amount;
    var query = "Update products set stock_quantity = " + newStock  +  " where item_ID = " + item;
    connection.query(query, function(err, res){
        if (err) throw (err);
        
        execute = false;
        table = [];
        console.log("Thanks for your purchase! Come again!\n\n")
        console.log("Updatimg product list....\n\n")
    })
}

