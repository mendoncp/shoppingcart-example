/**
 * Created 06.04.2017
 * Pramod Mendonca
 *
 */

angular.module('edxcontrollers', [])

.factory('_', ['$window',
      function($window) {
        // place lodash include before angular
        return $window._;
      }
    ])

.controller('LoginController',function($scope,$location,$state,loginService){

    /**
     * Login To the Website to begin Shopping
     */
    
        $scope.doLogin = function(){
            var username= $scope.name.id;
            var password= $scope.name.password;

            loginService.verifyUser(username,password).then(function(response){

                    console.log(response.data.items.status);

                    if(response.data.items.status === 200){

                        $state.go('BuyPage');
                    }else if(response.data.items.status === 403){

                        alert("User Not Registered");
                    }else{

                        alert("Something Went Wrong.Try Again Later");
                    }

            });

        
    }

})

/**
 *
 * Controller for Products
 *
 */

    .controller('productController',function($scope,$routeParams,$location,$stateParams,productService,$state){

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {

        if (fromState.name === "viewProduct") {

            $scope.pitems = productService.getProducts();


        } else if (fromState.name === 'home') {
            $scope.pitems=[];
            $scope.getItemsFromService();
        }
    });

    $scope.getItemsFromService = function(){

            productService.getItems().then(function(res,err){

                if(!err){
                    console.log(res.data.items);
                    $scope.pitems =  res.data.items;
                }

            })

        }

    $scope.addItem = function(itemName,itemid){

        $state.go('viewProduct',{param:itemName,param1:itemid});
    }
})

.controller('viewProductController',function($scope,$stateParams,productService,$state,_,shoppingCartService){

   $scope.getProductItem = function(){

      $scope.item = _.find(productService.getProducts(),function (item) {

          return item._id === $stateParams.param1
          
      })

        console.log(  $scope.item);
    }

    $scope.addtoCart = function(item){

            console.log(item);
          //  console.log($scope.name.qunatity);

                shoppingCartService.checkItemQuantity(item._id,$scope.name.qunatity).then(function(res,err){

                    if(res.data.items.statusofitem === true){
                        item['quantity'] = $scope.name.qunatity;
                        console.log(item);
                        shoppingCartService.setshoppingCartQuantity(item);
                    }else{

                        alert("Item is sold out");
                    }

                })




    }

})


.controller('ShoppingcartController',function($scope,$stateParams,productService,$state,_,shoppingCartService){

    $scope.getshoppinglist = function(){
        var itemArray =  shoppingCartService.getshoppingCartQuantity();
        var total = 0;
        for(i=0;i < itemArray.length;i++){

            total = total+(parseInt(itemArray[i].ItemPrice.slice(1)) * parseInt(itemArray[i].quantity));
        }
        console.log(total);
        $scope.items =itemArray;
        $scope.totalitems = total;


    }

    $scope.removeItem = function (id) {

        var itemArray =  shoppingCartService.getshoppingCartQuantity();
         var items = _.filter(itemArray,function(o){

             return o._id !== id;
         });
        shoppingCartService.setshoppingCartQuantity(items);
         $scope.items = items;
    }

    $scope.payforitems = function(){

        shoppingCartService.updateItems().then(function(res,err){


        });


    }

})

