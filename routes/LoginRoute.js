/**
 * Created by dev on 2017-06-04.
 */

var express = require('express');

var router = express.Router();

var dbs = require('./database/mongoconnect')
var userData = require('./database/UserData');


router.post('/',function(req,res){


    var param1 = req.body.username;
    var param2 = req.body.password;
    console.log(param1);
    console.log(param2);

    userData.find({"emailid":param1},function(err,profile){
        console.log(profile);
        console.log(err);
        if( typeof profile !== 'undefined' && profile.length === 1){

           if(profile[0].emailid === param1 && profile[0].password === param2){
              var item = {
                  "name" : profile[0].Name,
                  "id" : profile[0].emailid
              };
               res.json({items:{status : 200, profile:item, message: "Success"}});
           }else{

               res.json({items:{status : 403,  message: "Login Failure"}});
           }

        }else{
              res.json({items:{status : 500,  message: "Try Again Later"}});

        }


    });





})


module.exports = router;