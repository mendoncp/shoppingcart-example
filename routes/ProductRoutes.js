/**
 * Created by dev on 2017-06-04.
 */

var express = require('express');

var router = express.Router();

var dbs = require('./database/mongoconnect')
var productData = require('./database/ProductSchema');




router.get('/',function(req,res){


      if(req.query.param1 !== undefined){

          productData.find({_id:req.query.param1},function(err,product) {

              if (!err) {
                 if(product[0].quantity > req.query.param2){
                     res.json({items:{ statusofitem : false}});
                 }else{
                     res.json({items:{ statusofitem : true}});
                 }
              } else {
                  console.log("Error Log" + err);
              }
          })

      }  else{

          productData.find({},function(err,products){

              if(!err){

                  res.json({items:products});

              }else{
                  console.log("Error Log"+err);
              }

          });

      }


})

router.post('/',function(req,res){

var items = req.body.items;
for(i=0;i < items.length; i++){

    productData.find({_id :req.body.items[i]._id },function(err,product){

        product[0].itemQuantity = (parseInt( product[0].itemQuantity) - parseInt(items[i].quantity)).toString();
        product[0].save(function(err,products){

            console.log(err);
            console.log(products);

        });
    })

}



})

module.exports = router;