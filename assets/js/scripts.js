var is_xs, is_sm, is_md, is_lg, is_xl, is_xxl;

if ( matchMedia ) {
    var is_xs  = window.matchMedia( '(min-width: 0px)' ),
        is_sm  = window.matchMedia( '(min-width: 576px)' ),
        is_md  = window.matchMedia( '(min-width: 768px)' ),
        is_lg  = window.matchMedia( '(min-width: 992px)' ),
        is_xl  = window.matchMedia( '(min-width: 1200px)' );
}

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

(function($) {

    var mobile  = true,
        timeout = false;

    $( window ).on( 'load', function() {
        switch_nav();
        scroll_classes();
    });

    $( window ).on( 'resize', function() {
        $( '.js-site' ).addClass( 'is-resize' );

        if ( timeout === false ) {
            timeout = true;

            setTimeout( function() {
                timeout = false;

                $( '.js-site' ).removeClass( 'is-resize' );
            }, 300 );
        }

        switch_nav();
    });

    $( window ).on( 'scroll', function() {
        scroll_classes();
    });

    function scroll_classes() {
        if ( window.scrollY >= 100 ) {
            $( '.js-site' ).addClass( 'nav-sticky' );

        } else {
            $( '.js-site' ).removeClass( 'nav-sticky' );
        }
    }

    function switch_nav() {
        if ( is_lg.matches == true && mobile == true ) {
            mobile = false;

            if ( $( '.js-site' ).is( '.nav-opened' ) ) {
                $( '.js-site' ).removeClass( 'nav-opened' );
                $( '.js-nav-opener' ).removeClass( 'is-active' );

                var scrollY = $( 'body' ).css( 'top' );

                $( 'body' ).removeAttr( 'style' );

                window.scrollTo( 0, parseInt( scrollY || '0' ) * -1 );
            }

            $( '.js-secondary-nav' )
                .detach()
                .prependTo( '.js-header > .container' );

            $( '.js-shop-nav' )
                .detach()
                .appendTo( '.js-primary-nav' );

        } else if ( is_lg.matches == false && mobile == false ) {
            mobile = true;

            $( '.js-secondary-nav' )
                .detach()
                .insertAfter( '.js-primary-nav' );

            $( '.js-shop-nav' )
                .detach()
                .appendTo( '.js-nav' );
        }

        $( '.site' ).addClass( 'is-shown' );
        if ( typeof pageScroll !== 'undefined' ) {
            setTimeout( function() {
                pageScroll.setSize();
            }, 300);
        }
    }

    $( '.js-nav-opener' ).on( 'click', function( event ) {
        event.preventDefault();

        var me = $( this );

        if ( me.is( '.is-active' ) ) {
            me.removeClass( 'is-active' );
            
            $( '.js-site' ).removeClass( 'nav-opened' );

            $( '.js-nav .menu-item-has-children' ).each( function() {
                var me = $( this );

                me
                    .removeClass( 'is-active' )
                    .find( '.sub-menu' )
                    .slideUp( 200 );
            });

            var scrollY = $( 'body' ).css( 'top' );

            console.log( scrollY );

            $( 'body' ).removeAttr( 'style' );
            $( '.js-site' ).removeAttr( 'style' );

            // window.scrollTo( 0, parseInt( scrollY || '0' ) * -1 );

        } else {
            me.addClass( 'is-active' );

            $( '.js-site' ).addClass( 'nav-opened' );

            // $( 'body' )
            //     .css({
            //         'position' : 'fixed',
            //         'top': '-' + window.scrollY + 'px'
            //     });
        }

        return false;
    });

    $( '.menu-item-has-children > a' ).on( 'click', function() {
        if ( Modernizr.touchevents ) {
            var link = $( this ).parent(),
                sub  = link.find( '> .sub-menu' );

            if ( link.is( '.is-active' ) ) {
                link.removeClass( 'is-active' );
                sub.slideUp( 200 );
                $( '.js-site' ).removeClass( 'sub-opened' );

            } else {
                link.addClass( 'is-active' );
                sub.slideDown( 200 );
                $( '.js-site' ).addClass( 'sub-opened' );

                return false;
            }
        }
    });

    $( document ).on( 'click', function() {
        if ( is_lg.matches == true ) {
            var link = $( '.menu .is-active' ),
                sub  = link.find( '.sub-menu' );

            link.removeClass( 'is-active' );
            sub.slideUp( 200 );
            $( '.js-site' ).removeClass( 'sub-opened' );
        }
    });

    $( document ).on( 'click', '.js-header', function( event ) {
        // event.stopPropagation();
    });

}(jQuery));

var pageScroll;

{
    const MathUtils = {
        map: ( x, a, b, c, d ) => ( x - a ) * ( d - c ) / ( b - a ) + c,
        lerp: ( a, b, n ) => ( 1 - n ) * a + n * b,
        getRandomFloat: ( min, max ) => ( Math.random() * ( max - min ) + min ).toFixed( 2 )
    };

    const body = document.body;
    
    
    // calculate the viewport size
    let winsize;
    const calcWinsize = () => winsize = {
        width: window.innerWidth, 
        height: window.innerHeight
    };
    calcWinsize();

    window.addEventListener( 'resize', calcWinsize );
    
    // scroll position
    let docScroll;
    let lastScroll;
    let scrollingSpeed = 0;

    // scroll position update function
    const getPageYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener( 'scroll', getPageYScroll );

    class Item {
        constructor( el ) {
            this.DOM              = { el: el };
            this.DOM.image        = this.DOM.el.querySelector( '.parallax-image' );
            this.DOM.imageWrapper = this.DOM.image.parentNode;
            this.DOM.title        = this.DOM.el.querySelector( '.parallax-title' );

            this.renderedStyles = {
                // here we define which property will change as we scroll the page and the item is inside the viewport
                // in this case we will be:
                // - scaling the inner image
                // - translating the item's title
                // we interpolate between the previous and current value to achieve a smooth effect
                imageTranslationY: {
                    previous: 0, 
                    current: 0, 
                    ease: 0.1,
                    fromValue: -100,
                    setValue: () => {
                        const fromValue = this.renderedStyles.imageTranslationY.fromValue;
                        const toValue   = -1 * fromValue;
                        const val       = MathUtils.map( this.props.top - docScroll, winsize.height, -1 * this.props.height, fromValue, toValue );
                        
                        return fromValue < 0 ? Math.min( Math.max( val, fromValue ), toValue ) : Math.max( Math.min( val, fromValue ), toValue );
                    }
                }
            };

            // gets the item's height and top (relative to the document)
            this.getSize();
            this.update();

            // use the IntersectionObserver API to check when the element is inside the viewport
            // only then the element styles will be updated
            this.observer = new IntersectionObserver( ( entries ) => {
                entries.forEach( entry => this.isVisible = entry.intersectionRatio > 0 );
            });
            this.observer.observe( this.DOM.el );
            this.initEvents();
        }
        update() {
            // sets the initial value (no interpolation)
            for ( const key in this.renderedStyles ) {
                this.renderedStyles[ key ].current = this.renderedStyles[ key ].previous = this.renderedStyles[ key ].setValue();
            }

            // apply changes/styles
            this.layout();
        }
        getSize() {
            const rect = this.DOM.el.getBoundingClientRect();
            this.props = {
                // item's height
                height: rect.height,
                // offset top relative to the document
                top: docScroll + rect.top
            };
        }
        initEvents() {
            window.addEventListener( 'resize', () => this.resize() );
        }
        resize() {
            // gets the item's height and top (relative to the document)
            this.getSize();
            // on resize reset sizes and update styles
            this.update();
        }
        // update the current and interpolated values
        render() {
            for ( const key in this.renderedStyles ) {
                this.renderedStyles[ key ].current = this.renderedStyles[ key ].setValue();
                this.renderedStyles[ key ].previous = MathUtils.lerp( this.renderedStyles[ key ].previous, this.renderedStyles[ key ].current, this.renderedStyles[ key ].ease );
            }
            
            // and apply changes
            this.layout();
        }
        layout() {
            // image
            this.DOM.image.style.transform = `translate3d( 0, ${ this.renderedStyles.imageTranslationY.previous }px, 0 )`;
        }
    }

    // Header parallax

    var header = document.getElementsByClassName('parallax-image')[0];

    (function(){

        var throttle = function(type, name, obj){
          var obj = obj || window;
          var running = false;
          var func = function(){
            if (running){ return; }
            running = true;
            requestAnimationFrame(function(){
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
            });
          };
          obj.addEventListener(type, func);
        };
        
        throttle("scroll", "optimizedScroll");
      })();

      window.addEventListener("optimizedScroll", function(){
  
        header.style.transform = "TranslateY(-" + (window.pageYOffset / 6) + "px)";
      })

    const preloadImages = () => {
        return new Promise( ( resolve, reject ) => {
            imagesLoaded( document.querySelectorAll( '.parallax-img' ), { background: true }, resolve );
        });
    };
    
    preloadImages().then( () => {
        document.body.classList.remove( 'is-loading' );
        getPageYScroll();
        lastScroll = docScroll;

        if ( is_lg.matches && jQuery( 'body' ).is( '.has-parallax' ) ) {
            pageScroll = new SmoothScroll();
        }
    });
}

(function($) {

    if ( $( '.js-reply' ) ) {
        $( '.js-reply' ).on( 'click', function() {
			var me 	    = $( this ),
				comment = me.closest( '.comment' ),
				name    = comment.attr( 'data-name' ),
				parent  = comment.attr( 'data-parent' ),
				reply   = $( '.js-comment-reply' );

            $( '#ft_5f8db5f326735' ).val( parent );

            page_scroll( reply );

           	$( '<div class="alert is-info">' + reply.attr( 'data-reply' ) + ' ' + name + ' <a href="#" class="close js-reset-reply">&times;</a></div>' ).insertAfter( reply.find( 'h3' ) );

            return false;
        });
    }

	$( document ).on( 'click', '.js-reset-reply', function() {
		var me 	  = $( this ),
			reply = me.closest( '.alert' );

		$( '#ft_5f8db5f326735' ).val( '0' );

		reply.fadeOut( 300, function() {
			$( this ).remove();
		});

		return false;
	});

    function page_scroll( anchor ) {
        var offset = $( '.js-header' ).outerHeight();
        
        if ( is_lg.matches ) {
            offset = $( '.js-holder' ).outerHeight();
        }

        $( 'html, body' ).animate({
            scrollTop: anchor.offset().top - offset
        }, 800 );
    }

}(jQuery));

(function($) {

    if ( $( '.js-faq' ) ) {
        $( '.js-faq' ).on( 'click', function() {
            var me = $( this ).closest( '.faq-item' );

            if ( me.is( '.is-active' ) ) {
                me.removeClass( 'is-active' );
                me.find( '.faq-answer' ).slideUp( 200 );

            } else {
                me.addClass( 'is-active' );
                me.find( '.faq-answer' ).slideDown( 200 );
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

(function($) {

    if ( $( 'input[type=file]' ) ) {
        /*
         * Init
         */
        $( 'input[type=file]' ).each( function() {
            var input = $( this );

            input.wrap( '<div class="file"></div>' );

            var file        = input.closest( '.file' ),
                label       = input.attr( 'data-label' ),
                placeholder = input.attr( 'data-placeholder' );

            if ( typeof label === 'undefined' || label == '' ) {
                label = 'Parcourir';
            }

            if ( typeof placeholder === 'undefined' || placeholder == '' ) {
                placeholder = '';
            }

            if ( input.is( ':disabled' ) ) {
                file.addClass( 'is-disabled' );
            }

            file.prepend( '<button class="btn btn-dark">' + label + '</button><div class="file-selected">' + placeholder + '</div>' );
            file.append( '<a class="file-remove js-file-remove">&times;</a>' );
        
        /*
         * Browse button event
         */
        }).closest( '.file' ).find( 'button' ).on( 'click', function() {
            var btn   = $( this ),
                file  = btn.closest( '.file' ),
                input = file.find( 'input' );

            input.click();

            return false;

        /*
         * Remove button event
         */
        }).closest( '.file' ).find( '.js-file-remove' ).on( 'click', function() {
            var btn      = $( this ),
                file     = btn.closest( '.file' ),
                input    = file.find( 'input' ),
                selected = file.find( '.file-selected' );

            input.val( '' ).change();

            selected.text( input.attr( 'data-placeholder' ) );

            return false;

        /*
         * Change event
         */
        }).closest( '.file' ).find( 'input' ).on( 'change', function() {
            var input    = $( this ),
                file     = input.closest( '.file' ),
                selected = file.find( '.file-selected' );

            if( input.val() !== '' ) {
                file.addClass( 'is-active' );

            } else {
                file.removeClass( 'is-active' );
            }

            var names = '';
            for ( var i = 0; i < input.get(0).files.length; ++i ) {
                if ( i > 0 ) {
                    names += ', ';
                }
                names += input.get(0).files[i].name;
            }

            selected.text( names );
        });
    }

}(jQuery));

(function($) {

    var map,
    info_windows = [],
    elements     = [],
    icon         = bravad.template_url + '/assets/img/pin.svg';

    function new_map( $el ) {
        var $markers = $el.find( '.js-marker' );

        var styledMapType = new google.maps.StyledMapType(
            [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#bdbdbd"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#ffffff"
                }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dadada"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#c9c9c9"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            }
            ],
            {name: 'Styled Map'});

var args = {
    zoom : 14,
    center : new google.maps.LatLng(0, 0),
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    scrollwheel : false,
    panControl : false,
    panControlOptions : {
        position : google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl : true,
    zoomControlOptions: {
        style : google.maps.ZoomControlStyle.LARGE,
        position : google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl : false,
    mapTypeControlOptions : {
        mapTypeIds : [google.maps.MapTypeId.ROADMAP, 'styled_map']
    },
    draggable : true,
    disableDefaultUI : true
};

map = new google.maps.Map( $el[0], args );

map.mapTypes.set( 'styled_map', styledMapType );
map.setMapTypeId( 'styled_map' );

map.markers = [];
elements = [];

$markers.each( function() {
    var me = $( this );

    var element = {
        '_id': parseInt( me.attr( 'data-id' ) ),
        '_title': me.attr( 'data-title' ),
        '_address': me.attr( 'data-address' ),
        '_email': me.attr( 'data-email' ),
        '_phone': me.attr( 'data-phone' ),
        '_lat': me.attr( 'data-lat' ),
        '_lng': me.attr( 'data-lng' )
    };

    elements.push( element );
});

$markers.each( function() {
    var me = $( this );

    add_marker( me, map );
});

center_map( map );

return map;
}

function add_marker( $marker, map ) {
    var latlng = new google.maps.LatLng( $marker.attr( 'data-lat' ), $marker.attr( 'data-lng' ) );

    var pin = {
        url: bravad.template_url + '/assets/img/pin.svg',
        size: new google.maps.Size( 45, 54 ),
        scaledSize: new google.maps.Size( 45, 54 ),
        anchor: new google.maps.Point( 22, 54 )
    };

    var marker = new google.maps.Marker({
        position : latlng,
        map : map,
        icon : pin
    });

    map.markers.push( marker );

    var infowindow = new google.maps.InfoWindow({
        content : $marker.html()
    });

    info_windows.push( infowindow );

    google.maps.event.addListener( marker, 'click', function() {
        close_infowindow();

        infowindow.open( map, marker );
    });
}

function close_infowindow() {
    for ( var i = 0; i < elements.length; i++ ) {
        info_windows[i].close();
    }
}

function center_map( map ) {
    var bounds = new google.maps.LatLngBounds();

    $.each( map.markers, function( i, marker ) {
        var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

        bounds.extend( latlng );
    });

    if ( map.markers.length == 1 ) {
        map.setCenter( bounds.getCenter() );
        map.setZoom( 15 );

    } else {
        map.fitBounds( bounds );
    }
}

map = null;

$( document ).ready( function() {
    $( '.js-map' ).each( function(){
        map = new_map( $( this ) );
    });
});

})(jQuery);

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

(function($) {

    var map,
        infowindow   = null,
        elements     = [],
        v_elements   = [],
        start_pos    = '',
        loader       = $( '.js-sale-loader' ),
        icon         = bravad.template_url + '/assets/img/pin.svg';

    function new_map( $el ) {
        var styledMapType = new google.maps.StyledMapType(
            [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#f5f5f5"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#bdbdbd"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#ffffff"
                }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dadada"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e5e5e5"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#eeeeee"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#c9c9c9"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            }
            ],
            {name: 'Styled Map'});

        var args = {
            zoom : 14,
            center : new google.maps.LatLng( 45.41168985086999, -71.89242742720153 ),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            scrollwheel : false,
            panControl : false,
            panControlOptions : {
                position : google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl : true,
            zoomControlOptions: {
                style : google.maps.ZoomControlStyle.LARGE,
                position : google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeControl : false,
            mapTypeControlOptions : {
                mapTypeIds : [google.maps.MapTypeId.ROADMAP, 'styled_map']
            },
            draggable : true,
            disableDefaultUI : true
        };
     
        map = new google.maps.Map( $el[0], args );

        map.mapTypes.set( 'styled_map', styledMapType );
        map.setMapTypeId( 'styled_map' );

        var pin = {
            url: bravad.template_url + '/assets/img/pin.svg',
            size: new google.maps.Size( 30, 36 ),
            scaledSize: new google.maps.Size( 30, 36 ),
            anchor: new google.maps.Point( 15, 36 )
        };

        var marker = new google.maps.Marker({
            position : new google.maps.LatLng( 45.41168985086999, -71.89242742720153 ),
            animation: google.maps.Animation.DROP,
            map : map,
            icon : pin,
            title : bravad.site_title
        });

        google.maps.event.addListener( marker, 'click', function() {
            if ( infowindow ) {
                infowindow.close();
            }

            var content_str = '<p><strong>' + bravad.site_title + '</strong></p>';

            infowindow = new google.maps.InfoWindow();
            infowindow.setContent( content_str );
            infowindow.open( map, marker );
        });

        map.markers = [];

        $.ajax({
            url: bravad.ajax_url,
            type: 'POST',
            data: {
                action: 'get_points'
            },
            cache: false,
            dataType: 'json',
            success: function( data, textStatus, jqXHR ) {
                elements = data.data.markers;

                console.log( elements );
                remove_loader();
            }
        });

        return map;
    }

    function add_marker( element, map ) {
        var latlng = new google.maps.LatLng( element.lat, element.lng ),
            icon;

        if ( element.cat !== '' ) {
            icon = bravad.template_url + '/assets/img/pin-' + element.cat + '.svg';

        } else {
            icon = bravad.template_url + '/assets/img/pin.svg';
        }

        var pin = {
            url: icon,
            size: new google.maps.Size( 30, 36 ),
            scaledSize: new google.maps.Size( 30, 36 ),
            anchor: new google.maps.Point( 15, 36 )
        };

        var marker = new google.maps.Marker({
            position : latlng,
            animation: google.maps.Animation.DROP,
            map : map,
            icon : pin,
            title : element.title
        });

        map.markers.push( marker );
        v_elements.push( element.cat );

        $( '.js-filters' ).find( '.badge[data-cat=' + element.cat + ']' ).show();
        $( '.js-filters small' ).show();

        google.maps.event.addListener( marker, 'click', function() {
            if ( infowindow ) {
                infowindow.close();
            }

            if ( bravad.lang_code == 'fr' ) {
                route_label = 'Itinéraire';

            } else {
                route_label = 'Route';
            }

            var route = '<a href="https://www.google.com/maps?f=d&saddr=' + start_pos + '&daddr=' + element.lat + ',' + element.lng + '&dirflg=d" target="_blank">' + route_label + '</a>';

            // var content_str = '<p><strong>' + element.title + '</strong></p><p>' + element.address + '</p><p>Distance: ' + element.distance + ' (' + element.duration + ')</p>' + route;
            var content_str = '<p><strong>' + element.title + '</strong></p><p>' + element.address + '</p><p>Distance: ' + element.distance.toFixed( 2 ) + ' km</p>' + route;

            infowindow = new google.maps.InfoWindow();
            infowindow.setContent( content_str );
            infowindow.open( map, marker );
        });
    }

    function center_map( map ) {
        var bounds = new google.maps.LatLngBounds();

        $.each( map.markers, function( i, marker ) {
            var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

            bounds.extend( latlng );
        });

        if ( map.markers.length == 1 ) {
            map.setCenter( bounds.getCenter() );
            map.setZoom( 15 );

        } else {
            map.fitBounds( bounds );
        }
    }

    function find_closest( position ) {
        get_distance( 0 );
                
        // distance = google.maps.geometry.spherical.computeDistanceBetween( position, latLng ) / 1000;

        function get_distance( i ) {
            if ( i < elements.length ) {
                var end_pos = new google.maps.LatLng( elements[i].lat, elements[i].lng );

                elements[i].distance = google.maps.geometry.spherical.computeDistanceBetween( position, end_pos ) / 1000;
                elements[i].calc = google.maps.geometry.spherical.computeDistanceBetween( position, end_pos ) / 1000;

                i++;

                get_distance( i );

                // var directions = new google.maps.DirectionsService();

                // var request = {
                //     origin: start_pos,
                //     destination: end_pos,
                //     travelMode: google.maps.TravelMode.DRIVING
                // };

                // directions.route( request, function( response, status ) {
                //     if ( status == google.maps.DirectionsStatus.OK ) {
                //         elements[i].distance = response.routes[0].legs[0].distance.text;
                //         elements[i].calc = response.routes[0].legs[0].distance.value / 1000;
                //         elements[i].duration = response.routes[0].legs[0].duration.text;

                //         i++;

                //         get_distance( i );

                //     } else if ( status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT ) {
                //         setTimeout( function () {
                //             get_distance( i );
                //         }, 1100 );
                //     }
                // });

            } else if ( i == elements.length ) {
                create_markers();
            }
        }

        function create_markers() {
            var max_distance = $( '.js-rayon' ).val();

            elements.sort( compare_distance );

            for ( var i = 0; i < elements.length; ++i ) {
                if ( elements[i].calc <= max_distance ) {
                    add_marker( elements[i], map );
                }
            }

            center_map( map );

            remove_loader();
        }

        function compare_distance( pointA, pointB ) {
            var iRes = 0;

            if ( pointA.calc < pointB.calc ) {
                iRes = -1;

            } else if ( pointA.calc > pointB.calc ) {
                iRes = 1;
            }

            return iRes;
        }
    }

    $( '.js-search-points' ).on( 'submit', function() {
        clear_error();

        var address = $( '.js-address' ).val();

        if ( address !== '' ) {
            add_loader();

            get_address( address );
        }

        return false;
    });

    $( '.js-geo' ).on( 'click', function() {
        clear_error();

        if ( navigator.geolocation ) {
            add_loader();

            navigator.geolocation.getCurrentPosition( function( position ) {
                var pos = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );

                start_pos = position.coords.latitude + ',' + position.coords.longitude;

                reset_position( pos );

                map.setCenter( pos );

                find_closest( pos );

            }, function() {} );

        } else {
            if ( bravad.lang_code == 'fr' ) {
                render_error( "Votre navigateur ne prend pas en charge la géolocalisation" );

            } else {
                render_error( "Browser doesn't support Geolocation" );
            }

            remove_loader();
        }
    });

    function reset_position( position ) {
        if ( position !== '' ) {
            clear_marker();

            var pin = {
                    url: bravad.template_url + '/assets/img/pin-you.svg',
                    size: new google.maps.Size( 30, 36 ),
                    scaledSize: new google.maps.Size( 30, 36 ),
                    anchor: new google.maps.Point( 15, 36 )
                },
                title = '';

            if ( bravad.lang_code == 'fr' ) {
                title = 'Vous êtes ici';

            } else {
                title = 'You are here';
            }

            var marker = new google.maps.Marker({
                position : position,
                map : map,
                icon : pin,
                title: title
            });

            map.markers.push( marker );
            v_elements.push( 'you' );

            $( '.js-filters .badge[data-cat=you]' ).show();
            $( '.js-filters small' ).show();

            if ( typeof pageScroll !== 'undefined' ) {
                setTimeout( function() {
                    pageScroll.setSize();
                }, 300);
            }

        } else {
            position = new google.maps.LatLng( 45.65773661212931, -72.14718808077868 );
        }
    }

    function get_address( address ) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': address }, function( results, status ) {
            if ( status == google.maps.GeocoderStatus.OK ) {
                var pos = results[0].geometry.location;

                start_pos = pos;

                reset_position( pos );

                map.setCenter( pos );

                find_closest( pos );

            } else if ( status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT ) {

            } else if ( status == google.maps.GeocoderStatus.ZERO_RESULTS ) {
                if ( bravad.lang_code == 'fr' ) {
                    render_error( "Nous n'avons pas trouvé l'adresse" );

                } else {
                    render_error( "We couldn't find the address" );
                }

                remove_loader();
            }
        });
    }

    function clear_marker() {
        for ( var i = 0; i < map.markers.length; ++i ) {
            map.markers[i].setMap( null );
        }

        map.markers = [];
        v_elements = [];

        $( '.js-filters .badge' ).each( function() {
            $( this ).hide().addClass( 'is-active' );
        });

        $( '.js-filters small' ).hide();
    }

    function render_error( msg ) {
        var error = $( '.js-map-sale-error' );

        error.empty();
        error.append( '<br /><div class="alert alert-danger">' + msg + '</div>' );

        if ( typeof pageScroll !== 'undefined' ) {
            setTimeout( function() {
                pageScroll.setSize();
            }, 300);
        }
    }

    function clear_error() {
        var error = $( '.js-map-sale-error' );

        error.empty();
    }

    function add_loader() {
        loader.fadeIn( 300 );

        $( 'form.search-points :input' ).prop( 'disabled', true );
        $( 'form.search-points select' ).prop( 'disabled', true );
        $( 'form.search-points .select' ).addClass( 'is-disabled' );
    }

    function remove_loader() {
        setTimeout( function() {
            $( loader ).fadeOut( 300 );

            $( 'form.search-points :input' ).prop( 'disabled', false );
            $( 'form.search-points select' ).prop( 'disabled', false );
            $( 'form.search-points .select' ).removeClass( 'is-disabled' );
        }, 500 );
    }

    function filter_marker( cat, status ) {
        for ( var i = 0; i < map.markers.length; ++i ) {
            if ( v_elements[i] == cat ) {
                map.markers[i].setVisible( status );
            }
        }
    }

    $( '.js-map-sale-filter' ).on( 'click', function() {
        var me = $( this );

        if ( me.is( '.is-active' ) ) {
            me.removeClass( 'is-active' );

            filter_marker( me.attr( 'data-cat' ), false );

        } else {
            me.addClass( 'is-active' );

            filter_marker( me.attr( 'data-cat' ), true );
        }

        return false;
    });

    map = null;

    $( document ).ready( function() {
        add_loader();

        $( '.js-map-sale' ).each( function(){
            map = new_map( $( this ) );
        });
    });

})(jQuery);

(function($) {

    $( window ).on( 'load', function() {
        var getUrlParameter = function getUrlParameter( sParam ) {
            var sPageURL = decodeURIComponent( window.location.search.substring(1) ),
                sURLVariables = sPageURL.split( '&' ),
                sParameterName,
                i;

            for ( i = 0; i < sURLVariables.length; i++ ) {
                sParameterName = sURLVariables[i].split( '=' );

                if ( sParameterName[0] === sParam ) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };

        var anchor = getUrlParameter( 'section' );

        if ( typeof anchor !== 'undefined' ) {
            setTimeout( function() {
                page_scroll( '#' + anchor );
            }, 500);
        }

        var added = getUrlParameter( 'add-to-cart' );

        if ( typeof added !== 'undefined' ) {
            var target = $( '.woocommerce-message' ).closest( '.block' );

            setTimeout( function() {
                page_scroll( target );
            }, 500);
        }
    });

    $( document ).on( 'click', 'a.js-scroll[href^="#"]', function( event ) {
        event.preventDefault();

        var anchor = $.attr( this, 'href' );

        page_scroll( anchor );
    });

    function page_scroll( anchor ) {
        var offset = $( '.js-header' ).outerHeight();
        
        if ( is_lg.matches ) {
            offset = $( '.js-holder' ).outerHeight();
        }

        $( 'html, body' ).animate({
            scrollTop: $( anchor ).offset().top - offset
        }, 800 );
    }

}(jQuery));

(function($) {

    $( '.js-header .js-search' ).on( 'click', function() {
        var me = $( this );

        if ( is_lg.matches == true ) {
            if ( ! me.is( '.is-active' ) ) {
                me.addClass( 'is-active' );
                $( '.js-site' ).addClass( 'search-opened' );

                $( '.js-nav .menu-item-has-children' ).each( function() {
                    var me = $( this );

                    me
                        .removeClass( 'is-active' )
                        .find( '.sub-menu' )
                        .slideUp( 200 );
                });

                return false;

            } else {
                if ( $( '.search-field' ).val() == '' ) {
                    return false;
                }
            }
        }

        if ( $( '.search-field' ).val() == '' ) {
            return false;
        }
    });

    $( '.js-search-form' ).on( 'submit', function() {
        var me = $( this );

        if ( me.find( '.search-field' ).val() == '' ) {
            return false;
        }
    });

    $( window ).on( 'resize', function() {
        close_search();
    });

    $( document ).on( 'click', function() {
        if ( is_lg.matches == true ) {
            close_search();
        }
    });

    $( document ).on( 'click', '.js-search-form', function( event ) {
        event.stopPropagation();
    });

    function close_search() {
        $( '.js-search' ).removeClass( 'is-active' );
        $( '.js-site' ).removeClass( 'search-opened' );
    }

}(jQuery));

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

(function($) {

    var slideshow = [],
        main_slideshow = '',
        content_slideshow = '';

    $( window ).on( 'load', function() {
        if ( $( '.js-background-swiper' ).length ) {
            $( '.js-background-swiper' ).each( function( i, obj ) {
                var me = $( this );

                slideshow[i] = new Swiper( obj, {
                    loop: true,
                    spaceBetween: 0,
                    slidesPerView: 1,
                    speed: 800,
                    autoplay: {
                        delay: 5000,
                    }
                });

                me.closest( '.js-background' ).find( '.js-next' ).on( 'click', function() {
                    slideshow[i].slideNext();

                    return false;
                });

                me.closest( '.js-background' ).find( '.js-prev' ).on( 'click', function() {
                    slideshow[i].slidePrev();

                    return false;
                });
            });
        }

        if ( $( '.js-main-swiper' ).length ) {
            main_slideshow = new Swiper( '.js-main-swiper', {
                loop: true,
                spaceBetween: 0,
                slidesPerView: 1,
                speed: 800,
                autoplay: {
                    delay: 5000,
                }
            });

            $( '.js-main-swiper' ).closest( '.js-background' ).find( '.js-next' ).on( 'click', function() {
                main_slideshow.slideNext();

                return false;
            });

            $( '.js-main-swiper' ).closest( '.js-background' ).find( '.js-prev' ).on( 'click', function() {
                main_slideshow.slidePrev();

                return false;
            });
        }

        if ( $( '.js-content-swiper' ).length ) {
            content_slideshow = new Swiper( '.js-content-swiper', {
                loop: true,
                spaceBetween: 0,
                slidesPerView: 1,
                speed: 800,
                parallax: true
            });
        }

        if ( main_slideshow !== '' && content_slideshow !== '' ) {
            main_slideshow.controller.control = content_slideshow;
            content_slideshow.controller.control = main_slideshow;
        }

        if ( $( '.js-slideshow-swiper' ).length ) {
            $( '.js-slideshow-swiper' ).each( function( i, obj ) {
                var me   = $( this ),
                    view = me.closest( '.js-slideshow' ).attr( 'data-view' );

                slideshow[i] = new Swiper( obj, {
                    loop: true,
                    spaceBetween: 0,
                    slidesPerView: view,
                    autoHeight: true,
                    speed: 800,
                    autoplay: {
                        delay: 5000,
                    }
                });

                me.closest( '.js-slideshow' ).find( '.js-next' ).on( 'click', function() {
                    slideshow[i].slideNext();

                    return false;
                });

                me.closest( '.js-slideshow' ).find( '.js-prev' ).on( 'click', function() {
                    slideshow[i].slidePrev();

                    return false;
                });
            });
        }

        if ( $( '.js-posts-swiper' ).length ) {
            $( '.js-posts-swiper' ).each( function( i, obj ) {
                var me = $( this );

                slideshow[i] = new Swiper( obj, {
                    loop: false,
                    spaceBetween: 20,
                    slidesPerView: 'auto',
                    autoHeight: true,
                    speed: 800,
                    navigation: {
                        nextEl: '.js-next',
                        prevEl: '.js-prev',
                    },
                    breakpoints: {
                        768: {
                            spaceBetween: 30,
                        },
                        992: {
                            spaceBetween: 0,
                            slidesPerView: 3
                        }
                    }
                });

                me.closest( '.js-posts' ).find( '.js-next' ).on( 'click', function() {
                    slideshow[i].slideNext();

                    return false;
                });

                me.closest( '.js-posts' ).find( '.js-prev' ).on( 'click', function() {
                    slideshow[i].slidePrev();

                    return false;
                });
            });
        }

        var gallery_thumbnail,
            gallery_swiper;

        if ( $( '.js-thumbnail-swiper' ).length ) {
            gallery_thumbnail = new Swiper( '.js-thumbnail-swiper', {
                loop: false,
                spaceBetween: 0,
                slidesPerView: 4,
                speed: 800
            });
        }

        if ( $( '.js-gallery-swiper' ).length ) {
            gallery_swiper = new Swiper( '.js-gallery-swiper', {
                loop: false,
                spaceBetween: 0,
                slidesPerView: 1,
                speed: 800,
                thumbs: {
                    swiper: gallery_thumbnail
                }
            });
        }
        
    });

})(jQuery);

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

                if ( typeof pageScroll !== 'undefined' ) {
                    setTimeout( function() {
                        pageScroll.setSize();
                    }, 300);
                }

                return false;
            });
        });
    }

}(jQuery));

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLmpzIiwiY29va2llcy5qcyIsIm5hdmlnYXRpb24uanMiLCJzY3JvbGxpbmcuanMiLCJjb21tZW50LmpzIiwiZmFxLmpzIiwiZmlsZS5qcyIsImdvb2dsZS1tYXAuanMiLCJudW1iZXIuanMiLCJzYWxlLXBvaW50cy5qcyIsInNjcm9sbC5qcyIsInNlYXJjaC5qcyIsInNlbGVjdC5qcyIsInNsaWRlc2hvdy5qcyIsInRhYnMuanMiLCJ0b2dnbGUuanMiLCJmdW5jdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpc194cywgaXNfc20sIGlzX21kLCBpc19sZywgaXNfeGwsIGlzX3h4bDtcblxuaWYgKCBtYXRjaE1lZGlhICkge1xuICAgIHZhciBpc194cyAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDBweCknICksXG4gICAgICAgIGlzX3NtICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogNTc2cHgpJyApLFxuICAgICAgICBpc19tZCAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDc2OHB4KScgKSxcbiAgICAgICAgaXNfbGcgID0gd2luZG93Lm1hdGNoTWVkaWEoICcobWluLXdpZHRoOiA5OTJweCknICksXG4gICAgICAgIGlzX3hsICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogMTIwMHB4KScgKTtcbn1cbiIsIihmdW5jdGlvbigkKSB7XG4gICAgXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggc2Vzc2lvblN0b3JhZ2UgKSB7XG4gICAgICAgICAgICB2YXIgY29va2llID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSggJ2Nvb2tpZXMnICk7XG5cbiAgICAgICAgICAgIGlmICggY29va2llID09IG51bGwgfHwgY29va2llID09ICd0cnVlJyApIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCAnY29va2llcycsICd0cnVlJyApO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQoICcuanMtY29va2llcycgKS5hZGRDbGFzcyggJ3JldmVhbCcgKTtcbiAgICAgICAgICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggY29va2llID09ICdmYWxzZScgKSB7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1jb29raWVzJyApLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCAnLmpzLWNvb2tpZXMgLmJ0bicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oICdjb29raWVzJywgJ2ZhbHNlJyApO1xuXG4gICAgICAgICQoICcuanMtY29va2llcycgKS5yZW1vdmVDbGFzcyggJ3JldmVhbCcgKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoICcuanMtY29va2llcycgKS5yZW1vdmUoKTtcbiAgICAgICAgfSwgNTAwICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIHZhciBtb2JpbGUgID0gdHJ1ZSxcbiAgICAgICAgdGltZW91dCA9IGZhbHNlO1xuXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHN3aXRjaF9uYXYoKTtcbiAgICAgICAgc2Nyb2xsX2NsYXNzZXMoKTtcbiAgICB9KTtcblxuICAgICQoIHdpbmRvdyApLm9uKCAncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ2lzLXJlc2l6ZScgKTtcblxuICAgICAgICBpZiAoIHRpbWVvdXQgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgdGltZW91dCA9IHRydWU7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ2lzLXJlc2l6ZScgKTtcbiAgICAgICAgICAgIH0sIDMwMCApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoX25hdigpO1xuICAgIH0pO1xuXG4gICAgJCggd2luZG93ICkub24oICdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2Nyb2xsX2NsYXNzZXMoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbF9jbGFzc2VzKCkge1xuICAgICAgICBpZiAoIHdpbmRvdy5zY3JvbGxZID49IDEwMCApIHtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ25hdi1zdGlja3knICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ25hdi1zdGlja3knICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hfbmF2KCkge1xuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gdHJ1ZSAmJiBtb2JpbGUgPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIG1vYmlsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoICQoICcuanMtc2l0ZScgKS5pcyggJy5uYXYtb3BlbmVkJyApICkge1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ25hdi1vcGVuZWQnICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1uYXYtb3BlbmVyJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFkgPSAkKCAnYm9keScgKS5jc3MoICd0b3AnICk7XG5cbiAgICAgICAgICAgICAgICAkKCAnYm9keScgKS5yZW1vdmVBdHRyKCAnc3R5bGUnICk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oIDAsIHBhcnNlSW50KCBzY3JvbGxZIHx8ICcwJyApICogLTEgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCggJy5qcy1zZWNvbmRhcnktbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLnByZXBlbmRUbyggJy5qcy1oZWFkZXIgPiAuY29udGFpbmVyJyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLXNob3AtbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKCAnLmpzLXByaW1hcnktbmF2JyApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gZmFsc2UgJiYgbW9iaWxlID09IGZhbHNlICkge1xuICAgICAgICAgICAgbW9iaWxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgJCggJy5qcy1zZWNvbmRhcnktbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKCAnLmpzLXByaW1hcnktbmF2JyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLXNob3AtbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKCAnLmpzLW5hdicgKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoICcuc2l0ZScgKS5hZGRDbGFzcyggJ2lzLXNob3duJyApO1xuICAgICAgICBpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoICcuanMtbmF2LW9wZW5lcicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICBpZiAoIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgIG1lLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICduYXYtb3BlbmVkJyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLW5hdiAubWVudS1pdGVtLWhhcy1jaGlsZHJlbicgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBtZVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcuc3ViLW1lbnUnIClcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoIDIwMCApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzY3JvbGxZID0gJCggJ2JvZHknICkuY3NzKCAndG9wJyApO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggc2Nyb2xsWSApO1xuXG4gICAgICAgICAgICAkKCAnYm9keScgKS5yZW1vdmVBdHRyKCAnc3R5bGUnICk7XG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQXR0ciggJ3N0eWxlJyApO1xuXG4gICAgICAgICAgICAvLyB3aW5kb3cuc2Nyb2xsVG8oIDAsIHBhcnNlSW50KCBzY3JvbGxZIHx8ICcwJyApICogLTEgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ25hdi1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgIC8vICQoICdib2R5JyApXG4gICAgICAgICAgICAvLyAgICAgLmNzcyh7XG4gICAgICAgICAgICAvLyAgICAgICAgICdwb3NpdGlvbicgOiAnZml4ZWQnLFxuICAgICAgICAgICAgLy8gICAgICAgICAndG9wJzogJy0nICsgd2luZG93LnNjcm9sbFkgKyAncHgnXG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkKCAnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBNb2Rlcm5penIudG91Y2hldmVudHMgKSB7XG4gICAgICAgICAgICB2YXIgbGluayA9ICQoIHRoaXMgKS5wYXJlbnQoKSxcbiAgICAgICAgICAgICAgICBzdWIgID0gbGluay5maW5kKCAnPiAuc3ViLW1lbnUnICk7XG5cbiAgICAgICAgICAgIGlmICggbGluay5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbGluay5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICBzdWIuc2xpZGVVcCggMjAwICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnc3ViLW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaW5rLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIHN1Yi5zbGlkZURvd24oIDIwMCApO1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ3N1Yi1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIHZhciBsaW5rID0gJCggJy5tZW51IC5pcy1hY3RpdmUnICksXG4gICAgICAgICAgICAgICAgc3ViICA9IGxpbmsuZmluZCggJy5zdWItbWVudScgKTtcblxuICAgICAgICAgICAgbGluay5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgIHN1Yi5zbGlkZVVwKCAyMDAgKTtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ3N1Yi1vcGVuZWQnICk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICcuanMtaGVhZGVyJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTtcbiIsInZhciBwYWdlU2Nyb2xsO1xuXG57XG4gICAgY29uc3QgTWF0aFV0aWxzID0ge1xuICAgICAgICBtYXA6ICggeCwgYSwgYiwgYywgZCApID0+ICggeCAtIGEgKSAqICggZCAtIGMgKSAvICggYiAtIGEgKSArIGMsXG4gICAgICAgIGxlcnA6ICggYSwgYiwgbiApID0+ICggMSAtIG4gKSAqIGEgKyBuICogYixcbiAgICAgICAgZ2V0UmFuZG9tRmxvYXQ6ICggbWluLCBtYXggKSA9PiAoIE1hdGgucmFuZG9tKCkgKiAoIG1heCAtIG1pbiApICsgbWluICkudG9GaXhlZCggMiApXG4gICAgfTtcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIFxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgdmlld3BvcnQgc2l6ZVxuICAgIGxldCB3aW5zaXplO1xuICAgIGNvbnN0IGNhbGNXaW5zaXplID0gKCkgPT4gd2luc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9O1xuICAgIGNhbGNXaW5zaXplKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIGNhbGNXaW5zaXplICk7XG4gICAgXG4gICAgLy8gc2Nyb2xsIHBvc2l0aW9uXG4gICAgbGV0IGRvY1Njcm9sbDtcbiAgICBsZXQgbGFzdFNjcm9sbDtcbiAgICBsZXQgc2Nyb2xsaW5nU3BlZWQgPSAwO1xuXG4gICAgLy8gc2Nyb2xsIHBvc2l0aW9uIHVwZGF0ZSBmdW5jdGlvblxuICAgIGNvbnN0IGdldFBhZ2VZU2Nyb2xsID0gKCkgPT4gZG9jU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCBnZXRQYWdlWVNjcm9sbCApO1xuXG4gICAgY2xhc3MgSXRlbSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICAgICAgICAgIHRoaXMuRE9NICAgICAgICAgICAgICA9IHsgZWw6IGVsIH07XG4gICAgICAgICAgICB0aGlzLkRPTS5pbWFnZSAgICAgICAgPSB0aGlzLkRPTS5lbC5xdWVyeVNlbGVjdG9yKCAnLnBhcmFsbGF4LWltYWdlJyApO1xuICAgICAgICAgICAgdGhpcy5ET00uaW1hZ2VXcmFwcGVyID0gdGhpcy5ET00uaW1hZ2UucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuRE9NLnRpdGxlICAgICAgICA9IHRoaXMuRE9NLmVsLnF1ZXJ5U2VsZWN0b3IoICcucGFyYWxsYXgtdGl0bGUnICk7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgLy8gaGVyZSB3ZSBkZWZpbmUgd2hpY2ggcHJvcGVydHkgd2lsbCBjaGFuZ2UgYXMgd2Ugc2Nyb2xsIHRoZSBwYWdlIGFuZCB0aGUgaXRlbSBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHdlIHdpbGwgYmU6XG4gICAgICAgICAgICAgICAgLy8gLSBzY2FsaW5nIHRoZSBpbm5lciBpbWFnZVxuICAgICAgICAgICAgICAgIC8vIC0gdHJhbnNsYXRpbmcgdGhlIGl0ZW0ncyB0aXRsZVxuICAgICAgICAgICAgICAgIC8vIHdlIGludGVycG9sYXRlIGJldHdlZW4gdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50IHZhbHVlIHRvIGFjaGlldmUgYSBzbW9vdGggZWZmZWN0XG4gICAgICAgICAgICAgICAgaW1hZ2VUcmFuc2xhdGlvblk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IDAsIFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAwLCBcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogMC4xLFxuICAgICAgICAgICAgICAgICAgICBmcm9tVmFsdWU6IC0xMDAsXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnJlbmRlcmVkU3R5bGVzLmltYWdlVHJhbnNsYXRpb25ZLmZyb21WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgICA9IC0xICogZnJvbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsICAgICAgID0gTWF0aFV0aWxzLm1hcCggdGhpcy5wcm9wcy50b3AgLSBkb2NTY3JvbGwsIHdpbnNpemUuaGVpZ2h0LCAtMSAqIHRoaXMucHJvcHMuaGVpZ2h0LCBmcm9tVmFsdWUsIHRvVmFsdWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb21WYWx1ZSA8IDAgPyBNYXRoLm1pbiggTWF0aC5tYXgoIHZhbCwgZnJvbVZhbHVlICksIHRvVmFsdWUgKSA6IE1hdGgubWF4KCBNYXRoLm1pbiggdmFsLCBmcm9tVmFsdWUgKSwgdG9WYWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0cyB0aGUgaXRlbSdzIGhlaWdodCBhbmQgdG9wIChyZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnQpXG4gICAgICAgICAgICB0aGlzLmdldFNpemUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIC8vIHVzZSB0aGUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgQVBJIHRvIGNoZWNrIHdoZW4gdGhlIGVsZW1lbnQgaXMgaW5zaWRlIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gb25seSB0aGVuIHRoZSBlbGVtZW50IHN0eWxlcyB3aWxsIGJlIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoICggZW50cmllcyApID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHRoaXMuaXNWaXNpYmxlID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSggdGhpcy5ET00uZWwgKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIC8vIHNldHMgdGhlIGluaXRpYWwgdmFsdWUgKG5vIGludGVycG9sYXRpb24pXG4gICAgICAgICAgICBmb3IgKCBjb25zdCBrZXkgaW4gdGhpcy5yZW5kZXJlZFN0eWxlcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50ID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5zZXRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhcHBseSBjaGFuZ2VzL3N0eWxlc1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRTaXplKCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuRE9NLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAvLyBpdGVtJ3MgaGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAvLyBvZmZzZXQgdG9wIHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgIHRvcDogZG9jU2Nyb2xsICsgcmVjdC50b3BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaW5pdEV2ZW50cygpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgKCkgPT4gdGhpcy5yZXNpemUoKSApO1xuICAgICAgICB9XG4gICAgICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgICAgIC8vIGdldHMgdGhlIGl0ZW0ncyBoZWlnaHQgYW5kIHRvcCAocmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50KVxuICAgICAgICAgICAgdGhpcy5nZXRTaXplKCk7XG4gICAgICAgICAgICAvLyBvbiByZXNpemUgcmVzZXQgc2l6ZXMgYW5kIHVwZGF0ZSBzdHlsZXNcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IGFuZCBpbnRlcnBvbGF0ZWQgdmFsdWVzXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIGZvciAoIGNvbnN0IGtleSBpbiB0aGlzLnJlbmRlcmVkU3R5bGVzICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5zZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzID0gTWF0aFV0aWxzLmxlcnAoIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzLCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50LCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5lYXNlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFuZCBhcHBseSBjaGFuZ2VzXG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxheW91dCgpIHtcbiAgICAgICAgICAgIC8vIGltYWdlXG4gICAgICAgICAgICB0aGlzLkRPTS5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoIDAsICR7IHRoaXMucmVuZGVyZWRTdHlsZXMuaW1hZ2VUcmFuc2xhdGlvblkucHJldmlvdXMgfXB4LCAwIClgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgU21vb3RoU2Nyb2xsIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLkRPTSAgICAgICAgICAgID0geyBtYWluOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLnNpdGUnICkgfTtcbiAgICAgICAgICAgIC8vIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIC8vIHdlIHRyYW5zbGF0ZSB0aGlzIGVsZW1lbnQgd2hlbiBzY3JvbGxpbmcgKHktYXhpcylcbiAgICAgICAgICAgIHRoaXMuRE9NLnNjcm9sbGFibGUgPSB0aGlzLkRPTS5tYWluLnF1ZXJ5U2VsZWN0b3IoICcuc2l0ZS1zY3JvbGwnICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHRoZSBpdGVtcyBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgdGhpcy5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ET00uY29udGVudCAgICA9IHRoaXMuRE9NLm1haW4ucXVlcnlTZWxlY3RvciggJ21haW4nICk7XG4gICAgICAgICAgICBbIC4uLnRoaXMuRE9NLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCggJy5wYXJhbGxheCcgKSBdLmZvckVhY2goIGl0ZW0gPT4gdGhpcy5pdGVtcy5wdXNoKCBuZXcgSXRlbSggaXRlbSApICkgKTtcblxuICAgICAgICAgICAgLy8gaGVyZSB3ZSBkZWZpbmUgd2hpY2ggcHJvcGVydHkgd2lsbCBjaGFuZ2UgYXMgd2Ugc2Nyb2xsIHRoZSBwYWdlXG4gICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2Ugd2Ugd2lsbCBiZSB0cmFuc2xhdGluZyBvbiB0aGUgeS1heGlzXG4gICAgICAgICAgICAvLyB3ZSBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZSB0byBhY2hpZXZlIHRoZSBzbW9vdGggc2Nyb2xsaW5nIGVmZmVjdFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlcyA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvblk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IDAsIFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAwLCBcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogMC4xLFxuICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZTogKCkgPT4gZG9jU2Nyb2xsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgYm9keSdzIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSByZW5kZXIgbG9vcFxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB0aGlzLnJlbmRlcigpICk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgLy8gc2V0cyB0aGUgaW5pdGlhbCB2YWx1ZSAobm8gaW50ZXJwb2xhdGlvbikgLSB0cmFuc2xhdGUgdGhlIHNjcm9sbCB2YWx1ZVxuICAgICAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHRoaXMucmVuZGVyZWRTdHlsZXMgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uc2V0VmFsdWUoKTsgICBcbiAgICAgICAgICAgIH0gICBcblxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5b3V0KCkge1xuICAgICAgICAgICAgdGhpcy5ET00uc2Nyb2xsYWJsZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoIDAsICR7IC0xICogdGhpcy5yZW5kZXJlZFN0eWxlcy50cmFuc2xhdGlvblkucHJldmlvdXMgfXB4LCAwIClgO1xuICAgICAgICB9XG4gICAgICAgIHNldFNpemUoKSB7XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGhlaWdoIG9mIHRoZSBib2R5IGluIG9yZGVyIHRvIGtlZXAgdGhlIHNjcm9sbGJhciBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgYm9keS5zdHlsZS5oZWlnaHQgPSBgJHsgdGhpcy5ET00uc2Nyb2xsYWJsZS5zY3JvbGxIZWlnaHQgfXB4YDtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZSgpIHtcbiAgICAgICAgICAgIC8vIHRoZSA8bWFpbj4gbmVlZHMgdG8gXCJzdGlja1wiIHRvIHRoZSBzY3JlZW4gYW5kIG5vdCBzY3JvbGxcbiAgICAgICAgICAgIC8vIGZvciB0aGF0IHdlIHNldCBpdCB0byBwb3NpdGlvbiBmaXhlZCBhbmQgb3ZlcmZsb3cgaGlkZGVuIFxuICAgICAgICAgICAgdGhpcy5ET00ubWFpbi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgICAgICB0aGlzLkRPTS5tYWluLnN0eWxlLndpZHRoICAgID0gdGhpcy5ET00ubWFpbi5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgICAgICB0aGlzLkRPTS5tYWluLnN0eWxlLnRvcCAgICAgID0gdGhpcy5ET00ubWFpbi5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuRE9NLm1haW4uc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuICAgICAgICBpbml0RXZlbnRzKCkge1xuICAgICAgICAgICAgLy8gb24gcmVzaXplIHJlc2V0IHRoZSBib2R5J3MgaGVpZ2h0XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5zZXRTaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIC8vIEdldCBzY3JvbGxpbmcgc3BlZWRcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBsYXN0U2Nyb2xsXG4gICAgICAgICAgICBzY3JvbGxpbmdTcGVlZCA9IE1hdGguYWJzKCBkb2NTY3JvbGwgLSBsYXN0U2Nyb2xsICk7XG4gICAgICAgICAgICBsYXN0U2Nyb2xsICAgICA9IGRvY1Njcm9sbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IGFuZCBpbnRlcnBvbGF0ZWQgdmFsdWVzXG4gICAgICAgICAgICBmb3IgKCBjb25zdCBrZXkgaW4gdGhpcy5yZW5kZXJlZFN0eWxlcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50ICA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnNldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMgPSBNYXRoVXRpbHMubGVycCggdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMsIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQsIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmVhc2UgKTsgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFuZCB0cmFuc2xhdGUgdGhlIHNjcm9sbGFibGUgZWxlbWVudFxuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICggY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zICkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBpdGVtIGlzIGluc2lkZSB0aGUgdmlld3BvcnQgY2FsbCBpdCdzIHJlbmRlciBmdW5jdGlvblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCB1cGRhdGUgaXRlbSdzIHN0eWxlcywgYmFzZWQgb24gdGhlIGRvY3VtZW50IHNjcm9sbCB2YWx1ZSBhbmQgdGhlIGl0ZW0ncyBwb3NpdGlvbiBvbiB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0uaXNWaXNpYmxlICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGl0ZW0uaW5zaWRlVmlld3BvcnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmluc2lkZVZpZXdwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5zaWRlVmlld3BvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxvb3BcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4gdGhpcy5yZW5kZXIoKSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJlbG9hZEltYWdlcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcbiAgICAgICAgICAgIGltYWdlc0xvYWRlZCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5wYXJhbGxheC1pbWcnICksIHsgYmFja2dyb3VuZDogdHJ1ZSB9LCByZXNvbHZlICk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgXG4gICAgcHJlbG9hZEltYWdlcygpLnRoZW4oICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCAnaXMtbG9hZGluZycgKTtcbiAgICAgICAgZ2V0UGFnZVlTY3JvbGwoKTtcbiAgICAgICAgbGFzdFNjcm9sbCA9IGRvY1Njcm9sbDtcblxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgJiYgalF1ZXJ5KCAnYm9keScgKS5pcyggJy5oYXMtcGFyYWxsYXgnICkgKSB7XG4gICAgICAgICAgICBwYWdlU2Nyb2xsID0gbmV3IFNtb290aFNjcm9sbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnLmpzLXJlcGx5JyApICkge1xuICAgICAgICAkKCAnLmpzLXJlcGx5JyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBtZSBcdCAgICA9ICQoIHRoaXMgKSxcblx0XHRcdFx0Y29tbWVudCA9IG1lLmNsb3Nlc3QoICcuY29tbWVudCcgKSxcblx0XHRcdFx0bmFtZSAgICA9IGNvbW1lbnQuYXR0ciggJ2RhdGEtbmFtZScgKSxcblx0XHRcdFx0cGFyZW50ICA9IGNvbW1lbnQuYXR0ciggJ2RhdGEtcGFyZW50JyApLFxuXHRcdFx0XHRyZXBseSAgID0gJCggJy5qcy1jb21tZW50LXJlcGx5JyApO1xuXG4gICAgICAgICAgICAkKCAnI2Z0XzVmOGRiNWYzMjY3MzUnICkudmFsKCBwYXJlbnQgKTtcblxuICAgICAgICAgICAgcGFnZV9zY3JvbGwoIHJlcGx5ICk7XG5cbiAgICAgICAgICAgXHQkKCAnPGRpdiBjbGFzcz1cImFsZXJ0IGlzLWluZm9cIj4nICsgcmVwbHkuYXR0ciggJ2RhdGEtcmVwbHknICkgKyAnICcgKyBuYW1lICsgJyA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2xvc2UganMtcmVzZXQtcmVwbHlcIj4mdGltZXM7PC9hPjwvZGl2PicgKS5pbnNlcnRBZnRlciggcmVwbHkuZmluZCggJ2gzJyApICk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cdCQoIGRvY3VtZW50ICkub24oICdjbGljaycsICcuanMtcmVzZXQtcmVwbHknLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbWUgXHQgID0gJCggdGhpcyApLFxuXHRcdFx0cmVwbHkgPSBtZS5jbG9zZXN0KCAnLmFsZXJ0JyApO1xuXG5cdFx0JCggJyNmdF81ZjhkYjVmMzI2NzM1JyApLnZhbCggJzAnICk7XG5cblx0XHRyZXBseS5mYWRlT3V0KCAzMDAsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCggdGhpcyApLnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KTtcblxuICAgIGZ1bmN0aW9uIHBhZ2Vfc2Nyb2xsKCBhbmNob3IgKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAkKCAnLmpzLWhlYWRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzICkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gJCggJy5qcy1ob2xkZXInICkub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoICdodG1sLCBib2R5JyApLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBhbmNob3Iub2Zmc2V0KCkudG9wIC0gb2Zmc2V0XG4gICAgICAgIH0sIDgwMCApO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICBpZiAoICQoICcuanMtZmFxJyApICkge1xuICAgICAgICAkKCAnLmpzLWZhcScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICkuY2xvc2VzdCggJy5mYXEtaXRlbScgKTtcblxuICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgbWUuZmluZCggJy5mYXEtYW5zd2VyJyApLnNsaWRlVXAoIDIwMCApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIG1lLmZpbmQoICcuZmFxLWFuc3dlcicgKS5zbGlkZURvd24oIDIwMCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNjcm9sbC5zZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnaW5wdXRbdHlwZT1maWxlXScgKSApIHtcbiAgICAgICAgLypcbiAgICAgICAgICogSW5pdFxuICAgICAgICAgKi9cbiAgICAgICAgJCggJ2lucHV0W3R5cGU9ZmlsZV0nICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgIGlucHV0LndyYXAoICc8ZGl2IGNsYXNzPVwiZmlsZVwiPjwvZGl2PicgKTtcblxuICAgICAgICAgICAgdmFyIGZpbGUgICAgICAgID0gaW5wdXQuY2xvc2VzdCggJy5maWxlJyApLFxuICAgICAgICAgICAgICAgIGxhYmVsICAgICAgID0gaW5wdXQuYXR0ciggJ2RhdGEtbGFiZWwnICksXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgPSBpbnB1dC5hdHRyKCAnZGF0YS1wbGFjZWhvbGRlcicgKTtcblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgbGFiZWwgPT09ICd1bmRlZmluZWQnIHx8IGxhYmVsID09ICcnICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gJ1BhcmNvdXJpcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBsYWNlaG9sZGVyID09PSAndW5kZWZpbmVkJyB8fCBwbGFjZWhvbGRlciA9PSAnJyApIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmlzKCAnOmRpc2FibGVkJyApICkge1xuICAgICAgICAgICAgICAgIGZpbGUuYWRkQ2xhc3MoICdpcy1kaXNhYmxlZCcgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlsZS5wcmVwZW5kKCAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFya1wiPicgKyBsYWJlbCArICc8L2J1dHRvbj48ZGl2IGNsYXNzPVwiZmlsZS1zZWxlY3RlZFwiPicgKyBwbGFjZWhvbGRlciArICc8L2Rpdj4nICk7XG4gICAgICAgICAgICBmaWxlLmFwcGVuZCggJzxhIGNsYXNzPVwiZmlsZS1yZW1vdmUganMtZmlsZS1yZW1vdmVcIj4mdGltZXM7PC9hPicgKTtcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAqIEJyb3dzZSBidXR0b24gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuZmlsZScgKS5maW5kKCAnYnV0dG9uJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBmaWxlICA9IGJ0bi5jbG9zZXN0KCAnLmZpbGUnICksXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBmaWxlLmZpbmQoICdpbnB1dCcgKTtcblxuICAgICAgICAgICAgaW5wdXQuY2xpY2soKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIFJlbW92ZSBidXR0b24gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuZmlsZScgKS5maW5kKCAnLmpzLWZpbGUtcmVtb3ZlJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gICAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBmaWxlICAgICA9IGJ0bi5jbG9zZXN0KCAnLmZpbGUnICksXG4gICAgICAgICAgICAgICAgaW5wdXQgICAgPSBmaWxlLmZpbmQoICdpbnB1dCcgKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZpbGUuZmluZCggJy5maWxlLXNlbGVjdGVkJyApO1xuXG4gICAgICAgICAgICBpbnB1dC52YWwoICcnICkuY2hhbmdlKCk7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkLnRleHQoIGlucHV0LmF0dHIoICdkYXRhLXBsYWNlaG9sZGVyJyApICk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDaGFuZ2UgZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuZmlsZScgKS5maW5kKCAnaW5wdXQnICkub24oICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBmaWxlICAgICA9IGlucHV0LmNsb3Nlc3QoICcuZmlsZScgKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZpbGUuZmluZCggJy5maWxlLXNlbGVjdGVkJyApO1xuXG4gICAgICAgICAgICBpZiggaW5wdXQudmFsKCkgIT09ICcnICkge1xuICAgICAgICAgICAgICAgIGZpbGUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsZS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5hbWVzID0gJyc7XG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dC5nZXQoMCkuZmlsZXMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpID4gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMgKz0gJywgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZXMgKz0gaW5wdXQuZ2V0KDApLmZpbGVzW2ldLm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdGVkLnRleHQoIG5hbWVzICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgbWFwLFxuICAgIGluZm9fd2luZG93cyA9IFtdLFxuICAgIGVsZW1lbnRzICAgICA9IFtdLFxuICAgIGljb24gICAgICAgICA9IGJyYXZhZC50ZW1wbGF0ZV91cmwgKyAnL2Fzc2V0cy9pbWcvcGluLnN2Zyc7XG5cbiAgICBmdW5jdGlvbiBuZXdfbWFwKCAkZWwgKSB7XG4gICAgICAgIHZhciAkbWFya2VycyA9ICRlbC5maW5kKCAnLmpzLW1hcmtlcicgKTtcblxuICAgICAgICB2YXIgc3R5bGVkTWFwVHlwZSA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjVmNVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MTYxNjFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5zdHJva2VcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWY1ZjVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmRiZGJkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZWVlZWVlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3NTc1NzVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U1ZTVlNVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNzU3NTc1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGFkYWRhXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MTYxNjFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LmxpbmVcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlNWU1ZTVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb25cIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlZWVlZWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2M5YzljOVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAge25hbWU6ICdTdHlsZWQgTWFwJ30pO1xuXG52YXIgYXJncyA9IHtcbiAgICB6b29tIDogMTQsXG4gICAgY2VudGVyIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygwLCAwKSxcbiAgICBtYXBUeXBlSWQgOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICBzY3JvbGx3aGVlbCA6IGZhbHNlLFxuICAgIHBhbkNvbnRyb2wgOiBmYWxzZSxcbiAgICBwYW5Db250cm9sT3B0aW9ucyA6IHtcbiAgICAgICAgcG9zaXRpb24gOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uVE9QX1JJR0hUXG4gICAgfSxcbiAgICB6b29tQ29udHJvbCA6IHRydWUsXG4gICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgIHN0eWxlIDogZ29vZ2xlLm1hcHMuWm9vbUNvbnRyb2xTdHlsZS5MQVJHRSxcbiAgICAgICAgcG9zaXRpb24gOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uVE9QX1JJR0hUXG4gICAgfSxcbiAgICBtYXBUeXBlQ29udHJvbCA6IGZhbHNlLFxuICAgIG1hcFR5cGVDb250cm9sT3B0aW9ucyA6IHtcbiAgICAgICAgbWFwVHlwZUlkcyA6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ3N0eWxlZF9tYXAnXVxuICAgIH0sXG4gICAgZHJhZ2dhYmxlIDogdHJ1ZSxcbiAgICBkaXNhYmxlRGVmYXVsdFVJIDogdHJ1ZVxufTtcblxubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCggJGVsWzBdLCBhcmdzICk7XG5cbm1hcC5tYXBUeXBlcy5zZXQoICdzdHlsZWRfbWFwJywgc3R5bGVkTWFwVHlwZSApO1xubWFwLnNldE1hcFR5cGVJZCggJ3N0eWxlZF9tYXAnICk7XG5cbm1hcC5tYXJrZXJzID0gW107XG5lbGVtZW50cyA9IFtdO1xuXG4kbWFya2Vycy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICB2YXIgZWxlbWVudCA9IHtcbiAgICAgICAgJ19pZCc6IHBhcnNlSW50KCBtZS5hdHRyKCAnZGF0YS1pZCcgKSApLFxuICAgICAgICAnX3RpdGxlJzogbWUuYXR0ciggJ2RhdGEtdGl0bGUnICksXG4gICAgICAgICdfYWRkcmVzcyc6IG1lLmF0dHIoICdkYXRhLWFkZHJlc3MnICksXG4gICAgICAgICdfZW1haWwnOiBtZS5hdHRyKCAnZGF0YS1lbWFpbCcgKSxcbiAgICAgICAgJ19waG9uZSc6IG1lLmF0dHIoICdkYXRhLXBob25lJyApLFxuICAgICAgICAnX2xhdCc6IG1lLmF0dHIoICdkYXRhLWxhdCcgKSxcbiAgICAgICAgJ19sbmcnOiBtZS5hdHRyKCAnZGF0YS1sbmcnIClcbiAgICB9O1xuXG4gICAgZWxlbWVudHMucHVzaCggZWxlbWVudCApO1xufSk7XG5cbiRtYXJrZXJzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgIGFkZF9tYXJrZXIoIG1lLCBtYXAgKTtcbn0pO1xuXG5jZW50ZXJfbWFwKCBtYXAgKTtcblxucmV0dXJuIG1hcDtcbn1cblxuZnVuY3Rpb24gYWRkX21hcmtlciggJG1hcmtlciwgbWFwICkge1xuICAgIHZhciBsYXRsbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCAkbWFya2VyLmF0dHIoICdkYXRhLWxhdCcgKSwgJG1hcmtlci5hdHRyKCAnZGF0YS1sbmcnICkgKTtcblxuICAgIHZhciBwaW4gPSB7XG4gICAgICAgIHVybDogYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4uc3ZnJyxcbiAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoIDQ1LCA1NCApLFxuICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggNDUsIDU0ICksXG4gICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KCAyMiwgNTQgKVxuICAgIH07XG5cbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgIHBvc2l0aW9uIDogbGF0bG5nLFxuICAgICAgICBtYXAgOiBtYXAsXG4gICAgICAgIGljb24gOiBwaW5cbiAgICB9KTtcblxuICAgIG1hcC5tYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXG4gICAgdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG4gICAgICAgIGNvbnRlbnQgOiAkbWFya2VyLmh0bWwoKVxuICAgIH0pO1xuXG4gICAgaW5mb193aW5kb3dzLnB1c2goIGluZm93aW5kb3cgKTtcblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKCBtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbG9zZV9pbmZvd2luZG93KCk7XG5cbiAgICAgICAgaW5mb3dpbmRvdy5vcGVuKCBtYXAsIG1hcmtlciApO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjbG9zZV9pbmZvd2luZG93KCkge1xuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpbmZvX3dpbmRvd3NbaV0uY2xvc2UoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNlbnRlcl9tYXAoIG1hcCApIHtcbiAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgJC5lYWNoKCBtYXAubWFya2VycywgZnVuY3Rpb24oIGksIG1hcmtlciApIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIG1hcmtlci5wb3NpdGlvbi5sYXQoKSwgbWFya2VyLnBvc2l0aW9uLmxuZygpICk7XG5cbiAgICAgICAgYm91bmRzLmV4dGVuZCggbGF0bG5nICk7XG4gICAgfSk7XG5cbiAgICBpZiAoIG1hcC5tYXJrZXJzLmxlbmd0aCA9PSAxICkge1xuICAgICAgICBtYXAuc2V0Q2VudGVyKCBib3VuZHMuZ2V0Q2VudGVyKCkgKTtcbiAgICAgICAgbWFwLnNldFpvb20oIDE1ICk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuZml0Qm91bmRzKCBib3VuZHMgKTtcbiAgICB9XG59XG5cbm1hcCA9IG51bGw7XG5cbiQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICQoICcuanMtbWFwJyApLmVhY2goIGZ1bmN0aW9uKCl7XG4gICAgICAgIG1hcCA9IG5ld19tYXAoICQoIHRoaXMgKSApO1xuICAgIH0pO1xufSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgJC5mbi5icmF2YWRfbnVtYmVyID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEluaXRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGN1cnJfdmFsID0gcGFyc2VJbnQoIGlucHV0LnZhbCgpICksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfbWludXMsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfcGx1cztcblxuICAgICAgICAgICAgaW5wdXQud3JhcCggJzxkaXYgY2xhc3M9XCJudW1iZXIganMtbnVtYmVyXCI+PC9kaXY+JyApO1xuXG4gICAgICAgICAgICB2YXIgbnVtYmVyID0gaW5wdXQuY2xvc2VzdCggJy5qcy1udW1iZXInICk7XG5cbiAgICAgICAgICAgIGlmICggaW5wdXQuYXR0ciggJ2RhdGEtcG9zaXRpb24nICkgPT0gJ2xlZnQnICkge1xuICAgICAgICAgICAgICAgIG51bWJlci5hZGRDbGFzcyggJ251bWJlci1sZWZ0JyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmlzKCAnOmRpc2FibGVkJyApICkge1xuICAgICAgICAgICAgICAgIG51bWJlci5hZGRDbGFzcyggJ2lzLWRpc2FibGVkJyApO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkX21pbnVzID0gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIic7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfcGx1cyAgPSAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICggY3Vycl92YWwgPD0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtaW4nICkgKSApIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9taW51cyA9ICdkaXNhYmxlZD1cImRpc2FibGVkXCInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGN1cnJfdmFsID49IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWF4JyApICkgKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfcGx1cyA9ICdkaXNhYmxlZD1cImRpc2FibGVkXCInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogQXBwZW5kIGJ1dHRvbnMgdG8gdGhlIHdyYXBwZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbnVtYmVyLnByZXBlbmQoICc8YnV0dG9uIGNsYXNzPVwibnVtYmVyLW1pbnVzXCInICsgZGlzYWJsZWRfbWludXMgKyAnPi08L2J1dHRvbj4nICk7XG4gICAgICAgICAgICBudW1iZXIuYXBwZW5kKCAnPGJ1dHRvbiBjbGFzcz1cIm51bWJlci1wbHVzXCInICsgZGlzYWJsZWRfcGx1cyArICc+KzwvYnV0dG9uPicgKTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBNaW51cyBidXR0b24gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuanMtbnVtYmVyJyApLmZpbmQoICcubnVtYmVyLW1pbnVzJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gICAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgbnVtYmVyID0gYnRuLmNsb3Nlc3QoICcubnVtYmVyJyApLFxuICAgICAgICAgICAgICAgIGlucHV0ICA9IG51bWJlci5maW5kKCAnaW5wdXQnICksXG4gICAgICAgICAgICAgICAgdmFsICAgID0gcGFyc2VJbnQoIGlucHV0LnZhbCgpICksXG4gICAgICAgICAgICAgICAgc3RlcCAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdzdGVwJyApICksXG4gICAgICAgICAgICAgICAgbWluICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtaW4nICkgKSxcbiAgICAgICAgICAgICAgICBtYXggICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21heCcgKSApLFxuICAgICAgICAgICAgICAgIG5ld192YWw7XG5cbiAgICAgICAgICAgIG5ld192YWwgPSB2YWwgLSBzdGVwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbnB1dFxuICAgICAgICAgICAgICAgIC52YWwoIG5ld192YWwgKVxuICAgICAgICAgICAgICAgIC5jaGFuZ2UoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIFBsdXMgYnV0dG9uIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmpzLW51bWJlcicgKS5maW5kKCAnLm51bWJlci1wbHVzJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gICAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgbnVtYmVyID0gYnRuLmNsb3Nlc3QoICcubnVtYmVyJyApLFxuICAgICAgICAgICAgICAgIGlucHV0ICA9IG51bWJlci5maW5kKCAnaW5wdXQnICksXG4gICAgICAgICAgICAgICAgdmFsICAgID0gcGFyc2VJbnQoIGlucHV0LnZhbCgpICksXG4gICAgICAgICAgICAgICAgc3RlcCAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdzdGVwJyApICksXG4gICAgICAgICAgICAgICAgbWluICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtaW4nICkgKSxcbiAgICAgICAgICAgICAgICBtYXggICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21heCcgKSApLFxuICAgICAgICAgICAgICAgIG5ld192YWw7XG5cbiAgICAgICAgICAgIG5ld192YWwgPSB2YWwgKyBzdGVwO1xuXG4gICAgICAgICAgICBpbnB1dFxuICAgICAgICAgICAgICAgIC52YWwoIG5ld192YWwgKVxuICAgICAgICAgICAgICAgIC5jaGFuZ2UoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIENoYW5nZSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5qcy1udW1iZXInICkuZmluZCggJ2lucHV0JyApLm9uKCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIG51bWJlciA9IGlucHV0LmNsb3Nlc3QoICcubnVtYmVyJyApLFxuICAgICAgICAgICAgICAgIHZhbCAgICA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIG1pbiAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICksXG4gICAgICAgICAgICAgICAgbWF4ICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtYXgnICkgKTtcblxuICAgICAgICAgICAgaWYgKCB2YWwgPj0gbWF4ICkge1xuICAgICAgICAgICAgICAgIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAuZmluZCggJy5udW1iZXItcGx1cycgKVxuICAgICAgICAgICAgICAgICAgICAucHJvcCggJ2Rpc2FibGVkJywgdHJ1ZSApO1xuXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKCBtYXggKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcubnVtYmVyLXBsdXMnIClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoICdkaXNhYmxlZCcsIGZhbHNlICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdmFsIDw9IG1pbiApIHtcbiAgICAgICAgICAgICAgICBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcubnVtYmVyLW1pbnVzJyApXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCAnZGlzYWJsZWQnLCB0cnVlICk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCggbWluICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLm51bWJlci1taW51cycgKVxuICAgICAgICAgICAgICAgICAgICAucHJvcCggJ2Rpc2FibGVkJywgZmFsc2UgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgbWFwLFxuICAgICAgICBpbmZvd2luZG93ICAgPSBudWxsLFxuICAgICAgICBlbGVtZW50cyAgICAgPSBbXSxcbiAgICAgICAgdl9lbGVtZW50cyAgID0gW10sXG4gICAgICAgIHN0YXJ0X3BvcyAgICA9ICcnLFxuICAgICAgICBsb2FkZXIgICAgICAgPSAkKCAnLmpzLXNhbGUtbG9hZGVyJyApLFxuICAgICAgICBpY29uICAgICAgICAgPSBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9hc3NldHMvaW1nL3Bpbi5zdmcnO1xuXG4gICAgZnVuY3Rpb24gbmV3X21hcCggJGVsICkge1xuICAgICAgICB2YXIgc3R5bGVkTWFwVHlwZSA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjVmNVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MTYxNjFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5zdHJva2VcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWY1ZjVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmRiZGJkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZWVlZWVlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3NTc1NzVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U1ZTVlNVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNzU3NTc1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGFkYWRhXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MTYxNjFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LmxpbmVcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlNWU1ZTVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb25cIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlZWVlZWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2M5YzljOVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAge25hbWU6ICdTdHlsZWQgTWFwJ30pO1xuXG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgem9vbSA6IDE0LFxuICAgICAgICAgICAgY2VudGVyIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggNDUuNDExNjg5ODUwODY5OTksIC03MS44OTI0Mjc0MjcyMDE1MyApLFxuICAgICAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICAgICAgICBzY3JvbGx3aGVlbCA6IGZhbHNlLFxuICAgICAgICAgICAgcGFuQ29udHJvbCA6IGZhbHNlLFxuICAgICAgICAgICAgcGFuQ29udHJvbE9wdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uVE9QX1JJR0hUXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgem9vbUNvbnRyb2wgOiB0cnVlLFxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc3R5bGUgOiBnb29nbGUubWFwcy5ab29tQ29udHJvbFN0eWxlLkxBUkdFLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sIDogZmFsc2UsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgbWFwVHlwZUlkcyA6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ3N0eWxlZF9tYXAnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdnYWJsZSA6IHRydWUsXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJIDogdHJ1ZVxuICAgICAgICB9O1xuICAgICBcbiAgICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCggJGVsWzBdLCBhcmdzICk7XG5cbiAgICAgICAgbWFwLm1hcFR5cGVzLnNldCggJ3N0eWxlZF9tYXAnLCBzdHlsZWRNYXBUeXBlICk7XG4gICAgICAgIG1hcC5zZXRNYXBUeXBlSWQoICdzdHlsZWRfbWFwJyApO1xuXG4gICAgICAgIHZhciBwaW4gPSB7XG4gICAgICAgICAgICB1cmw6IGJyYXZhZC50ZW1wbGF0ZV91cmwgKyAnL2Fzc2V0cy9pbWcvcGluLnN2ZycsXG4gICAgICAgICAgICBzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggMzAsIDM2ICksXG4gICAgICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggMzAsIDM2ICksXG4gICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCggMTUsIDM2IClcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIDQ1LjQxMTY4OTg1MDg2OTk5LCAtNzEuODkyNDI3NDI3MjAxNTMgKSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXG4gICAgICAgICAgICBtYXAgOiBtYXAsXG4gICAgICAgICAgICBpY29uIDogcGluLFxuICAgICAgICAgICAgdGl0bGUgOiBicmF2YWQuc2l0ZV90aXRsZVxuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lciggbWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggaW5mb3dpbmRvdyApIHtcbiAgICAgICAgICAgICAgICBpbmZvd2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb250ZW50X3N0ciA9ICc8cD48c3Ryb25nPicgKyBicmF2YWQuc2l0ZV90aXRsZSArICc8L3N0cm9uZz48L3A+JztcblxuICAgICAgICAgICAgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgICAgICAgICBpbmZvd2luZG93LnNldENvbnRlbnQoIGNvbnRlbnRfc3RyICk7XG4gICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4oIG1hcCwgbWFya2VyICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hcC5tYXJrZXJzID0gW107XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYnJhdmFkLmFqYXhfdXJsLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ2dldF9wb2ludHMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCBkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiApIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRhdGEuZGF0YS5tYXJrZXJzO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIGVsZW1lbnRzICk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlX2xvYWRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9tYXJrZXIoIGVsZW1lbnQsIG1hcCApIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIGVsZW1lbnQubGF0LCBlbGVtZW50LmxuZyApLFxuICAgICAgICAgICAgaWNvbjtcblxuICAgICAgICBpZiAoIGVsZW1lbnQuY2F0ICE9PSAnJyApIHtcbiAgICAgICAgICAgIGljb24gPSBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9hc3NldHMvaW1nL3Bpbi0nICsgZWxlbWVudC5jYXQgKyAnLnN2Zyc7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGljb24gPSBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9hc3NldHMvaW1nL3Bpbi5zdmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBpbiA9IHtcbiAgICAgICAgICAgIHVybDogaWNvbixcbiAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKCAzMCwgMzYgKSxcbiAgICAgICAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKCAzMCwgMzYgKSxcbiAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KCAxNSwgMzYgKVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogbGF0bG5nLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcbiAgICAgICAgICAgIG1hcCA6IG1hcCxcbiAgICAgICAgICAgIGljb24gOiBwaW4sXG4gICAgICAgICAgICB0aXRsZSA6IGVsZW1lbnQudGl0bGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFwLm1hcmtlcnMucHVzaCggbWFya2VyICk7XG4gICAgICAgIHZfZWxlbWVudHMucHVzaCggZWxlbWVudC5jYXQgKTtcblxuICAgICAgICAkKCAnLmpzLWZpbHRlcnMnICkuZmluZCggJy5iYWRnZVtkYXRhLWNhdD0nICsgZWxlbWVudC5jYXQgKyAnXScgKS5zaG93KCk7XG4gICAgICAgICQoICcuanMtZmlsdGVycyBzbWFsbCcgKS5zaG93KCk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoIG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIGluZm93aW5kb3cgKSB7XG4gICAgICAgICAgICAgICAgaW5mb3dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGJyYXZhZC5sYW5nX2NvZGUgPT0gJ2ZyJyApIHtcbiAgICAgICAgICAgICAgICByb3V0ZV9sYWJlbCA9ICdJdGluw6lyYWlyZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm91dGVfbGFiZWwgPSAnUm91dGUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcm91dGUgPSAnPGEgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcz9mPWQmc2FkZHI9JyArIHN0YXJ0X3BvcyArICcmZGFkZHI9JyArIGVsZW1lbnQubGF0ICsgJywnICsgZWxlbWVudC5sbmcgKyAnJmRpcmZsZz1kXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHJvdXRlX2xhYmVsICsgJzwvYT4nO1xuXG4gICAgICAgICAgICAvLyB2YXIgY29udGVudF9zdHIgPSAnPHA+PHN0cm9uZz4nICsgZWxlbWVudC50aXRsZSArICc8L3N0cm9uZz48L3A+PHA+JyArIGVsZW1lbnQuYWRkcmVzcyArICc8L3A+PHA+RGlzdGFuY2U6ICcgKyBlbGVtZW50LmRpc3RhbmNlICsgJyAoJyArIGVsZW1lbnQuZHVyYXRpb24gKyAnKTwvcD4nICsgcm91dGU7XG4gICAgICAgICAgICB2YXIgY29udGVudF9zdHIgPSAnPHA+PHN0cm9uZz4nICsgZWxlbWVudC50aXRsZSArICc8L3N0cm9uZz48L3A+PHA+JyArIGVsZW1lbnQuYWRkcmVzcyArICc8L3A+PHA+RGlzdGFuY2U6ICcgKyBlbGVtZW50LmRpc3RhbmNlLnRvRml4ZWQoIDIgKSArICcga208L3A+JyArIHJvdXRlO1xuXG4gICAgICAgICAgICBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGluZm93aW5kb3cuc2V0Q29udGVudCggY29udGVudF9zdHIgKTtcbiAgICAgICAgICAgIGluZm93aW5kb3cub3BlbiggbWFwLCBtYXJrZXIgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2VudGVyX21hcCggbWFwICkge1xuICAgICAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgICAgICQuZWFjaCggbWFwLm1hcmtlcnMsIGZ1bmN0aW9uKCBpLCBtYXJrZXIgKSB7XG4gICAgICAgICAgICB2YXIgbGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggbWFya2VyLnBvc2l0aW9uLmxhdCgpLCBtYXJrZXIucG9zaXRpb24ubG5nKCkgKTtcblxuICAgICAgICAgICAgYm91bmRzLmV4dGVuZCggbGF0bG5nICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICggbWFwLm1hcmtlcnMubGVuZ3RoID09IDEgKSB7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKCBib3VuZHMuZ2V0Q2VudGVyKCkgKTtcbiAgICAgICAgICAgIG1hcC5zZXRab29tKCAxNSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKCBib3VuZHMgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRfY2xvc2VzdCggcG9zaXRpb24gKSB7XG4gICAgICAgIGdldF9kaXN0YW5jZSggMCApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBkaXN0YW5jZSA9IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnNwaGVyaWNhbC5jb21wdXRlRGlzdGFuY2VCZXR3ZWVuKCBwb3NpdGlvbiwgbGF0TG5nICkgLyAxMDAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldF9kaXN0YW5jZSggaSApIHtcbiAgICAgICAgICAgIGlmICggaSA8IGVsZW1lbnRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5kX3BvcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIGVsZW1lbnRzW2ldLmxhdCwgZWxlbWVudHNbaV0ubG5nICk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS5kaXN0YW5jZSA9IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnNwaGVyaWNhbC5jb21wdXRlRGlzdGFuY2VCZXR3ZWVuKCBwb3NpdGlvbiwgZW5kX3BvcyApIC8gMTAwMDtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS5jYWxjID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsLmNvbXB1dGVEaXN0YW5jZUJldHdlZW4oIHBvc2l0aW9uLCBlbmRfcG9zICkgLyAxMDAwO1xuXG4gICAgICAgICAgICAgICAgaSsrO1xuXG4gICAgICAgICAgICAgICAgZ2V0X2Rpc3RhbmNlKCBpICk7XG5cbiAgICAgICAgICAgICAgICAvLyB2YXIgZGlyZWN0aW9ucyA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIG9yaWdpbjogc3RhcnRfcG9zLFxuICAgICAgICAgICAgICAgIC8vICAgICBkZXN0aW5hdGlvbjogZW5kX3BvcyxcbiAgICAgICAgICAgICAgICAvLyAgICAgdHJhdmVsTW9kZTogZ29vZ2xlLm1hcHMuVHJhdmVsTW9kZS5EUklWSU5HXG4gICAgICAgICAgICAgICAgLy8gfTtcblxuICAgICAgICAgICAgICAgIC8vIGRpcmVjdGlvbnMucm91dGUoIHJlcXVlc3QsIGZ1bmN0aW9uKCByZXNwb25zZSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoIHN0YXR1cyA9PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LICkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZWxlbWVudHNbaV0uZGlzdGFuY2UgPSByZXNwb25zZS5yb3V0ZXNbMF0ubGVnc1swXS5kaXN0YW5jZS50ZXh0O1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZWxlbWVudHNbaV0uY2FsYyA9IHJlc3BvbnNlLnJvdXRlc1swXS5sZWdzWzBdLmRpc3RhbmNlLnZhbHVlIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRzW2ldLmR1cmF0aW9uID0gcmVzcG9uc2Uucm91dGVzWzBdLmxlZ3NbMF0uZHVyYXRpb24udGV4dDtcblxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaSsrO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBnZXRfZGlzdGFuY2UoIGkgKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2UgaWYgKCBzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT1ZFUl9RVUVSWV9MSU1JVCApIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBnZXRfZGlzdGFuY2UoIGkgKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sIDExMDAgKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpID09IGVsZW1lbnRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVfbWFya2VycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlX21hcmtlcnMoKSB7XG4gICAgICAgICAgICB2YXIgbWF4X2Rpc3RhbmNlID0gJCggJy5qcy1yYXlvbicgKS52YWwoKTtcblxuICAgICAgICAgICAgZWxlbWVudHMuc29ydCggY29tcGFyZV9kaXN0YW5jZSApO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW1lbnRzW2ldLmNhbGMgPD0gbWF4X2Rpc3RhbmNlICkge1xuICAgICAgICAgICAgICAgICAgICBhZGRfbWFya2VyKCBlbGVtZW50c1tpXSwgbWFwICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZW50ZXJfbWFwKCBtYXAgKTtcblxuICAgICAgICAgICAgcmVtb3ZlX2xvYWRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY29tcGFyZV9kaXN0YW5jZSggcG9pbnRBLCBwb2ludEIgKSB7XG4gICAgICAgICAgICB2YXIgaVJlcyA9IDA7XG5cbiAgICAgICAgICAgIGlmICggcG9pbnRBLmNhbGMgPCBwb2ludEIuY2FsYyApIHtcbiAgICAgICAgICAgICAgICBpUmVzID0gLTE7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHBvaW50QS5jYWxjID4gcG9pbnRCLmNhbGMgKSB7XG4gICAgICAgICAgICAgICAgaVJlcyA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpUmVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCggJy5qcy1zZWFyY2gtcG9pbnRzJyApLm9uKCAnc3VibWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyX2Vycm9yKCk7XG5cbiAgICAgICAgdmFyIGFkZHJlc3MgPSAkKCAnLmpzLWFkZHJlc3MnICkudmFsKCk7XG5cbiAgICAgICAgaWYgKCBhZGRyZXNzICE9PSAnJyApIHtcbiAgICAgICAgICAgIGFkZF9sb2FkZXIoKTtcblxuICAgICAgICAgICAgZ2V0X2FkZHJlc3MoIGFkZHJlc3MgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgICQoICcuanMtZ2VvJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJfZXJyb3IoKTtcblxuICAgICAgICBpZiAoIG5hdmlnYXRvci5nZW9sb2NhdGlvbiApIHtcbiAgICAgICAgICAgIGFkZF9sb2FkZXIoKTtcblxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbiggZnVuY3Rpb24oIHBvc2l0aW9uICkge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUgKTtcblxuICAgICAgICAgICAgICAgIHN0YXJ0X3BvcyA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG5cbiAgICAgICAgICAgICAgICByZXNldF9wb3NpdGlvbiggcG9zICk7XG5cbiAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKCBwb3MgKTtcblxuICAgICAgICAgICAgICAgIGZpbmRfY2xvc2VzdCggcG9zICk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge30gKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCBicmF2YWQubGFuZ19jb2RlID09ICdmcicgKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyX2Vycm9yKCBcIlZvdHJlIG5hdmlnYXRldXIgbmUgcHJlbmQgcGFzIGVuIGNoYXJnZSBsYSBnw6lvbG9jYWxpc2F0aW9uXCIgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW5kZXJfZXJyb3IoIFwiQnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgR2VvbG9jYXRpb25cIiApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW1vdmVfbG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0X3Bvc2l0aW9uKCBwb3NpdGlvbiApIHtcbiAgICAgICAgaWYgKCBwb3NpdGlvbiAhPT0gJycgKSB7XG4gICAgICAgICAgICBjbGVhcl9tYXJrZXIoKTtcblxuICAgICAgICAgICAgdmFyIHBpbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9hc3NldHMvaW1nL3Bpbi15b3Uuc3ZnJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoIDMwLCAzNiApLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggMzAsIDM2ICksXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KCAxNSwgMzYgKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGl0bGUgPSAnJztcblxuICAgICAgICAgICAgaWYgKCBicmF2YWQubGFuZ19jb2RlID09ICdmcicgKSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSAnVm91cyDDqnRlcyBpY2knO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gJ1lvdSBhcmUgaGVyZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIG1hcCA6IG1hcCxcbiAgICAgICAgICAgICAgICBpY29uIDogcGluLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hcC5tYXJrZXJzLnB1c2goIG1hcmtlciApO1xuICAgICAgICAgICAgdl9lbGVtZW50cy5wdXNoKCAneW91JyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLWZpbHRlcnMgLmJhZGdlW2RhdGEtY2F0PXlvdV0nICkuc2hvdygpO1xuICAgICAgICAgICAgJCggJy5qcy1maWx0ZXJzIHNtYWxsJyApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggNDUuNjU3NzM2NjEyMTI5MzEsIC03Mi4xNDcxODgwODA3Nzg2OCApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X2FkZHJlc3MoIGFkZHJlc3MgKSB7XG4gICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuXG4gICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoIHsgJ2FkZHJlc3MnOiBhZGRyZXNzIH0sIGZ1bmN0aW9uKCByZXN1bHRzLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICBpZiAoIHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSyApIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbjtcblxuICAgICAgICAgICAgICAgIHN0YXJ0X3BvcyA9IHBvcztcblxuICAgICAgICAgICAgICAgIHJlc2V0X3Bvc2l0aW9uKCBwb3MgKTtcblxuICAgICAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoIHBvcyApO1xuXG4gICAgICAgICAgICAgICAgZmluZF9jbG9zZXN0KCBwb3MgKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggc3RhdHVzID09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9WRVJfUVVFUllfTElNSVQgKSB7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5aRVJPX1JFU1VMVFMgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBicmF2YWQubGFuZ19jb2RlID09ICdmcicgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcl9lcnJvciggXCJOb3VzIG4nYXZvbnMgcGFzIHRyb3V2w6kgbCdhZHJlc3NlXCIgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcl9lcnJvciggXCJXZSBjb3VsZG4ndCBmaW5kIHRoZSBhZGRyZXNzXCIgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZW1vdmVfbG9hZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyX21hcmtlcigpIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgbWFwLm1hcmtlcnMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICBtYXAubWFya2Vyc1tpXS5zZXRNYXAoIG51bGwgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcC5tYXJrZXJzID0gW107XG4gICAgICAgIHZfZWxlbWVudHMgPSBbXTtcblxuICAgICAgICAkKCAnLmpzLWZpbHRlcnMgLmJhZGdlJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCggdGhpcyApLmhpZGUoKS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCggJy5qcy1maWx0ZXJzIHNtYWxsJyApLmhpZGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZXJyb3IoIG1zZyApIHtcbiAgICAgICAgdmFyIGVycm9yID0gJCggJy5qcy1tYXAtc2FsZS1lcnJvcicgKTtcblxuICAgICAgICBlcnJvci5lbXB0eSgpO1xuICAgICAgICBlcnJvci5hcHBlbmQoICc8YnIgLz48ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+JyArIG1zZyArICc8L2Rpdj4nICk7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhcl9lcnJvcigpIHtcbiAgICAgICAgdmFyIGVycm9yID0gJCggJy5qcy1tYXAtc2FsZS1lcnJvcicgKTtcblxuICAgICAgICBlcnJvci5lbXB0eSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9sb2FkZXIoKSB7XG4gICAgICAgIGxvYWRlci5mYWRlSW4oIDMwMCApO1xuXG4gICAgICAgICQoICdmb3JtLnNlYXJjaC1wb2ludHMgOmlucHV0JyApLnByb3AoICdkaXNhYmxlZCcsIHRydWUgKTtcbiAgICAgICAgJCggJ2Zvcm0uc2VhcmNoLXBvaW50cyBzZWxlY3QnICkucHJvcCggJ2Rpc2FibGVkJywgdHJ1ZSApO1xuICAgICAgICAkKCAnZm9ybS5zZWFyY2gtcG9pbnRzIC5zZWxlY3QnICkuYWRkQ2xhc3MoICdpcy1kaXNhYmxlZCcgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVfbG9hZGVyKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoIGxvYWRlciApLmZhZGVPdXQoIDMwMCApO1xuXG4gICAgICAgICAgICAkKCAnZm9ybS5zZWFyY2gtcG9pbnRzIDppbnB1dCcgKS5wcm9wKCAnZGlzYWJsZWQnLCBmYWxzZSApO1xuICAgICAgICAgICAgJCggJ2Zvcm0uc2VhcmNoLXBvaW50cyBzZWxlY3QnICkucHJvcCggJ2Rpc2FibGVkJywgZmFsc2UgKTtcbiAgICAgICAgICAgICQoICdmb3JtLnNlYXJjaC1wb2ludHMgLnNlbGVjdCcgKS5yZW1vdmVDbGFzcyggJ2lzLWRpc2FibGVkJyApO1xuICAgICAgICB9LCA1MDAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJfbWFya2VyKCBjYXQsIHN0YXR1cyApIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgbWFwLm1hcmtlcnMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICBpZiAoIHZfZWxlbWVudHNbaV0gPT0gY2F0ICkge1xuICAgICAgICAgICAgICAgIG1hcC5tYXJrZXJzW2ldLnNldFZpc2libGUoIHN0YXR1cyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCggJy5qcy1tYXAtc2FsZS1maWx0ZXInICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgZmlsdGVyX21hcmtlciggbWUuYXR0ciggJ2RhdGEtY2F0JyApLCBmYWxzZSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgZmlsdGVyX21hcmtlciggbWUuYXR0ciggJ2RhdGEtY2F0JyApLCB0cnVlICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBtYXAgPSBudWxsO1xuXG4gICAgJCggZG9jdW1lbnQgKS5yZWFkeSggZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZF9sb2FkZXIoKTtcblxuICAgICAgICAkKCAnLmpzLW1hcC1zYWxlJyApLmVhY2goIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBtYXAgPSBuZXdfbWFwKCAkKCB0aGlzICkgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBnZXRVcmxQYXJhbWV0ZXIgPSBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIoIHNQYXJhbSApIHtcbiAgICAgICAgICAgIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCggd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkgKSxcbiAgICAgICAgICAgICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoICcmJyApLFxuICAgICAgICAgICAgICAgIHNQYXJhbWV0ZXJOYW1lLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoICc9JyApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc1BhcmFtZXRlck5hbWVbMV0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzUGFyYW1ldGVyTmFtZVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFuY2hvciA9IGdldFVybFBhcmFtZXRlciggJ3NlY3Rpb24nICk7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgYW5jaG9yICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBhZ2Vfc2Nyb2xsKCAnIycgKyBhbmNob3IgKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWRkZWQgPSBnZXRVcmxQYXJhbWV0ZXIoICdhZGQtdG8tY2FydCcgKTtcblxuICAgICAgICBpZiAoIHR5cGVvZiBhZGRlZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCggJy53b29jb21tZXJjZS1tZXNzYWdlJyApLmNsb3Nlc3QoICcuYmxvY2snICk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBhZ2Vfc2Nyb2xsKCB0YXJnZXQgKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICdhLmpzLXNjcm9sbFtocmVmXj1cIiNcIl0nLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGFuY2hvciA9ICQuYXR0ciggdGhpcywgJ2hyZWYnICk7XG5cbiAgICAgICAgcGFnZV9zY3JvbGwoIGFuY2hvciApO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcGFnZV9zY3JvbGwoIGFuY2hvciApIHtcbiAgICAgICAgdmFyIG9mZnNldCA9ICQoICcuanMtaGVhZGVyJyApLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAkKCAnLmpzLWhvbGRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoIGFuY2hvciApLm9mZnNldCgpLnRvcCAtIG9mZnNldFxuICAgICAgICB9LCA4MDAgKTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgJCggJy5qcy1oZWFkZXIgLmpzLXNlYXJjaCcgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIGlmICggISBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLmFkZENsYXNzKCAnc2VhcmNoLW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgICAgICQoICcuanMtbmF2IC5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcuc3ViLW1lbnUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCAyMDAgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoICQoICcuc2VhcmNoLWZpZWxkJyApLnZhbCgpID09ICcnICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAkKCAnLnNlYXJjaC1maWVsZCcgKS52YWwoKSA9PSAnJyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggJy5qcy1zZWFyY2gtZm9ybScgKS5vbiggJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBtZS5maW5kKCAnLnNlYXJjaC1maWVsZCcgKS52YWwoKSA9PSAnJyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggd2luZG93ICkub24oICdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xvc2Vfc2VhcmNoKCk7XG4gICAgfSk7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzID09IHRydWUgKSB7XG4gICAgICAgICAgICBjbG9zZV9zZWFyY2goKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgJy5qcy1zZWFyY2gtZm9ybScsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjbG9zZV9zZWFyY2goKSB7XG4gICAgICAgICQoICcuanMtc2VhcmNoJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICdzZWFyY2gtb3BlbmVkJyApO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICBpZiAoICQoICdzZWxlY3QnICkgKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEluaXRcbiAgICAgICAgICovXG4gICAgICAgICQoICdzZWxlY3QnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBjdXJyVmFsID0gc2VsZWN0LmZpbmQoICdvcHRpb246c2VsZWN0ZWQnICkudGV4dCgpLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM7XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnI3JhdGluZycgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHNlbGVjdC5hdHRyKCAnY2xhc3MnICkgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSAnICcgKyBzZWxlY3QuYXR0ciggJ2NsYXNzJyApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdFxuICAgICAgICAgICAgICAgIC53cmFwKCAnPGRpdiBjbGFzcz1cInNlbGVjdCcgKyBjbGFzc2VzICsgJ1wiPjwvZGl2PicgKVxuICAgICAgICAgICAgICAgIC5jc3MoICdvcGFjaXR5JywgJzAnICk7XG5cbiAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5hcHBlbmQoICc8c3BhbiBjbGFzcz1cInNlbGVjdC1jaG9pY2VcIj48L3NwYW4+JyApO1xuICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmZpbmQoICcuc2VsZWN0LWNob2ljZScgKS50ZXh0KCBjdXJyVmFsICk7XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnLmlzLWRhbmdlcicgKSApIHtcbiAgICAgICAgICAgICAgICBzZWxlY3QuY2xvc2VzdCggJy5zZWxlY3QnICkuYWRkQ2xhc3MoICdpcy1kYW5nZXInICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnLmlzLXN1Y2Nlc3MnICkgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtc3VjY2VzcycgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBzZWxlY3QuaXMoICc6ZGlzYWJsZWQnICkgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtZGlzYWJsZWQnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICogQ2hhbmdlIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdCAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgY3VyclZhbCA9IHNlbGVjdC5maW5kKCAnb3B0aW9uOnNlbGVjdGVkJyApLnRleHQoKTtcblxuICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmZpbmQoICcuc2VsZWN0LWNob2ljZScgKS50ZXh0KCBjdXJyVmFsICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgc2xpZGVzaG93ID0gW10sXG4gICAgICAgIG1haW5fc2xpZGVzaG93ID0gJycsXG4gICAgICAgIGNvbnRlbnRfc2xpZGVzaG93ID0gJyc7XG5cbiAgICAkKCB3aW5kb3cgKS5vbiggJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCAkKCAnLmpzLWJhY2tncm91bmQtc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICQoICcuanMtYmFja2dyb3VuZC1zd2lwZXInICkuZWFjaCggZnVuY3Rpb24oIGksIG9iaiApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0gPSBuZXcgU3dpcGVyKCBvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtYmFja2dyb3VuZCcgKS5maW5kKCAnLmpzLW5leHQnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVOZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1iYWNrZ3JvdW5kJyApLmZpbmQoICcuanMtcHJldicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZVByZXYoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1tYWluLXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBtYWluX3NsaWRlc2hvdyA9IG5ldyBTd2lwZXIoICcuanMtbWFpbi1zd2lwZXInLCB7XG4gICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKCAnLmpzLW1haW4tc3dpcGVyJyApLmNsb3Nlc3QoICcuanMtYmFja2dyb3VuZCcgKS5maW5kKCAnLmpzLW5leHQnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1haW5fc2xpZGVzaG93LnNsaWRlTmV4dCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoICcuanMtbWFpbi1zd2lwZXInICkuY2xvc2VzdCggJy5qcy1iYWNrZ3JvdW5kJyApLmZpbmQoICcuanMtcHJldicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbWFpbl9zbGlkZXNob3cuc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1jb250ZW50LXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBjb250ZW50X3NsaWRlc2hvdyA9IG5ldyBTd2lwZXIoICcuanMtY29udGVudC1zd2lwZXInLCB7XG4gICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgIHBhcmFsbGF4OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbWFpbl9zbGlkZXNob3cgIT09ICcnICYmIGNvbnRlbnRfc2xpZGVzaG93ICE9PSAnJyApIHtcbiAgICAgICAgICAgIG1haW5fc2xpZGVzaG93LmNvbnRyb2xsZXIuY29udHJvbCA9IGNvbnRlbnRfc2xpZGVzaG93O1xuICAgICAgICAgICAgY29udGVudF9zbGlkZXNob3cuY29udHJvbGxlci5jb250cm9sID0gbWFpbl9zbGlkZXNob3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICQoICcuanMtc2xpZGVzaG93LXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAkKCAnLmpzLXNsaWRlc2hvdy1zd2lwZXInICkuZWFjaCggZnVuY3Rpb24oIGksIG9iaiApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICAgICAgdmlldyA9IG1lLmNsb3Nlc3QoICcuanMtc2xpZGVzaG93JyApLmF0dHIoICdkYXRhLXZpZXcnICk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0gPSBuZXcgU3dpcGVyKCBvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiB2aWV3LFxuICAgICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtc2xpZGVzaG93JyApLmZpbmQoICcuanMtbmV4dCcgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZU5leHQoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbG9zZXN0KCAnLmpzLXNsaWRlc2hvdycgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICQoICcuanMtcG9zdHMtc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICQoICcuanMtcG9zdHMtc3dpcGVyJyApLmVhY2goIGZ1bmN0aW9uKCBpLCBvYmogKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldID0gbmV3IFN3aXBlciggb2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA4MDAsXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbDogJy5qcy1uZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZFbDogJy5qcy1wcmV2JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1wb3N0cycgKS5maW5kKCAnLmpzLW5leHQnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVOZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1wb3N0cycgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ2FsbGVyeV90aHVtYm5haWwsXG4gICAgICAgICAgICBnYWxsZXJ5X3N3aXBlcjtcblxuICAgICAgICBpZiAoICQoICcuanMtdGh1bWJuYWlsLXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBnYWxsZXJ5X3RodW1ibmFpbCA9IG5ldyBTd2lwZXIoICcuanMtdGh1bWJuYWlsLXN3aXBlcicsIHtcbiAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICBzcGVlZDogODAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1nYWxsZXJ5LXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBnYWxsZXJ5X3N3aXBlciA9IG5ldyBTd2lwZXIoICcuanMtZ2FsbGVyeS1zd2lwZXInLCB7XG4gICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDgwMCxcbiAgICAgICAgICAgICAgICB0aHVtYnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyOiBnYWxsZXJ5X3RodW1ibmFpbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy10YWJzJyApICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICAkKCAnLmpzLXRhYnMnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGFicyA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgdGFicy5maW5kKCAnLnRhYnMtbmF2IGEnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBtZS5hdHRyKCAnaHJlZicgKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggdGFyZ2V0IClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBDbGljayBldmVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9KS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lICAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gbWUuYXR0ciggJ2hyZWYnICksXG4gICAgICAgICAgICAgICAgICAgIG5hdiAgICA9IHRhYnMuZmluZCggJy50YWJzLW5hdicgKSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQgID0gMzAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCAhIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmZpbmQoICdhJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggJy50YWJzLWl0ZW0uaXMtYWN0aXZlJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWRlT3V0KCBzcGVlZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFic1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggdGFyZ2V0IClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhZGVJbiggc3BlZWQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy10b2dnbGUnICkgKSB7XG4gICAgICAgICQoICcuanMtdG9nZ2xlJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSAgICAgPSAkKCB0aGlzICksIFxuICAgICAgICAgICAgICAgIHRhcmdldCA9IG1lLm5leHQoKTtcblxuICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNsaWRlVXAoIDIwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2xpZGVEb3duKCAyMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XHJcblxyXG5cdCQoIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCBpc19tZC5tYXRjaGVzICkge1xyXG5cdFx0XHQkKCAnaW5wdXRbdHlwZT1udW1iZXJdJyApLmJyYXZhZF9udW1iZXIoKTtcclxuICAgICAgICB9XHJcblx0fSk7XHJcblxyXG5cdCQoIGRvY3VtZW50LmJvZHkgKS5vbiggJ2FkZGVkX3RvX2NhcnQgdXBkYXRlZF93Y19kaXYnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICggaXNfbWQubWF0Y2hlcyApIHtcclxuXHRcdFx0JCggJy53b29jb21tZXJjZS1jYXJ0LWZvcm0gaW5wdXRbdHlwZT1udW1iZXJdJyApLmJyYXZhZF9udW1iZXIoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHQgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xyXG5cdFx0ICAgIH0sIDMwMCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KGpRdWVyeSkpO1xyXG4iXX0=
