(function($) {

    if ( $( '.js-toggle' ) ) {
        $( '.js-toggle' ).on( 'click', function() {
            var me     = $( this ), 
                target = me.next();

            if ( me.is( '.is-active' ) ) {
                me.removeClass( 'is-active' );
                target.slideUp( 200, function() {
                    target.removeClass( 'is-active' );
                });

            } else {
                me.addClass( 'is-active' );
                target.slideDown( 200, function() {
                    target.addClass( 'is-active' );
                });
            }

            if ( typeof pageScroll !== 'undefined' ) {
                setTimeout( function() {
                    pageScroll.setSize();
                }, 300);
            }

            return false;
        });
    }

}(jQuery));
