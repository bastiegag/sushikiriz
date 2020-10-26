(function($) {

    $( document ).on( 'click', '[data-name="icon"] .select2', function() {
        $( '.select2-results__option' ).each( function() {
            var me = $( this ),
                icon = me.text();

            me.prepend( '<img src="' + bravad.template_url + '/src/svg/' + icon + '.svg" />' );
        });
    }); 

    $( document ).on( 'click', '[data-name="color"] .select2', function() {
        $( '.select2-results__option' ).each( function() {
            var me   = $( this ),
                name = me.text();

            var colors = {
				'Blanc': 'white',
				'Noir': 'black',
				'Primaire': 'primary',
				'Secondaire': 'secondary',
				'Gris plus pâle': 'lighter',
				'Gris pâle': 'light',
				'Gris': 'gray',
				'Gris foncé': 'dark',
				'Gris plus foncé': 'darker'
            };

            me.prepend( '<span class="' + colors[ name ] + '"></span>' );
        });
    }); 

}(jQuery));
