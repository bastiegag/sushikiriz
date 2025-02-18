(function($) {

    $.fn.bravad_number = function( options ) {
        /*
         * Init
         */
        return this.each( function() {
            var input    = $( this ),
                curr_val = parseInt( input.val() ),
                disabled_minus,
                disabled_plus;

            input.wrap( '<div class="number js-number"></div>' );

            var number = input.closest( '.js-number' );

            if ( input.attr( 'data-position' ) == 'left' ) {
                number.addClass( 'number-left' );
            }

            if ( input.is( ':disabled' ) ) {
                number.addClass( 'is-disabled' );
                disabled_minus = 'disabled="disabled"';
                disabled_plus  = 'disabled="disabled"';
            }
                
            if ( curr_val <= parseInt( input.attr( 'min' ) ) ) {
                disabled_minus = 'disabled="disabled"';
            }

            if ( curr_val >= parseInt( input.attr( 'max' ) ) ) {
                disabled_plus = 'disabled="disabled"';
            }

            /*
             * Append buttons to the wrapper
             */
            number.prepend( '<button class="number-minus"' + disabled_minus + '>-</button>' );
            number.append( '<button class="number-plus"' + disabled_plus + '>+</button>' );

        /*
         * Minus button event
         */
        }).closest( '.js-number' ).find( '.number-minus' ).on( 'click', function() {
            var btn    = $( this ),
                number = btn.closest( '.number' ),
                input  = number.find( 'input' ),
                val    = parseInt( input.val() ),
                step   = parseInt( input.attr( 'step' ) ),
                min    = parseInt( input.attr( 'min' ) ),
                max    = parseInt( input.attr( 'max' ) ),
                new_val;

            new_val = val - step;
            
            input
                .val( new_val )
                .change();

            return false;

        /*
         * Plus button event
         */
        }).closest( '.js-number' ).find( '.number-plus' ).on( 'click', function() {
            var btn    = $( this ),
                number = btn.closest( '.number' ),
                input  = number.find( 'input' ),
                val    = parseInt( input.val() ),
                step   = parseInt( input.attr( 'step' ) ),
                min    = parseInt( input.attr( 'min' ) ),
                max    = parseInt( input.attr( 'max' ) ),
                new_val;

            new_val = val + step;

            input
                .val( new_val )
                .change();

            return false;

        /*
         * Change event
         */
        }).closest( '.js-number' ).find( 'input' ).on( 'change', function() {
            var input  = $( this ),
                number = input.closest( '.number' ),
                val    = parseInt( input.val() ),
                min    = parseInt( input.attr( 'min' ) ),
                max    = parseInt( input.attr( 'max' ) );

            if ( val >= max ) {
                number
                    .find( '.number-plus' )
                    .prop( 'disabled', true );

                input.val( max );

            } else {
                number
                    .find( '.number-plus' )
                    .prop( 'disabled', false );
            }

            if ( val <= min ) {
                number
                    .find( '.number-minus' )
                    .prop( 'disabled', true );
                    
                input.val( min );

            } else {
                number
                    .find( '.number-minus' )
                    .prop( 'disabled', false );
            }
        });
    };

}(jQuery));
