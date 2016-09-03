angular.module('cageApp').directive('legende', function(actorInfos) {
    return {
        restrict: 'E',
        templateAsUrl: 'templates/legende.html',
        replace: true,
    }
})
