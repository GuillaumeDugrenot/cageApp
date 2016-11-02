angular.module('cageApp', ['ngResource'])
.config(function(actorInfosProvider) {
    actorInfosProvider.setApiKey('dc27133aa81bb9b7ccdc95ec72069a9b');
    actorInfosProvider.setActor(2963);
    // actorInfosProvider.setActor(2963);
    actorInfosProvider.setLangage('fr');
});
