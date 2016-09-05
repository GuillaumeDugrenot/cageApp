angular.module('cageApp').directive('legende', function($q, actorInfos) {
    return {
        restrict: 'E',
        // templateAsUrl: 'scripts/templates/legende.html',
        templateUrl: 'templates/legende.html',
        replace: true,
        link: function(scope, element, attrs) {
            var deferred = $q.defer();
            var promiseGenres = deferred.promise;

            // Appel à l'API retournant dans "promise" tous les genres cinématographique de la base.
            actorInfos.genres.query(function(results){
                deferred.resolve(results.genres);
            });

            promiseGenres.then(function (genres) {
                scope.genresFilmographie.map(function (genre, index, tableau){
                    for(var j = 0, len = genres.length; j < len; j++){
                        if(genres[j].id === genre){
                            tableau[index] = genres[j].name;
                            return tableau[index];
                        }
                    }
                });
            });


        }
    }
});
