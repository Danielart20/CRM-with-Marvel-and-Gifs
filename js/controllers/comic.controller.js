(function() {
    'use strict';

    angular
        .module('crmApp')
        .controller('comicController',   comicController);

        comicController.$inject = ['$scope','$http', '$routeParams', 'comicFactory'];

    /* @ngInject */
    function comicController($scope, $http, $routeParams, comicFactory){
        $scope.comics = [];
        activate();

        ////////////////

        function activate() {
            comicFactory.getComicById($routeParams.id).then(comic);
            
            function comic(response){
                $scope.comics = response.data.data.results;
            }
        }
    }
})();