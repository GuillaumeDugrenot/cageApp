angular.module('cageApp').directive('graphique', function(){
    return {
        restrict: 'E',
        scope:{
            films: '='
        },
        templateUrl: 'templates/graphique.html',
        link: function(scope, element, attrs){
            var films = scope.films,
            margin = {left: 200, right: 200, bottom: 100, top: 100},

            // time parsing's function
            format = d3.time.format('%Y-%m-%d').parse,

            // Set canvas' dimensions
            width = 1000,
            height= 600,

            // Set the range of the canvas
            x = d3.time.scale().range([0, width]),
            y = d3.scale.linear().range([height, 0]);
            r = d3.scale.linear().range([2, 10]);

            // Parsing each release_date movie
            films.forEach((d) => {
                d.release_date = format(d.release_date);
            });

            // Scale the range of datas
            x.domain(d3.extent(films, (d) => { return d.release_date; }));
            r.domain(d3.extent(films,(d)  => { return d.popularity; }));
            y.domain([0, 10]);

            var xAxis = d3.svg.axis().scale(x)
                .orient('bottom').ticks(7);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left");

            // Paramètrage du canvas
            var svg = d3.select('graphique')
                        .append('svg')
                            .attr('width', width + margin.left + margin.right)
                            .attr('height', height + margin.bottom + margin.top)
                            .attr('viewBox', '0 0 '+ (margin.right + width + margin.left) +' '+ (margin.top + height + margin.bottom))
                            .append('g')
                                .attr('transform', 'translate('+ margin.left +','+ margin.top +')');

            // Paramétrage des cercles
            svg.selectAll('circle')
                .data(films)
                .enter()
                .append('circle')
                    .attr('fill', 'black')
                    .attr('cx', 0)
                    .transition()
                    .duration(3000)
                    .ease('cubic')
                    .attr('cx', (d) => {
                        return x(d.release_date);
                    })
                    .attr('cy', (d) => {
                        return y(d.vote_average);
                    })
                    .attr('r', (d) => {
                        return r(d.popularity);
                    });

            // Configuration de l'axe des abcisses
            svg.append('g')
                    .attr('transform', 'translate(0,'+ height +')')
                .call(xAxis)
                    .attr('class', 'abscisse');

            // Configuration de l'axe des ordonnées
            svg.append('g')
                .call(yAxis)
                    .attr('class', 'ordonnee');
        }
    }
})
