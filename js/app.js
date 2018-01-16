(function () {
    'use strict';

    angular
        .module('crmApp',["ngRoute"]).config(config);
    
    config.$inject=['$routeProvider'];
    
    function config($routeProvider){
        $routeProvider
            .when("/",{
                controller: 'crmController',
                templateUrl: '/views/crm.html'
        })
        
            .when("/user/:id",{
            controller: 'IndividualCustomerController',
            templateUrl: '/views/customer.html'
        })
        
        .when("/comic/:id",{
            controller: 'comicController',
            templateUrl: '/views/comic.html'
        })
        
        
        
    }
})();