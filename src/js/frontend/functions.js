(function($) {

	$( function() {
		if ( is_md.matches ) {
			$( 'input[type=number]' ).bravad_number();
        }
	});

	$( document.body ).on( 'added_to_cart updated_wc_div', function() {
		if ( is_md.matches ) {
			$( '.woocommerce-cart-form input[type=number]' ).bravad_number();
		}
		
		if ( typeof pageScroll !== 'undefined' ) {
		    setTimeout( function() {
		        pageScroll.setSize();
		    }, 300);
		}
	});

}(jQuery));
