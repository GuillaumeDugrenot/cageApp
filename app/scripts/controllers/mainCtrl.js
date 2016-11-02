angular.module('cageApp').controller('mainCtrl', function($scope, $q, actorInfos, recuperationFilms){
    $scope.isFiltering = false;
        // Recherches des films avec le provider actorInfos
        var deferred = $q.defer();
        var filmographyGenresFound = deferred.promise;
        var genres       = [];
        actorInfos.movies.query(function(films){
            var nbPages      = films.total_pages;
            var filmographie = [];
            var dateToday = Date.now();
            for(var pageEnCours = 1; pageEnCours <= nbPages; pageEnCours++){
                actorInfos.movies.query({page: pageEnCours}, function(filmsParPage){
                    angular.forEach(filmsParPage.results, function(film){
                        var dateDuFilm = transformDate(film.release_date);
                        if(dateDuFilm <= Date.now()
                            && film.vote_average != 10
                            && film.vote_average != 0
                            && film.genre_ids.length != 0){
                            // Si le genre du film n'est pas déjà présent dans le tableau des genres, on l'ajoute
                            if(genres.indexOf(film.genre_ids[0]) === -1){
                                 // console.log(filmsParPage.results[film].genre_ids[0])
                                    genres.push((film.genre_ids[0]));
                            }

                            filmographie.push(film);
                        }
                        console.log('page: ',pageEnCours,' : ',genres)
                    })
                });
            }
            console.log(genres)
            $scope.filmographie = filmographie;
            deferred.resolve(genres);
        })

        filmographyGenresFound.then(function(genresFilmography){
            $scope.genresFilmographie = [];
            var colors  = Please.make_color({
                colors_returned: 13
            });
            actorInfos.genres.query(function(allGenres)
            {
                assignationCouleur(genresFilmography, allGenres, colors);
            });
        });


    // @genre = représente le genre choisi par l'utilisateur au moment du click sur la légende des genres.
    $scope.setActive = function(genre) {
        $scope.activeGenre = genre;
        $scope.isFiltering = true;
    };

    $scope.filterGenres = function(){
        if($scope.isFiltering){
            $scope.isFiltering = false;
        }
    };

    $scope.findColor = function(genreDuFilm){
        $scope.genresFilmographie.find(function(element, index, array){
            if(element.id == genreDuFilm){
                return element.color
            }
        })
    }
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

    function assignationCouleur(genresFilmography, allGenres,colors){
        var allGenres = allGenres.genres;
        // compteur de couleur
        var j = 0;
        for (var i = 0; i < allGenres.length; i++)
        {
            var found = false;
            for(var genreFilmo of genresFilmography)
            {
                if(genreFilmo == allGenres[i].id)
                {
                    found = true;
                    allGenres[i].color = colors[j];
                    j++;
                    $scope.genresFilmographie.push(allGenres[i]);
                }
            }
        }
    }


});
