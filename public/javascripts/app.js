var edxapp = angular.module('edxapp', ['ui.router','ngRoute', 'edxcontrollers', 'edxservices'])


edxapp.config(function($routeProvider,$locationProvider,$stateProvider){
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    
    $stateProvider
    
    .state('home',{
      
        url:'/',
        templateUrl : 'views/homePage.html',
        controller : 'LoginController'

    })
    
    .state('BuyPage',{
        
        url:'/products',
        templateUrl : 'views/products.html',
        controller : 'productController',
        params: {param: null}
        
    })
    
    .state('aboutus',{
        
        url:'/aboutus',
        templateUrl : 'views/aboutUs.html',
        controller : ''
        
    })

    .state('viewProduct',{
        
        url:'/viewProduct',
        templateUrl : 'views/viewProduct.html',
        controller : 'viewProductController',
        params: {param : null,param1 : null }
        
    })
    .state('Shoppingcart',{

            url:'/Shoppingcart',
            templateUrl : 'views/Shoppingcart.html',
            controller : 'ShoppingcartController'

        })



})