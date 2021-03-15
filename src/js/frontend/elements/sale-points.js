(function($) {

    var map,
        infowindow   = null,
        elements     = [],
        v_elements   = [],
        start_pos    = '',
        loader       = $( '.js-sale-loader' ),
        icon         = bravad.template_url + '/assets/img/pin.svg';

    function new_map( $el ) {
        var styledMapType = new google.maps.StyledMapType(
            [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#bdbdbd"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#ffffff"
                }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dadada"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#c9c9c9"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            }
            ],
            {name: 'Styled Map'});

        var args = {
            zoom : 14,
            center : new google.maps.LatLng( 45.41168985086999, -71.89242742720153 ),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            scrollwheel : false,
            panControl : false,
            panControlOptions : {
                position : google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl : true,
            zoomControlOptions: {
                style : google.maps.ZoomControlStyle.LARGE,
                position : google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeControl : false,
            mapTypeControlOptions : {
                mapTypeIds : [google.maps.MapTypeId.ROADMAP, 'styled_map']
            },
            draggable : true,
            disableDefaultUI : true
        };
     
        map = new google.maps.Map( $el[0], args );

        map.mapTypes.set( 'styled_map', styledMapType );
        map.setMapTypeId( 'styled_map' );

        var pin = {
            url: bravad.template_url + '/assets/img/pin.svg',
            size: new google.maps.Size( 30, 36 ),
            scaledSize: new google.maps.Size( 30, 36 ),
            anchor: new google.maps.Point( 15, 36 )
        };

        var marker = new google.maps.Marker({
            position : new google.maps.LatLng( 45.41168985086999, -71.89242742720153 ),
            animation: google.maps.Animation.DROP,
            map : map,
            icon : pin,
            title : bravad.site_title
        });

        google.maps.event.addListener( marker, 'click', function() {
            if ( infowindow ) {
                infowindow.close();
            }

            var content_str = '<p><strong>' + bravad.site_title + '</strong></p>';

            infowindow = new google.maps.InfoWindow();
            infowindow.setContent( content_str );
            infowindow.open( map, marker );
        });

        map.markers = [];

        $.ajax({
            url: bravad.ajax_url,
            type: 'POST',
            data: {
                action: 'get_points'
            },
            cache: false,
            dataType: 'json',
            success: function( data, textStatus, jqXHR ) {
                elements = data.data.markers;

                console.log( elements );
                remove_loader();
            }
        });

        return map;
    }

    function add_marker( element, map ) {
        var latlng = new google.maps.LatLng( element.lat, element.lng ),
            icon;

        if ( element.cat !== '' ) {
            icon = bravad.template_url + '/assets/img/pin-' + element.cat + '.svg';

        } else {
            icon = bravad.template_url + '/assets/img/pin.svg';
        }

        var pin = {
            url: icon,
            size: new google.maps.Size( 30, 36 ),
            scaledSize: new google.maps.Size( 30, 36 ),
            anchor: new google.maps.Point( 15, 36 )
        };

        var marker = new google.maps.Marker({
            position : latlng,
            animation: google.maps.Animation.DROP,
            map : map,
            icon : pin,
            title : element.title
        });

        map.markers.push( marker );
        v_elements.push( element.cat );

        $( '.js-filters' ).find( '.badge[data-cat=' + element.cat + ']' ).show();
        $( '.js-filters small' ).show();

        google.maps.event.addListener( marker, 'click', function() {
            if ( infowindow ) {
                infowindow.close();
            }

            if ( bravad.lang_code == 'fr' ) {
                route_label = 'Itinéraire';

            } else {
                route_label = 'Route';
            }

            var route = '<a href="https://www.google.com/maps?f=d&saddr=' + start_pos + '&daddr=' + element.lat + ',' + element.lng + '&dirflg=d" target="_blank">' + route_label + '</a>';

            // var content_str = '<p><strong>' + element.title + '</strong></p><p>' + element.address + '</p><p>Distance: ' + element.distance + ' (' + element.duration + ')</p>' + route;
            var content_str = '<p><strong>' + element.title + '</strong></p><p>' + element.address + '</p><p>Distance: ' + element.distance.toFixed( 2 ) + ' km</p>' + route;

            infowindow = new google.maps.InfoWindow();
            infowindow.setContent( content_str );
            infowindow.open( map, marker );
        });
    }

    function center_map( map ) {
        var bounds = new google.maps.LatLngBounds();

        $.each( map.markers, function( i, marker ) {
            var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

            bounds.extend( latlng );
        });

        if ( map.markers.length == 1 ) {
            map.setCenter( bounds.getCenter() );
            map.setZoom( 15 );

        } else {
            map.fitBounds( bounds );
        }
    }

    function find_closest( position ) {
        get_distance( 0 );
                
        // distance = google.maps.geometry.spherical.computeDistanceBetween( position, latLng ) / 1000;

        function get_distance( i ) {
            if ( i < elements.length ) {
                var end_pos = new google.maps.LatLng( elements[i].lat, elements[i].lng );

                elements[i].distance = google.maps.geometry.spherical.computeDistanceBetween( position, end_pos ) / 1000;
                elements[i].calc = google.maps.geometry.spherical.computeDistanceBetween( position, end_pos ) / 1000;

                i++;

                get_distance( i );

                // var directions = new google.maps.DirectionsService();

                // var request = {
                //     origin: start_pos,
                //     destination: end_pos,
                //     travelMode: google.maps.TravelMode.DRIVING
                // };

                // directions.route( request, function( response, status ) {
                //     if ( status == google.maps.DirectionsStatus.OK ) {
                //         elements[i].distance = response.routes[0].legs[0].distance.text;
                //         elements[i].calc = response.routes[0].legs[0].distance.value / 1000;
                //         elements[i].duration = response.routes[0].legs[0].duration.text;

                //         i++;

                //         get_distance( i );

                //     } else if ( status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT ) {
                //         setTimeout( function () {
                //             get_distance( i );
                //         }, 1100 );
                //     }
                // });

            } else if ( i == elements.length ) {
                create_markers();
            }
        }

        function create_markers() {
            var max_distance = $( '.js-rayon' ).val();

            elements.sort( compare_distance );

            for ( var i = 0; i < elements.length; ++i ) {
                if ( elements[i].calc <= max_distance ) {
                    add_marker( elements[i], map );
                }
            }

            center_map( map );

            remove_loader();
        }

        function compare_distance( pointA, pointB ) {
            var iRes = 0;

            if ( pointA.calc < pointB.calc ) {
                iRes = -1;

            } else if ( pointA.calc > pointB.calc ) {
                iRes = 1;
            }

            return iRes;
        }
    }

    $( '.js-search-points' ).on( 'submit', function() {
        clear_error();

        var address = $( '.js-address' ).val();

        if ( address !== '' ) {
            add_loader();

            get_address( address );
        }

        return false;
    });

    $( '.js-geo' ).on( 'click', function() {
        clear_error();

        if ( navigator.geolocation ) {
            add_loader();

            navigator.geolocation.getCurrentPosition( function( position ) {
                var pos = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );

                start_pos = position.coords.latitude + ',' + position.coords.longitude;

                reset_position( pos );

                map.setCenter( pos );

                find_closest( pos );

            }, function() {} );

        } else {
            if ( bravad.lang_code == 'fr' ) {
                render_error( "Votre navigateur ne prend pas en charge la géolocalisation" );

            } else {
                render_error( "Browser doesn't support Geolocation" );
            }

            remove_loader();
        }
    });

    function reset_position( position ) {
        if ( position !== '' ) {
            clear_marker();

            var pin = {
                    url: bravad.template_url + '/assets/img/pin-you.svg',
                    size: new google.maps.Size( 30, 36 ),
                    scaledSize: new google.maps.Size( 30, 36 ),
                    anchor: new google.maps.Point( 15, 36 )
                },
                title = '';

            if ( bravad.lang_code == 'fr' ) {
                title = 'Vous êtes ici';

            } else {
                title = 'You are here';
            }

            var marker = new google.maps.Marker({
                position : position,
                map : map,
                icon : pin,
                title: title
            });

            map.markers.push( marker );
            v_elements.push( 'you' );

            $( '.js-filters .badge[data-cat=you]' ).show();
            $( '.js-filters small' ).show();

            if ( typeof pageScroll !== 'undefined' ) {
                setTimeout( function() {
                    pageScroll.setSize();
                }, 300);
            }

        } else {
            position = new google.maps.LatLng( 45.65773661212931, -72.14718808077868 );
        }
    }

    function get_address( address ) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': address }, function( results, status ) {
            if ( status == google.maps.GeocoderStatus.OK ) {
                var pos = results[0].geometry.location;

                start_pos = pos;

                reset_position( pos );

                map.setCenter( pos );

                find_closest( pos );

            } else if ( status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT ) {

            } else if ( status == google.maps.GeocoderStatus.ZERO_RESULTS ) {
                if ( bravad.lang_code == 'fr' ) {
                    render_error( "Nous n'avons pas trouvé l'adresse" );

                } else {
                    render_error( "We couldn't find the address" );
                }

                remove_loader();
            }
        });
    }

    function clear_marker() {
        for ( var i = 0; i < map.markers.length; ++i ) {
            map.markers[i].setMap( null );
        }

        map.markers = [];
        v_elements = [];

        $( '.js-filters .badge' ).each( function() {
            $( this ).hide().addClass( 'is-active' );
        });

        $( '.js-filters small' ).hide();
    }

    function render_error( msg ) {
        var error = $( '.js-map-sale-error' );

        error.empty();
        error.append( '<br /><div class="alert alert-danger">' + msg + '</div>' );

        if ( typeof pageScroll !== 'undefined' ) {
            setTimeout( function() {
                pageScroll.setSize();
            }, 300);
        }
    }

    function clear_error() {
        var error = $( '.js-map-sale-error' );

        error.empty();
    }

    function add_loader() {
        loader.fadeIn( 300 );

        $( 'form.search-points :input' ).prop( 'disabled', true );
        $( 'form.search-points select' ).prop( 'disabled', true );
        $( 'form.search-points .select' ).addClass( 'is-disabled' );
    }

    function remove_loader() {
        setTimeout( function() {
            $( loader ).fadeOut( 300 );

            $( 'form.search-points :input' ).prop( 'disabled', false );
            $( 'form.search-points select' ).prop( 'disabled', false );
            $( 'form.search-points .select' ).removeClass( 'is-disabled' );
        }, 500 );
    }

    function filter_marker( cat, status ) {
        for ( var i = 0; i < map.markers.length; ++i ) {
            if ( v_elements[i] == cat ) {
                map.markers[i].setVisible( status );
            }
        }
    }

    $( '.js-map-sale-filter' ).on( 'click', function() {
        var me = $( this );

        if ( me.is( '.is-active' ) ) {
            me.removeClass( 'is-active' );

            filter_marker( me.attr( 'data-cat' ), false );

        } else {
            me.addClass( 'is-active' );

            filter_marker( me.attr( 'data-cat' ), true );
        }

        return false;
    });

    map = null;

    $( document ).ready( function() {
        add_loader();

        $( '.js-map-sale' ).each( function(){
            map = new_map( $( this ) );
        });
    });

})(jQuery);
