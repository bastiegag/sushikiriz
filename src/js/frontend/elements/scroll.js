(function($) {

    $( window ).on( 'load', function() {
        var getUrlParameter = function getUrlParameter( sParam ) {
            var sPageURL = decodeURIComponent( window.location.search.substring(1) ),
                sURLVariables = sPageURL.split( '&' ),
                sParameterName,
                i;

            for ( i = 0; i < sURLVariables.length; i++ ) {
                sParameterName = sURLVariables[i].split( '=' );

                if ( sParameterName[0] === sParam ) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };

        var anchor = getUrlParameter( 'section' );

        if ( typeof anchor !== 'undefined' ) {
            setTimeout( function() {
                page_scroll( '#' + anchor );
            }, 500);
        }

        var added = getUrlParameter( 'add-to-cart' );

        if ( typeof added !== 'undefined' ) {
            var target = $( '.woocommerce-message' ).closest( '.block' );

            setTimeout( function() {
                page_scroll( target );
            }, 500);
        }
    });

    $( document ).on( 'click', 'a.js-scroll[href^="#"]', function( event ) {
        event.preventDefault();

        var anchor = $.attr( this, 'href' );

        page_scroll( anchor );
    });

    function page_scroll( anchor ) {
        var offset = $( '.js-header' ).outerHeight();
        
        if ( is_lg.matches ) {
            offset = $( '.js-holder' ).outerHeight();
        }

        $( 'html, body' ).animate({
            scrollTop: $( anchor ).offset().top - offset
        }, 800 );
    }

}(jQuery));
