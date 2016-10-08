angular.module('cageApp').controller('mainCtrl', function($scope, $q, actorInfos){
    $scope.isFiltering = false;
    // Recherches des films avec le provider actorInfos
    actorInfos.movies.query(function(films) {
        var nbPages      = films.total_pages;
        var genres       = [];
        var filmographie = [];
        var dateToday = Date.now();
        for(var pageEnCours = 1; pageEnCours <= nbPages; pageEnCours++){
            actorInfos.movies.query({page: pageEnCours}, function(filmsParPage){
                for(film in filmsParPage.results){
                    var dateDuFilm = transformDate(filmsParPage.results[film].release_date);
                    if(dateDuFilm <= Date.now()
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

    // @genreName = représente le genre choisi par l'utilisateur au moment du click sur la légende des genres.
    $scope.setActive = function(genre) {
        $scope.activeGenre = genre;
        $scope.isFiltering = true;
    };

    $scope.filterGenres = function(){
        if($scope.isFiltering){
            $scope.isFiltering = false;
        }
    };
    // @dateToParse: correspond à la date de sortie du film fourni par l'API
    function transformDate(dateToParse){
        if(dateToParse == false){
            return dateToParse;
        }
        var strDate = dateToParse;
        var dateParts = strDate.split('-');
        var date = new Date(dateParts[0], dateParts[1], dateParts[2]);
        return date;
    }
});
