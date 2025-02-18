(function($) {

    if ( $( 'select' ) ) {
        /*
         * Init
         */
        $( 'select' ).each( function() {
            var select  = $( this ),
                currVal = select.find( 'option:selected' ).text(),
                classes;

            if ( select.is( '#rating' ) ) {
                return;
            }

            if ( typeof select.attr( 'class' ) !== 'undefined' ) {
                classes = ' ' + select.attr( 'class' );
                
            } else {
                classes = '';
            }

            select
                .wrap( '<div class="select' + classes + '"></div>' )
                .css( 'opacity', '0' );

            select.closest( '.select' ).append( '<span class="select-choice"></span>' );
            select.closest( '.select' ).find( '.select-choice' ).text( currVal );

            if ( select.is( '.is-danger' ) ) {
                select.closest( '.select' ).addClass( 'is-danger' );
            }

            if ( select.is( '.is-success' ) ) {
                select.closest( '.select' ).addClass( 'is-success' );
            }

            if ( select.is( ':disabled' ) ) {
                select.closest( '.select' ).addClass( 'is-disabled' );
            }

        /*
         * Change event
         */
        }).on( 'change', function() {
            var select  = $( this ),
                currVal = select.find( 'option:selected' ).text();

            select.closest( '.select' ).find( '.select-choice' ).text( currVal );
        });
    }

}(jQuery));
