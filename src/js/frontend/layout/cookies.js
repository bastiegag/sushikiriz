(function($) {
    
    $( window ).on( 'load', function() {
        if ( sessionStorage ) {
            var cookie = sessionStorage.getItem( 'cookies' );

            if ( cookie == null || cookie == 'true' ) {
                sessionStorage.setItem( 'cookies', 'true' );

                setTimeout( function() {
                    $( '.js-cookies' ).addClass( 'reveal' );
                }, 500 );

            } else if ( cookie == 'false' ) {
                $( '.js-cookies' ).remove();
            }
        }
    });

    $( '.js-cookies .btn' ).on( 'click', function() {
        sessionStorage.setItem( 'cookies', 'false' );

        $( '.js-cookies' ).removeClass( 'reveal' );

        setTimeout( function() {
            $( '.js-cookies' ).remove();
        }, 500 );

        return false;
    });

}(jQuery));
