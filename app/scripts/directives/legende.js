angular.module('cageApp').directive('legende', function(actorInfos) {
    return {
        restrict: 'E',
        templateAsUrl: 'templates/legende.html',
        replace: true,
        link: function(scope, element, attrs) {
            actorInfos.genres.query(function(results) {
                var genres = results.genres;
            });

        }
    }
})
