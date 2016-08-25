angular.module('cageApp').provider('movies', function() {
    var apiKey = '';
    var actor = '';
    this.setApiKey = function(cle) {
        apiKey = cle;
    };
    this.setActor = function(idActor) {
        actor = idActor;
    };
    this.$get = function($resource) {
        // return $resource('http://api.themoviedb.org/3/discover/movie, {}, {'query': {method: 'GET', params: {}}})
        return $resource('http://api.themoviedb.org/3/discover/movie', {}, {'query': {method: 'GET', params: {api_key: apiKey, with_cast: actor}}})
    }
})
