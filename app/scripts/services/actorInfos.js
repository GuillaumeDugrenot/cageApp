angular.module('cageApp').provider('actorInfos', function() {
    var apiKey = '';
    var actor = '';
    this.setApiKey = function(cle) {
        apiKey = cle;
    };
    this.setActor = function(idActor) {
        actor = idActor;
    };
    this.$get = function($resource) {
        return {
            genres: $resource('http://api.themoviedb.org/3/genre/movie/list', {}, {'query': {method: 'GET', params: {api_key: apiKey}}}),
            movies: $resource('http://api.themoviedb.org/3/discover/movie?sort_by=release_date.asc', {}, {'query': {method: 'GET', params: {api_key: apiKey, with_cast: actor}}})

        }
    }
})
