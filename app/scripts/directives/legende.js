angular.module('cageApp').directive('legende', function($q, actorInfos) {
    return {
        restrict: 'E',
        templateUrl: 'templates/legende.html',
        replace: true,
        link: function(scope, element, attrs) {
        }
    }
});
