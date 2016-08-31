angular.module('cageApp').controller('mainCtrl', function($scope, movies){
    movies.query(function(films) {
        var nbPages = films.total_pages;
        var filmographie = [];
        for(var pageEnCours = 1; pageEnCours <= nbPages; pageEnCours++){
            movies.query({page: pageEnCours}, function(filmsParPage){
                for(film in filmsParPage.results){
                    if(filmsParPage.results[film].release_date != ''){
                        filmographie.push(filmsParPage.results[film]);
                    }
                }
                $scope.filmographie = filmographie;
            });
        }
    });
});
