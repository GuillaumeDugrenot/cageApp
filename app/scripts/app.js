angular.module('cageApp', ['ngResource'])
.config(function(moviesProvider) {
    moviesProvider.setApiKey('dc27133aa81bb9b7ccdc95ec72069a9b');
    moviesProvider.setActor(2963);
});
