/**
 * Created by Pramod
 */

var mongoconnect = require('mongoose');

mongoconnect.connect('mongodb://localhost/shoppingCart');


var dbss = mongoconnect.connection;
console.log(mongoconnect.connection.readyState);
dbss.on('error', function (err) {
console.log(err);
});

dbss.once('open', function callback () {
 console.log("Connected to DB!");
});

module.exports = mongoconnect;

