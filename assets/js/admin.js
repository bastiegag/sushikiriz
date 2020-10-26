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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL3NlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZG1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCAnW2RhdGEtbmFtZT1cImljb25cIl0gLnNlbGVjdDInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCggJy5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbicgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBpY29uID0gbWUudGV4dCgpO1xuXG4gICAgICAgICAgICBtZS5wcmVwZW5kKCAnPGltZyBzcmM9XCInICsgYnJhdmFkLnRlbXBsYXRlX3VybCArICcvc3JjL3N2Zy8nICsgaWNvbiArICcuc3ZnXCIgLz4nICk7XG4gICAgICAgIH0pO1xuICAgIH0pOyBcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICdbZGF0YS1uYW1lPVwiY29sb3JcIl0gLnNlbGVjdDInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCggJy5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbicgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIG5hbWUgPSBtZS50ZXh0KCk7XG5cbiAgICAgICAgICAgIHZhciBjb2xvcnMgPSB7XG5cdFx0XHRcdCdCbGFuYyc6ICd3aGl0ZScsXG5cdFx0XHRcdCdOb2lyJzogJ2JsYWNrJyxcblx0XHRcdFx0J1ByaW1haXJlJzogJ3ByaW1hcnknLFxuXHRcdFx0XHQnU2Vjb25kYWlyZSc6ICdzZWNvbmRhcnknLFxuXHRcdFx0XHQnR3JpcyBwbHVzIHDDomxlJzogJ2xpZ2h0ZXInLFxuXHRcdFx0XHQnR3JpcyBww6JsZSc6ICdsaWdodCcsXG5cdFx0XHRcdCdHcmlzJzogJ2dyYXknLFxuXHRcdFx0XHQnR3JpcyBmb25jw6knOiAnZGFyaycsXG5cdFx0XHRcdCdHcmlzIHBsdXMgZm9uY8OpJzogJ2RhcmtlcidcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1lLnByZXBlbmQoICc8c3BhbiBjbGFzcz1cIicgKyBjb2xvcnNbIG5hbWUgXSArICdcIj48L3NwYW4+JyApO1xuICAgICAgICB9KTtcbiAgICB9KTsgXG5cbn0oalF1ZXJ5KSk7XG4iXX0=
