/**
 * Created by dev on 2017-06-04.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema =  new Schema({

    "itemName" : {type : String},
    "itemDescription" :{type : String},
    "ItemPrice" : {type : String},
    "itemQuantity" : {type : String},
    "itemImageName" : {type : String}

});

module.exports = mongoose.model('productSchema', productSchema);