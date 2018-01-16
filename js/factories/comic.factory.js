(function () {
    'use strict';
    angular
        .module('crmApp')
        .factory('comicFactory', comicFactory);

    comicFactory.$inject = ['$http'];

    /* @ngInject */
    function comicFactory($http){
        var limit = 8;
        var offsetcomics = 0;
        
        var exports = {
             getAllComics : getAllComics,
             getComicById: getComicById
        };
        

        return exports;

        ////////////////

        function getAllComics(q,num){ 
            offsetcomics = parseInt(limit*num);
            
            return $http.get('https://gateway.marvel.com:443/v1/public/comics?apikey=b3ef3d539cc3de3147f975d966be9ea8&title='+q+'&limit='+limit+'&offset='+offsetcomics).then(datosComic);
            
            function datosComic(response){
                return response.data.data.results;
            }
        }
        
        function getComicById(id){
            return $http.get('https://gateway.marvel.com:443/v1/public/comics/'+id+'?apikey=b3ef3d539cc3de3147f975d966be9ea8');
        }
    }
})();