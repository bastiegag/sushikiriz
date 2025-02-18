(function($) {

    var map,
    info_windows = [],
    elements     = [],
    icon         = bravad.template_url + '/assets/img/pin.svg';

    function new_map( $el ) {
        var $markers = $el.find( '.js-marker' );

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
    center : new google.maps.LatLng(0, 0),
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

map.markers = [];
elements = [];

$markers.each( function() {
    var me = $( this );

    var element = {
        '_id': parseInt( me.attr( 'data-id' ) ),
        '_title': me.attr( 'data-title' ),
        '_address': me.attr( 'data-address' ),
        '_email': me.attr( 'data-email' ),
        '_phone': me.attr( 'data-phone' ),
        '_lat': me.attr( 'data-lat' ),
        '_lng': me.attr( 'data-lng' )
    };

    elements.push( element );
});

$markers.each( function() {
    var me = $( this );

    add_marker( me, map );
});

center_map( map );

return map;
}

function add_marker( $marker, map ) {
    var latlng = new google.maps.LatLng( $marker.attr( 'data-lat' ), $marker.attr( 'data-lng' ) );

    var pin = {
        url: bravad.template_url + '/assets/img/pin.svg',
        size: new google.maps.Size( 45, 54 ),
        scaledSize: new google.maps.Size( 45, 54 ),
        anchor: new google.maps.Point( 22, 54 )
    };

    var marker = new google.maps.Marker({
        position : latlng,
        map : map,
        icon : pin
    });

    map.markers.push( marker );

    var infowindow = new google.maps.InfoWindow({
        content : $marker.html()
    });

    info_windows.push( infowindow );

    google.maps.event.addListener( marker, 'click', function() {
        close_infowindow();

        infowindow.open( map, marker );
    });
}

function close_infowindow() {
    for ( var i = 0; i < elements.length; i++ ) {
        info_windows[i].close();
    }
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

map = null;

$( document ).ready( function() {
    $( '.js-map' ).each( function(){
        map = new_map( $( this ) );
    });
});

})(jQuery);
