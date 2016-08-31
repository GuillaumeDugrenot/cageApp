angular.module('cageApp').directive('graphique', function(){
    return {
            restrict: 'E',
            scope:{
                films: '='
            },
            templateUrl: 'templates/graphique.html',
            link: function(scope, element, attrs){
                films = scope.films,

                // time parsing's function
                parseDate = d3.time.format('%y-%b-%d').parse,

                // Set canvas' dimensions
                width = 800,
                height= 500,

                // Set the range of the canvas
                x = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]);

                // Parsing each release_date movie
                films.forEach((d) => {
                    d.release_date = parseDate(d.release_date);
                });

                // Scale the range of datas
                x.domain(d3.extent(films, (d) => { return d.release_date; }));
                y.domain([0, d3.max(films,(d) => { return d.vote_average; })]);

                var xAxis = d3.svg.axis().scale(x)
                    .orient('bottom').ticks(5);

                var yAxis = d3.svg.axis().scale(y)
                    .orient("left").ticks(10);

                var valueLine = d3.svg.line()
                    .x((d) => { return x(d.release_date); })
                    .y((d) => { return y(d.vote_average); });

                var svg = d3.select('body')
                            .append('svg')
                                .attr('width', width)
                                .attr('height', height);

            }
    }
})
