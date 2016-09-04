angular.module('cageApp').directive('legende', function($q, actorInfos) {
    return {
        restrict: 'E',
        templateAsUrl: 'templates/legende.html',
        replace: true,
        link: function(scope, element, attrs) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            // Appel à l'API retournant dans "promise" tous les genres cinématographique de la base.
            actorInfos.genres.query(function(results){
                deferred.resolve(results.genres);
            });

            promise.then(function (genres) {
                console.log(scope.genresFilmographie);
                for(var i = 0; i < scope.genresFilmographie.length; i++){
                    scope.genresFilmographie[i] = trouveGenreCorrespondant(i, genres);
                }
            });

            // @idGenre: correspond à l'id d'un genre d'un genre cinématographique présent dans la filmographie de l'acteur
              function trouveGenreCorrespondant(i, genres){
                for(var j = 0, len = genres.length; j < len; j++){
                    if(genres[j].id === scope.genresFilmographie[i]){
                        return  genres[j].name;
                    }
                }
            };
        }
    }
});
