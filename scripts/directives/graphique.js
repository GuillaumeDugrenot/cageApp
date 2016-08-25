angular.module('cageApp').directive('graphique', function($timeout){
    return {
            restrict: 'E',
            templateUrl: 'templates/graphique.html',
            link: function(scope, element, attrs) {
                $timeout(function(){
                    console.log(scope.filmographie);
                },2000)
                // var svg = d3.select(element[0]).append('svg').attr('width', 500).attr('height', 500);
                // svg.selectAll('circle')
                //     .data([50,100,150,200])
                //     .enter()
                //     .append('rect')
                //     .attr('x', function(d,i) {
                //         return i * 21;
                //     })
                //     .attr('height', function(d) {
                //         return d;
                //     })
                //     .attr('width', 10)
                //     .attr('fill', 'black');

            }
    }
})
