angular.module('cageApp').controller('mainCtrl', function($scope, $q, actorInfos){
    // Recherches des films avec le provider actorInfos
    actorInfos.movies.query(function(films) {
        var nbPages      = films.total_pages;
        var genres       = [];
        var filmographie = [];
        for(var pageEnCours = 1; pageEnCours <= nbPages; pageEnCours++){
            actorInfos.movies.query({page: pageEnCours}, function(filmsParPage){
                for(film in filmsParPage.results){
                    if(filmsParPage.results[film].release_date != ''
                    && filmsParPage.results[film].vote_average != 10
                    && filmsParPage.results[film].vote_average != 0
                    && filmsParPage.results[film].genre_ids.length != 0){
                        // Si le genre du film n'est pas déjà présent dans le tableau des genres, on l'ajoute
                        if(genres.indexOf(filmsParPage.results[film].genre_ids[0]) === -1){
                            genres.push(filmsParPage.results[film].genre_ids[0]);
                        }
                        filmographie.push(filmsParPage.results[film]);
                    }
                }
            });
        }
        $scope.filmographie       = filmographie;
        $scope.genresFilmographie = genres;
    });
});
