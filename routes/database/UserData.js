/**
 * Created by Pramod on 9/23/2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserData =  new Schema({

    emailid : {type: String},
    password : {type: String},
    Name : {type : String}

});

module.exports = mongoose.model('UserData', UserData);