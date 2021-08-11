(function($) {

    if ( $( '.js-faq' ) ) {
        $( '.js-faq' ).on( 'click', function() {
            var me = $( this ).closest( '.faq-item' );

            if ( me.is( '.is-active' ) ) {
                me.removeClass( 'is-active' );
                me.find( '> .faq-answer' ).slideUp( 200 );

            } else {
                me.addClass( 'is-active' );
                me.find( '> .faq-answer' ).slideDown( 200 );
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
