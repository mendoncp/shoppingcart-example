/**
 * Created 06.04.2017
 * Pramod Mendonca
 *
 */
angular.module('edxservices',[])


.service('loginService' ,['$http','$q',function($http,$q){
    var UserProfile={};
    var deferred = $q.defer();

    function verifyUser(user,pass){

        var userData = {
            "username":user,
            "password":pass
        };

        return $http.post('/login',userData).then(function(res,err){
            console.log(res);
            if(!err){
                UserProfile = res.data.items.profile;
                deferred.resolve(res);
                return deferred.promise;
            }else{
                deferred.resolve(err);
                return deferred.promise;
            }

        })

    }

    function getProfile(){

        return UserProfile;
    }



    return{
        verifyUser:verifyUser,
        getProfile: getProfile
    }

}])


.service('productService',['$http','$q',function($http,$q){

    var productItems = [];
    var deferred = $q.defer();
    function getItems(){


        return $http.get('/getAllItems').then(function(res,err){

            if(!err){

                productItems = res.data.items;
                deferred.resolve(res);
                return deferred.promise;
            }else{

                deferred.reject(err);

            }

        })


    }

    function getProducts(){
        return productItems;
    }



return{

    getItems: getItems,
    getProducts : getProducts

}

}])


.service('shoppingCartService',['$q','$http',function($q,$http){
var shoppingCartQuantity = [];
function checkItemQuantity(itemid,quantity){

    return $http.get('/chectItemQuantity',{params:{"param1": itemid,"param2": quantity}}).then(function(res,err){

        if(!err){
            return res;

        }else{
            console.log(err);
        }
     })


}


function setshoppingCartQuantity(item){
    shoppingCartQuantity.push(item);

}

function getshoppingCartQuantity(){

    return shoppingCartQuantity;
}

function updateItems(){
    var prodData = {items :shoppingCartQuantity }
   return $http.post('/updateItems',prodData).then(function(res,err){


   })

}
return{
    checkItemQuantity:checkItemQuantity,
    setshoppingCartQuantity : setshoppingCartQuantity,
    getshoppingCartQuantity : getshoppingCartQuantity,
    updateItems : updateItems
}


}])
