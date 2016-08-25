angular.module('cageApp').controller('mainCtrl', function($scope, movies){

    movies.query(function(films) {
        
        var nbPages = films.total_pages;
        var filmographie = [];
        for(var pageEnCours = 1; pageEnCours <= nbPages; pageEnCours++){
            movies.query({page: pageEnCours}, function(filmsParPage){
                for(film in filmsParPage.results){
                        filmographie.push(filmsParPage.results[film]);
                }
                $scope.filmographie = filmographie;
            });
        }
        console.log($scope.filmographie);
    });
});
