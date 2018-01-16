(function() {
    'use strict';

    angular
        .module('crmApp')
        .controller('crmController', crmController);

    crmController.$inject = ['$scope','comicFactory', 'gifFactory'];

    /* @ngInject */
    function crmController($scope, comicFactory, gifFactory){
        $scope.customer = {};
        $scope.customerList = [];
        $scope.Gifs= [];
        $scope.Comics = [];
        $scope.customer.gifs = [];
        $scope.customer.comics = [];
        //$scope.pagina = comicFactory.pagina;
        $scope.paginaGifs = 0;
        $scope.paginaComic = 0;

        
        /////////////////
        
        $scope.cont = "datos";
        
        ////////////////
        
        $scope.newCustomer = newCustomer; 
        $scope.updateCustomer = updateCustomer;
        $scope.update = update;
        $scope.removeCustomer = removeCustomer;
        $scope.gifFavo = gifFavo;
        $scope.removeGifFav = removeGifFav;
        $scope.AllComicsRight = AllComicsRight
        $scope.AllComicsLeft = AllComicsLeft;
        $scope.AllGif = AllGif;
        $scope.AllGifTrending = AllGifTrending;
        $scope.AllComics = AllComics;
        $scope.ComicFavo = ComicFavo;
        $scope.removeComicFav = removeComicFav;
        activate();

        ////////////////

        function activate() {
            
            console.log($scope.pagina);
            
           $scope.customerList = getAll();
        }
        
        function AllComics(q,num){
            comicFactory.getAllComics(q,num).then(data);
            
            function data(datos){
                $scope.Comics = datos;
            }
            
        }
        
        function AllComicsRight(q){
            $scope.paginaComic++;
            comicFactory.getAllComics(q,$scope.paginaComic).then(data);
            
            function data(datos){
                $scope.Comics = datos;
            }
        }
        
        function AllComicsLeft(q){
            $scope.paginaComic--;
            comicFactory.getAllComics(q,$scope.paginaComic).then(data);
            
            function data(datos){
                $scope.Comics = datos;
            }
        }
        
        
        function AllGif(q,num){
            gifFactory.getAllGif(q,num).then(datos);
            
            function datos(data){
                $scope.Gifs = data;
            }
        }
        
        
        function AllGifTrending(){
             customerFactory.getAllGifTrend().then(datosTrend);
        } 
        
        function datosTrend(response){
            $scope.Gifs = response.data.data;
        }
        
        function ComicFavo(comic){
            var lom = 1
            for(var i=0;i<$scope.customer.comics.length;i++){
                if($scope.customer.comics[i].id === comic.id){
                    lom = 0;
                }
            }
            if (lom === 1){
                
                 $scope.customer.comics.push({id: comic.id, Url: comic.images[0].path, extension: comic.images[0].extension} );
                
            }       
        
        }
        function gifFavo(gif){
            var lom = 1;
            for(var i=0;i<$scope.customer.gifs.length;i++){
                if($scope.customer.gifs[i].id === gif.id){
                    lom = 0;
            }
            }
            if (lom === 1){
                $scope.customer.gifs.push({id: gif.id, url: gif.images.preview_gif.url});
            }
        }
        
        function newCustomer(customer){
            $scope.customer.id = randId();
            $scope.customerList.push(customer);
            save();
            $scope.customer = {gifs: [], comics:[]};
            $scope.Gifs = [];
            $scope.Comics = [];
            $scope.searchGif = "";
            $scope.searchComic = "";
        }
        
        function removeGifFav(gif){
            for(var i=0;i<$scope.customer.gifs.length;i++){
                if($scope.customer.gifs[i].id === gif){
                     $scope.customer.gifs.splice(i,1);
                }
            }
           
            
        }
        
        function removeComicFav(id){
            for(var i=0;i<$scope.customer.comics.length;i++){
                if($scope.customer.comics[i].id === id){
                     $scope.customer.comics.splice(i,1);
                }
            }
        }
        function getAll(){
            if("lista" in localStorage){
                var lista = JSON.parse(localStorage.getItem("lista"));
                return lista;
            }else{
                return [];
            }
        }
        
        function save(){
            localStorage.setItem("lista",JSON.stringify($scope.customerList));
        }
        
        
        function updateCustomer(id){
                $scope.showme = true;
            
            for (var i = 0; i < $scope.customerList.length; i++) {
                if ($scope.customerList[i].id === id) {
                    $scope.customer = JSON.parse(JSON.stringify($scope.customerList[i]));
                }
            }
            console.log($scope.customer);
        }
        
        function update(){
            for (var i = 0; i < $scope.customerList.length; i++) {
                if ($scope.customerList[i].id === $scope.customer.id) {
                    $scope.customerList[i] = JSON.parse(JSON.stringify($scope.customer));
                     save();
                    $scope.customer = {gifs: [], comics: []};
                    $scope.Gifs = [];
                    $scope.Comics = [];
                    $scope.searchGif = "";
                    $scope.searchComic = "";
                    
                }

            }
            $scope.showme = false;
            
        }
        
        function removeCustomer(id){
            if (!confirm("¿Estas seguro de que quieres borrar?")) {
                return false;
            } else {
                for (var i = 0; i < $scope.customerList.length; i++) {
                    if ($scope.customerList[i].id === id) {

                        $scope.customerList.splice(i, 1);
                    }
                }
                 save();
            }
        }
        
        
        
        function randId() {
            return Math.random().toString(36).substr(2, 10);
        }
        
        
        
    }
    
    
})();



















