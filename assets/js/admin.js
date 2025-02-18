(function($) {

    $( function() {
        // $.ajax({
        //     url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB40cZLKU3FPd4SMyqTHXp4O17HiKiUYOc',
        //     type: 'POST',
        //     cache: false,
        //     data: {
        //         selected: 
        //     },
        //     dataType: 'jsonp',
        //     success: function( data, textStatus, jqXHR ) {
        //         console.log()
        //         // var apiUrl = [];
        //         // apiUrl.push( 'https://fonts.googleapis.com/css2?family=' );
        //         // apiUrl.push( anonymousPro.family.replace(/ /g, '+'));

        //         // // url: 'https://fonts.googleapis.com/css?family=Anonymous+Pro:italic&subset=greek'
        //         // var url = apiUrl.join('');
        //     }
        // });
    });

}(jQuery));

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
            var me     = $( this ),
                name   = me.text(),
                colors;

            if ( bravad.lang_code == 'fr' ) {
                colors = {
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

            } else {
                colors = {
                    'White': 'white',
                    'Black': 'black',
                    'Primary': 'primary',
                    'Secondary': 'secondary',
                    'Lighter gray': 'lighter',
                    'Light gray': 'light',
                    'Gray': 'gray',
                    'Dark gray': 'dark',
                    'Darker gray': 'darker'
                };
            }

            me.prepend( '<span class="' + colors[ name ] + '"></span>' );
        });
    }); 

}(jQuery));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2ZvbnRzLmpzIiwiZWxlbWVudHMvc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xuXG4gICAgJCggZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICQuYWpheCh7XG4gICAgICAgIC8vICAgICB1cmw6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS93ZWJmb250cy92MS93ZWJmb250cz9rZXk9QUl6YVN5QjQwY1pMS1UzRlBkNFNNeXFUSFhwNE8xN0hpS2lVWU9jJyxcbiAgICAgICAgLy8gICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgLy8gICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgLy8gICAgICAgICBzZWxlY3RlZDogXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiggZGF0YSwgdGV4dFN0YXR1cywganFYSFIgKSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coKVxuICAgICAgICAvLyAgICAgICAgIC8vIHZhciBhcGlVcmwgPSBbXTtcbiAgICAgICAgLy8gICAgICAgICAvLyBhcGlVcmwucHVzaCggJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9JyApO1xuICAgICAgICAvLyAgICAgICAgIC8vIGFwaVVybC5wdXNoKCBhbm9ueW1vdXNQcm8uZmFtaWx5LnJlcGxhY2UoLyAvZywgJysnKSk7XG5cbiAgICAgICAgLy8gICAgICAgICAvLyAvLyB1cmw6ICdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9QW5vbnltb3VzK1BybzppdGFsaWMmc3Vic2V0PWdyZWVrJ1xuICAgICAgICAvLyAgICAgICAgIC8vIHZhciB1cmwgPSBhcGlVcmwuam9pbignJyk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICdbZGF0YS1uYW1lPVwiaWNvblwiXSAuc2VsZWN0MicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCAnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGljb24gPSBtZS50ZXh0KCk7XG5cbiAgICAgICAgICAgIG1lLnByZXBlbmQoICc8aW1nIHNyYz1cIicgKyBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9zcmMvc3ZnLycgKyBpY29uICsgJy5zdmdcIiAvPicgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7IFxuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgJ1tkYXRhLW5hbWU9XCJjb2xvclwiXSAuc2VsZWN0MicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCAnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lICAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBuYW1lICAgPSBtZS50ZXh0KCksXG4gICAgICAgICAgICAgICAgY29sb3JzO1xuXG4gICAgICAgICAgICBpZiAoIGJyYXZhZC5sYW5nX2NvZGUgPT0gJ2ZyJyApIHtcbiAgICAgICAgICAgICAgICBjb2xvcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICdCbGFuYyc6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgICdOb2lyJzogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgJ1ByaW1haXJlJzogJ3ByaW1hcnknLFxuICAgICAgICAgICAgICAgICAgICAnU2Vjb25kYWlyZSc6ICdzZWNvbmRhcnknLFxuICAgICAgICAgICAgICAgICAgICAnR3JpcyBwbHVzIHDDomxlJzogJ2xpZ2h0ZXInLFxuICAgICAgICAgICAgICAgICAgICAnR3JpcyBww6JsZSc6ICdsaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdHcmlzJzogJ2dyYXknLFxuICAgICAgICAgICAgICAgICAgICAnR3JpcyBmb25jw6knOiAnZGFyaycsXG4gICAgICAgICAgICAgICAgICAgICdHcmlzIHBsdXMgZm9uY8OpJzogJ2RhcmtlcidcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbG9ycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ1doaXRlJzogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ0JsYWNrJzogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgJ1ByaW1hcnknOiAncHJpbWFyeScsXG4gICAgICAgICAgICAgICAgICAgICdTZWNvbmRhcnknOiAnc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgJ0xpZ2h0ZXIgZ3JheSc6ICdsaWdodGVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ0xpZ2h0IGdyYXknOiAnbGlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAnR3JheSc6ICdncmF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ0RhcmsgZ3JheSc6ICdkYXJrJyxcbiAgICAgICAgICAgICAgICAgICAgJ0RhcmtlciBncmF5JzogJ2RhcmtlcidcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5wcmVwZW5kKCAnPHNwYW4gY2xhc3M9XCInICsgY29sb3JzWyBuYW1lIF0gKyAnXCI+PC9zcGFuPicgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7IFxuXG59KGpRdWVyeSkpO1xuIl19
