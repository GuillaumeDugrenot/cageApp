angular.module('cageApp').directive('graphique', function(){
    return {
        restrict: 'E',
        /* Description du scope:
            @films: ensemble des films de l'acteur
            @genreActif: genre actuellement selectionné par l'utilisateur
            @isFiltering: booléen indiquant si un genre a été choisi par l'utilisateur
        */
        // scope:{
        //     films       : ' =',
        //     genreActif       : ' =',
        //     isFiltering : ' =',
        // },
        templateUrl: 'templates/graphique.html',
        link: function(scope, element, attrs, legendeCtrl){
            console.log(scope.filmographie);
            /* Initialize tooltip */
            var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; }).offset([- 10, 0]);
            var films = scope.filmographie;
            var margin = {left: 100, right: 100, bottom: 100, top: 100};
            var duration = 250;
            // time parsing's function
            var format = d3.time.format('%Y-%m-%d').parse;
            // Set canvas' dimensions
            var width = 1000;
            var height= 600;

            // Set the range of the canvas
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);
            var r = d3.scale.linear().range([4, 10]);

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
                                .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
                            .call(tip);

            // Paramétrage des cercles
            svg.selectAll('circle')
                .data(films)
                .enter()
                .append('circle')
                    .attr('id', (d) => {
                        return d.genre_ids[0];
                    })
                    .attr('cx', 0)
                    .transition()
                    .duration(duration)
                    .delay((d, i) => {
                        return i * duration;
                    })
                    .ease('cubic-in-out')
                    .attr('cx', (d) => {
                        return x(d.release_date);
                    })
                    .attr('cy', (d) => {
                        return y(d.vote_average);
                    })
                    .attr('r', (d) => {
                        return r(d.popularity);
                    })
                    .attr('fill', (d) => {
                        return scope.findColor(d.genre_ids[0]);
                    })


            // Configuration de l'axe des abcisses
            svg.append('g')
                    .attr('transform', 'translate(0,'+ height +')')
                    .attr('class', 'abscisse')
                    .call(xAxis);

            // Configuration de l'axe des ordonnées
            svg.append('g')
                .attr('class', 'ordonnee')
                    .call(yAxis)
                    // Titre de l'axe des ordonnées
                    .append('text')
                        .attr('class', 'titre-axe')
                        .attr('transform', 'rotate(-90)')
                        .attr('y', 0 - margin.left)
                        .attr('x',0 - (height / 2))
                        .attr('text-anchor','middle')
                        .text('Note du film (sur 10)');

            // Titre de l'axe des abcisses
            svg.append('text')
                .attr('class', 'titre-axe')
                .attr('text-anchor', 'middle')
                .attr('x',width / 2)
                .attr('y',height + margin.bottom)
                .text('Date de sortie des films.');

            var circles = d3.selectAll('circle');
            circles.on('mouseover',(d) => {
                tip.attr('class', 'd3-tip animate').show(d.original_title);
            });
            circles.on('mouseout', (d) => {
                tip.attr('class', 'd3-tip').show(d);
                tip.hide();
            });

            scope.$watch('activeGenre', function(genre){
                // Condition verifiant que genre != null, sinon, il trie les films selon un genre undéfini, cachant tous les points.
                if(genre != null){
                    svg.selectAll('circle')
                    .filter((d) => {
                        return d.genre_ids[0] == genre;
                    })
                    .attr('class', 'active animated fadeInUp');
                    svg.selectAll('circle')
                    .filter((d) => {
                        return d.genre_ids[0] != genre;
                    })
                    .attr('class', 'no-active')
                }
            });

            // On observe tous les changements de la variable isFiltering (indiquant si le graphique est filtré selon un genre ou non)
            scope.$watch('isFiltering', (isFiltering) => {
                console.log(isFiltering);
                // Si aucun genre n'est sélectionné, alors on affiche tous les films
                if(isFiltering == false){
                    svg.selectAll('circle')
                        .attr('class', 'active animated fadeInUp');
                }
            })
            function chooseColor(film) {
                var genreDuFilm = film.genre_ids[0];
                switch (genreDuFilm) {
                    case 28:
                        return 'DarkRed' ; //action
                    break;
                    case 12:
                        return 'green' ; //adventure
                    break;
                    case 16:
                        return 'Pink' ; //animation
                    break;
                    case 35:
                        return 'LimeGreen' ; //comedy
                    break;
                    case 80:
                        return 'DarkSeaGreen' ; //crime
                    break;
                    case 99:
                        return 'SlateBlue' ; //documentary
                    break;
                    case 18:
                        return 'PaleTurquoise' ; //drama
                    break;
                    case 10751:
                        return 'Teal' ; //family
                    break;
                    case 14:
                        return 'PeachPuff' ; //fantasy
                    break;
                    case 10769:
                        return 'Gold' ; //foreign
                    break;
                    case 36:
                        return 'RosyBrown' ; //history
                    break;
                    case 27:
                        return 'Sienna' ; //horror
                    break;
                    case 10402:
                        return 'LightSteelBlue' ; //music
                    break;
                    case 9648:
                        return 'PowderBlue' ; //mystery
                    break;
                    case 10749:
                        return 'PowderBlue' ; //romance
                    break;
                    case 878:
                        return 'DodgerBlue' ; //science-fiction
                    break;
                    case 10770:
                        return 'MidnightBlue' ; //tv show
                    break;
                    case 53:
                        return 'LightSlateGray' ; //thriller
                    break;
                    case 10752:
                        return 'Coral' ; //war
                    break;
                    case 37:
                        return 'Moccasin' ; //western
                    break;

                }
            }
        }
    }
})
