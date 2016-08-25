angular.module('cageApp').directive('graphique', function($timeout){
    return {
            restrict: 'E',
            scope:{
                films: '='
            },
            templateUrl: 'templates/graphique.html',
            link: function(scope, element, attrs) {
                var films = scope.films;
                var svg = d3.select(element[0]).append('svg').attr('width', 500).attr('height', 500);
                svg.selectAll('circle')
                    .data(films)
                    .enter()
                    .append('circle')
                    .attr('cy', function(d){
                        return d.vote_average;
                    })
                    .attr('cx', function(d){
                        var annee = d.release_date;
                        return annee.substring(0, 4);
                    })
                    .attr('r', 10);
            }
    }
})
