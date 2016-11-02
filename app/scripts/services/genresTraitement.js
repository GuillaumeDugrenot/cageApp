angular.module('cageApp').factory('recuperationFilms', function(actorInfos,$q,$timeout) {
         return function(){
             return actorInfos.movies.query().$promise

        }
})
