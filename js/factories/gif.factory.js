(function () {
    'use strict';
    angular
        .module('crmApp')
        .factory('gifFactory', gifFactory);

    gifFactory.$inject = ['$http'];
    /* @ngInject */
    function gifFactory($http){
        var exports = {
            getAllGif : getAllGif,
            getAllGifTrend : getAllGifTrend
        };
        
        var offsetgifs = 0;
        var limit = 8;

        return exports;

        ////////////////

        function getAllGif(q,num) {
            offsetgifs = parseInt(offsetgifs + num);
            
            return $http.get('https://api.giphy.com/v1/gifs/search?api_key=ME0GaCNKo6RtuRs36vWes9DQXs7XDb8W&q='+q+'&limit='+limit+'&offset='+offsetgifs+'&rating=G&lang=en').then(datosGif);
            function datosGif(response){
             return response.data.data;
        }
            
        }
        
        function getAllGifTrend(){
            return $http.get('https://api.giphy.com/v1/gifs/trending?api_key=ME0GaCNKo6RtuRs36vWes9DQXs7XDb8W&limit='+limit+'&offset=0&rating=G&lang=en');
        }
        
    }
})();