(function() {
    'use strict';

    angular
        .module('crmApp')
        .controller('IndividualCustomerController', IndividualCustomerController);

    IndividualCustomerController.$inject = ['$scope','$routeParams'];

    /* @ngInject */
    function IndividualCustomerController($scope, $routeParams){
        $scope.user = [];
        activate();

        ////////////////

        function activate() {
            var customers = JSON.parse(localStorage.getItem("lista"));

            for(var i=0;i<customers.length;i++){    
                if(customers[i].id == $routeParams.id){
                    $scope.user = customers[i];
                }
            }  
            console.log($scope.user);
        }
    }
})();