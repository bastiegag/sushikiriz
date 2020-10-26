(function($) {

    if ( $( '.js-tabs' ) ) {
        /*
         * Init
         */
        $( '.js-tabs' ).each( function() {
            var tabs = $( this );

            tabs.find( '.tabs-nav a' ).each( function() {
                var me = $( this );

                if ( me.is( '.is-active' ) ) {
                    var target = me.attr( 'href' );

                    tabs
                        .find( target )
                        .show()
                        .addClass( 'is-active' );
                }

            /*
             * Click event
             */
            }).on( 'click', function() {
                var me     = $( this ),
                    target = me.attr( 'href' ),
                    nav    = tabs.find( '.tabs-nav' ),
                    speed  = 300;

                if ( ! me.is( '.is-active' ) ) {
                    nav.find( 'a' ).removeClass( 'is-active' );
                    me.addClass( 'is-active' );

                    tabs
                        .find( '.tabs-item.is-active' )
                        .removeClass( 'is-active' )
                        .fadeOut( speed, function() {
                            tabs
                                .find( target )
                                .fadeIn( speed )
                                .addClass( 'is-active' );
                        });
                }

                return false;
            });
        });
    }

}(jQuery));
