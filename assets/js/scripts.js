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

    class SmoothScroll {
        constructor() {
            this.DOM            = { main: document.querySelector( '.site' ) };
            // the scrollable element
            // we translate this element when scrolling (y-axis)
            this.DOM.scrollable = this.DOM.main.querySelector( '.site-scroll' );
            
            // the items on the page
            this.items          = [];
            this.DOM.content    = this.DOM.main.querySelector( 'main' );
            [ ...this.DOM.content.querySelectorAll( '.parallax' ) ].forEach( item => this.items.push( new Item( item ) ) );

            // here we define which property will change as we scroll the page
            // in this case we will be translating on the y-axis
            // we interpolate between the previous and current value to achieve the smooth scrolling effect
            this.renderedStyles = {
                translationY: {
                    previous: 0, 
                    current: 0, 
                    ease: 0.1,
                    setValue: () => docScroll
                }
            };
            // set the body's height
            this.setSize();
            this.update();
            this.style();
            this.initEvents();

            // start the render loop
            requestAnimationFrame( () => this.render() );
        }
        update() {
            // sets the initial value (no interpolation) - translate the scroll value
            for ( const key in this.renderedStyles ) {
                this.renderedStyles[ key ].current = this.renderedStyles[ key ].previous = this.renderedStyles[ key ].setValue();   
            }   

            // translate the scrollable element
            this.layout();
        }
        layout() {
            this.DOM.scrollable.style.transform = `translate3d( 0, ${ -1 * this.renderedStyles.translationY.previous }px, 0 )`;
        }
        setSize() {
            // set the heigh of the body in order to keep the scrollbar on the page
            body.style.height = `${ this.DOM.scrollable.scrollHeight }px`;
        }
        style() {
            // the <main> needs to "stick" to the screen and not scroll
            // for that we set it to position fixed and overflow hidden 
            this.DOM.main.style.position = 'fixed';
            this.DOM.main.style.width    = this.DOM.main.style.height = '100%';
            this.DOM.main.style.top      = this.DOM.main.style.left = 0;
            this.DOM.main.style.overflow = 'hidden';
        }
        initEvents() {
            // on resize reset the body's height
            window.addEventListener('resize', () => this.setSize());
        }
        render() {
            // Get scrolling speed
            // Update lastScroll
            scrollingSpeed = Math.abs( docScroll - lastScroll );
            lastScroll     = docScroll;
            
            // update the current and interpolated values
            for ( const key in this.renderedStyles ) {
                this.renderedStyles[ key ].current  = this.renderedStyles[ key ].setValue();
                this.renderedStyles[ key ].previous = MathUtils.lerp( this.renderedStyles[ key ].previous, this.renderedStyles[ key ].current, this.renderedStyles[ key ].ease );    
            }

            // and translate the scrollable element
            this.layout();
            
            for ( const item of this.items ) {
                // if the item is inside the viewport call it's render function
                // this will update item's styles, based on the document scroll value and the item's position on the viewport
                if ( item.isVisible ) {
                    if ( item.insideViewport ) {
                        item.render();

                    } else {
                        item.insideViewport = true;
                        item.update();
                    }

                } else {
                    item.insideViewport = false;
                }
            }
            
            // loop
            requestAnimationFrame( () => this.render() );
        }
    }

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

    var slideshow = [];

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

        if ( $( '.js-slideshow-swiper' ).length ) {
            $( '.js-slideshow-swiper' ).each( function( i, obj ) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLmpzIiwiY29va2llcy5qcyIsIm5hdmlnYXRpb24uanMiLCJzY3JvbGxpbmcuanMiLCJjb21tZW50LmpzIiwiZmFxLmpzIiwiZmlsZS5qcyIsImdvb2dsZS1tYXAuanMiLCJudW1iZXIuanMiLCJzYWxlLXBvaW50cy5qcyIsInNjcm9sbC5qcyIsInNlYXJjaC5qcyIsInNlbGVjdC5qcyIsInNsaWRlc2hvdy5qcyIsInRhYnMuanMiLCJ0b2dnbGUuanMiLCJmdW5jdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNfeHMsIGlzX3NtLCBpc19tZCwgaXNfbGcsIGlzX3hsLCBpc194eGw7XG5cbmlmICggbWF0Y2hNZWRpYSApIHtcbiAgICB2YXIgaXNfeHMgID0gd2luZG93Lm1hdGNoTWVkaWEoICcobWluLXdpZHRoOiAwcHgpJyApLFxuICAgICAgICBpc19zbSAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDU3NnB4KScgKSxcbiAgICAgICAgaXNfbWQgID0gd2luZG93Lm1hdGNoTWVkaWEoICcobWluLXdpZHRoOiA3NjhweCknICksXG4gICAgICAgIGlzX2xnICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogOTkycHgpJyApLFxuICAgICAgICBpc194bCAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDEyMDBweCknICk7XG59XG4iLCIoZnVuY3Rpb24oJCkge1xuICAgIFxuICAgICQoIHdpbmRvdyApLm9uKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIHNlc3Npb25TdG9yYWdlICkge1xuICAgICAgICAgICAgdmFyIGNvb2tpZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oICdjb29raWVzJyApO1xuXG4gICAgICAgICAgICBpZiAoIGNvb2tpZSA9PSBudWxsIHx8IGNvb2tpZSA9PSAndHJ1ZScgKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSggJ2Nvb2tpZXMnLCAndHJ1ZScgKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCAnLmpzLWNvb2tpZXMnICkuYWRkQ2xhc3MoICdyZXZlYWwnICk7XG4gICAgICAgICAgICAgICAgfSwgNTAwICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvb2tpZSA9PSAnZmFsc2UnICkge1xuICAgICAgICAgICAgICAgICQoICcuanMtY29va2llcycgKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggJy5qcy1jb29raWVzIC5idG4nICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCAnY29va2llcycsICdmYWxzZScgKTtcblxuICAgICAgICAkKCAnLmpzLWNvb2tpZXMnICkucmVtb3ZlQ2xhc3MoICdyZXZlYWwnICk7XG5cbiAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCAnLmpzLWNvb2tpZXMnICkucmVtb3ZlKCk7XG4gICAgICAgIH0sIDUwMCApO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgbW9iaWxlICA9IHRydWUsXG4gICAgICAgIHRpbWVvdXQgPSBmYWxzZTtcblxuICAgICQoIHdpbmRvdyApLm9uKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzd2l0Y2hfbmF2KCk7XG4gICAgICAgIHNjcm9sbF9jbGFzc2VzKCk7XG4gICAgfSk7XG5cbiAgICAkKCB3aW5kb3cgKS5vbiggJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCAnLmpzLXNpdGUnICkuYWRkQ2xhc3MoICdpcy1yZXNpemUnICk7XG5cbiAgICAgICAgaWYgKCB0aW1lb3V0ID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSB0cnVlO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICdpcy1yZXNpemUnICk7XG4gICAgICAgICAgICB9LCAzMDAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaF9uYXYoKTtcbiAgICB9KTtcblxuICAgICQoIHdpbmRvdyApLm9uKCAnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNjcm9sbF9jbGFzc2VzKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxfY2xhc3NlcygpIHtcbiAgICAgICAgaWYgKCB3aW5kb3cuc2Nyb2xsWSA+PSAxMDAgKSB7XG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkuYWRkQ2xhc3MoICduYXYtc3RpY2t5JyApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICduYXYtc3RpY2t5JyApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3dpdGNoX25hdigpIHtcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzID09IHRydWUgJiYgbW9iaWxlID09IHRydWUgKSB7XG4gICAgICAgICAgICBtb2JpbGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCAkKCAnLmpzLXNpdGUnICkuaXMoICcubmF2LW9wZW5lZCcgKSApIHtcbiAgICAgICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICduYXYtb3BlbmVkJyApO1xuICAgICAgICAgICAgICAgICQoICcuanMtbmF2LW9wZW5lcicgKS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxZID0gJCggJ2JvZHknICkuY3NzKCAndG9wJyApO1xuXG4gICAgICAgICAgICAgICAgJCggJ2JvZHknICkucmVtb3ZlQXR0ciggJ3N0eWxlJyApO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKCAwLCBwYXJzZUludCggc2Nyb2xsWSB8fCAnMCcgKSAqIC0xICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoICcuanMtc2Vjb25kYXJ5LW5hdicgKVxuICAgICAgICAgICAgICAgIC5kZXRhY2goKVxuICAgICAgICAgICAgICAgIC5wcmVwZW5kVG8oICcuanMtaGVhZGVyID4gLmNvbnRhaW5lcicgKTtcblxuICAgICAgICAgICAgJCggJy5qcy1zaG9wLW5hdicgKVxuICAgICAgICAgICAgICAgIC5kZXRhY2goKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyggJy5qcy1wcmltYXJ5LW5hdicgKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBpc19sZy5tYXRjaGVzID09IGZhbHNlICYmIG1vYmlsZSA9PSBmYWxzZSApIHtcbiAgICAgICAgICAgIG1vYmlsZSA9IHRydWU7XG5cbiAgICAgICAgICAgICQoICcuanMtc2Vjb25kYXJ5LW5hdicgKVxuICAgICAgICAgICAgICAgIC5kZXRhY2goKVxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlciggJy5qcy1wcmltYXJ5LW5hdicgKTtcblxuICAgICAgICAgICAgJCggJy5qcy1zaG9wLW5hdicgKVxuICAgICAgICAgICAgICAgIC5kZXRhY2goKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyggJy5qcy1uYXYnICk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCAnLnNpdGUnICkuYWRkQ2xhc3MoICdpcy1zaG93bicgKTtcbiAgICAgICAgaWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKCAnLmpzLW5hdi1vcGVuZXInICkub24oICdjbGljaycsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnbmF2LW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgJCggJy5qcy1uYXYgLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgbWVcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLnN1Yi1tZW51JyApXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCAyMDAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2Nyb2xsWSA9ICQoICdib2R5JyApLmNzcyggJ3RvcCcgKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coIHNjcm9sbFkgKTtcblxuICAgICAgICAgICAgJCggJ2JvZHknICkucmVtb3ZlQXR0ciggJ3N0eWxlJyApO1xuICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUF0dHIoICdzdHlsZScgKTtcblxuICAgICAgICAgICAgLy8gd2luZG93LnNjcm9sbFRvKCAwLCBwYXJzZUludCggc2Nyb2xsWSB8fCAnMCcgKSAqIC0xICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkuYWRkQ2xhc3MoICduYXYtb3BlbmVkJyApO1xuXG4gICAgICAgICAgICAvLyAkKCAnYm9keScgKVxuICAgICAgICAgICAgLy8gICAgIC5jc3Moe1xuICAgICAgICAgICAgLy8gICAgICAgICAncG9zaXRpb24nIDogJ2ZpeGVkJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgJ3RvcCc6ICctJyArIHdpbmRvdy5zY3JvbGxZICsgJ3B4J1xuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgJCggJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggTW9kZXJuaXpyLnRvdWNoZXZlbnRzICkge1xuICAgICAgICAgICAgdmFyIGxpbmsgPSAkKCB0aGlzICkucGFyZW50KCksXG4gICAgICAgICAgICAgICAgc3ViICA9IGxpbmsuZmluZCggJz4gLnN1Yi1tZW51JyApO1xuXG4gICAgICAgICAgICBpZiAoIGxpbmsuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgc3ViLnNsaWRlVXAoIDIwMCApO1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ3N1Yi1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGluay5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICBzdWIuc2xpZGVEb3duKCAyMDAgKTtcbiAgICAgICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkuYWRkQ2xhc3MoICdzdWItb3BlbmVkJyApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzID09IHRydWUgKSB7XG4gICAgICAgICAgICB2YXIgbGluayA9ICQoICcubWVudSAuaXMtYWN0aXZlJyApLFxuICAgICAgICAgICAgICAgIHN1YiAgPSBsaW5rLmZpbmQoICcuc3ViLW1lbnUnICk7XG5cbiAgICAgICAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICBzdWIuc2xpZGVVcCggMjAwICk7XG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICdzdWItb3BlbmVkJyApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCAnLmpzLWhlYWRlcicsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7XG4iLCJ2YXIgcGFnZVNjcm9sbDtcblxue1xuICAgIGNvbnN0IE1hdGhVdGlscyA9IHtcbiAgICAgICAgbWFwOiAoIHgsIGEsIGIsIGMsIGQgKSA9PiAoIHggLSBhICkgKiAoIGQgLSBjICkgLyAoIGIgLSBhICkgKyBjLFxuICAgICAgICBsZXJwOiAoIGEsIGIsIG4gKSA9PiAoIDEgLSBuICkgKiBhICsgbiAqIGIsXG4gICAgICAgIGdldFJhbmRvbUZsb2F0OiAoIG1pbiwgbWF4ICkgPT4gKCBNYXRoLnJhbmRvbSgpICogKCBtYXggLSBtaW4gKSArIG1pbiApLnRvRml4ZWQoIDIgKVxuICAgIH07XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBcbiAgICAvLyBjYWxjdWxhdGUgdGhlIHZpZXdwb3J0IHNpemVcbiAgICBsZXQgd2luc2l6ZTtcbiAgICBjb25zdCBjYWxjV2luc2l6ZSA9ICgpID0+IHdpbnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgfTtcbiAgICBjYWxjV2luc2l6ZSgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCBjYWxjV2luc2l6ZSApO1xuICAgIFxuICAgIC8vIHNjcm9sbCBwb3NpdGlvblxuICAgIGxldCBkb2NTY3JvbGw7XG4gICAgbGV0IGxhc3RTY3JvbGw7XG4gICAgbGV0IHNjcm9sbGluZ1NwZWVkID0gMDtcblxuICAgIC8vIHNjcm9sbCBwb3NpdGlvbiB1cGRhdGUgZnVuY3Rpb25cbiAgICBjb25zdCBnZXRQYWdlWVNjcm9sbCA9ICgpID0+IGRvY1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgZ2V0UGFnZVlTY3JvbGwgKTtcblxuICAgIGNsYXNzIEl0ZW0ge1xuICAgICAgICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgICAgICAgICB0aGlzLkRPTSAgICAgICAgICAgICAgPSB7IGVsOiBlbCB9O1xuICAgICAgICAgICAgdGhpcy5ET00uaW1hZ2UgICAgICAgID0gdGhpcy5ET00uZWwucXVlcnlTZWxlY3RvciggJy5wYXJhbGxheC1pbWFnZScgKTtcbiAgICAgICAgICAgIHRoaXMuRE9NLmltYWdlV3JhcHBlciA9IHRoaXMuRE9NLmltYWdlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB0aGlzLkRPTS50aXRsZSAgICAgICAgPSB0aGlzLkRPTS5lbC5xdWVyeVNlbGVjdG9yKCAnLnBhcmFsbGF4LXRpdGxlJyApO1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgd2UgZGVmaW5lIHdoaWNoIHByb3BlcnR5IHdpbGwgY2hhbmdlIGFzIHdlIHNjcm9sbCB0aGUgcGFnZSBhbmQgdGhlIGl0ZW0gaXMgaW5zaWRlIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB3ZSB3aWxsIGJlOlxuICAgICAgICAgICAgICAgIC8vIC0gc2NhbGluZyB0aGUgaW5uZXIgaW1hZ2VcbiAgICAgICAgICAgICAgICAvLyAtIHRyYW5zbGF0aW5nIHRoZSBpdGVtJ3MgdGl0bGVcbiAgICAgICAgICAgICAgICAvLyB3ZSBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZSB0byBhY2hpZXZlIGEgc21vb3RoIGVmZmVjdFxuICAgICAgICAgICAgICAgIGltYWdlVHJhbnNsYXRpb25ZOiB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzOiAwLCBcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogMCwgXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IDAuMSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbVZhbHVlOiAtMTAwLFxuICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZnJvbVZhbHVlID0gdGhpcy5yZW5kZXJlZFN0eWxlcy5pbWFnZVRyYW5zbGF0aW9uWS5mcm9tVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b1ZhbHVlICAgPSAtMSAqIGZyb21WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCAgICAgICA9IE1hdGhVdGlscy5tYXAoIHRoaXMucHJvcHMudG9wIC0gZG9jU2Nyb2xsLCB3aW5zaXplLmhlaWdodCwgLTEgKiB0aGlzLnByb3BzLmhlaWdodCwgZnJvbVZhbHVlLCB0b1ZhbHVlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tVmFsdWUgPCAwID8gTWF0aC5taW4oIE1hdGgubWF4KCB2YWwsIGZyb21WYWx1ZSApLCB0b1ZhbHVlICkgOiBNYXRoLm1heCggTWF0aC5taW4oIHZhbCwgZnJvbVZhbHVlICksIHRvVmFsdWUgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldHMgdGhlIGl0ZW0ncyBoZWlnaHQgYW5kIHRvcCAocmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50KVxuICAgICAgICAgICAgdGhpcy5nZXRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAvLyB1c2UgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIEFQSSB0byBjaGVjayB3aGVuIHRoZSBlbGVtZW50IGlzIGluc2lkZSB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIG9ubHkgdGhlbiB0aGUgZWxlbWVudCBzdHlsZXMgd2lsbCBiZSB1cGRhdGVkXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKCAoIGVudHJpZXMgKSA9PiB7XG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKCBlbnRyeSA9PiB0aGlzLmlzVmlzaWJsZSA9IGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gMCApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUoIHRoaXMuRE9NLmVsICk7XG4gICAgICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICAvLyBzZXRzIHRoZSBpbml0aWFsIHZhbHVlIChubyBpbnRlcnBvbGF0aW9uKVxuICAgICAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHRoaXMucmVuZGVyZWRTdHlsZXMgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uc2V0VmFsdWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXBwbHkgY2hhbmdlcy9zdHlsZXNcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLkRPTS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgLy8gaXRlbSdzIGhlaWdodFxuICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgLy8gb2Zmc2V0IHRvcCByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICB0b3A6IGRvY1Njcm9sbCArIHJlY3QudG9wXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGluaXRFdmVudHMoKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsICgpID0+IHRoaXMucmVzaXplKCkgKTtcbiAgICAgICAgfVxuICAgICAgICByZXNpemUoKSB7XG4gICAgICAgICAgICAvLyBnZXRzIHRoZSBpdGVtJ3MgaGVpZ2h0IGFuZCB0b3AgKHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudClcbiAgICAgICAgICAgIHRoaXMuZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgLy8gb24gcmVzaXplIHJlc2V0IHNpemVzIGFuZCB1cGRhdGUgc3R5bGVzXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCBhbmQgaW50ZXJwb2xhdGVkIHZhbHVlc1xuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgICBmb3IgKCBjb25zdCBrZXkgaW4gdGhpcy5yZW5kZXJlZFN0eWxlcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50ID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uc2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5wcmV2aW91cyA9IE1hdGhVdGlscy5sZXJwKCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5wcmV2aW91cywgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCwgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uZWFzZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBhbmQgYXBwbHkgY2hhbmdlc1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsYXlvdXQoKSB7XG4gICAgICAgICAgICAvLyBpbWFnZVxuICAgICAgICAgICAgdGhpcy5ET00uaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCAwLCAkeyB0aGlzLnJlbmRlcmVkU3R5bGVzLmltYWdlVHJhbnNsYXRpb25ZLnByZXZpb3VzIH1weCwgMCApYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFNtb290aFNjcm9sbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5ET00gICAgICAgICAgICA9IHsgbWFpbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5zaXRlJyApIH07XG4gICAgICAgICAgICAvLyB0aGUgc2Nyb2xsYWJsZSBlbGVtZW50XG4gICAgICAgICAgICAvLyB3ZSB0cmFuc2xhdGUgdGhpcyBlbGVtZW50IHdoZW4gc2Nyb2xsaW5nICh5LWF4aXMpXG4gICAgICAgICAgICB0aGlzLkRPTS5zY3JvbGxhYmxlID0gdGhpcy5ET00ubWFpbi5xdWVyeVNlbGVjdG9yKCAnLnNpdGUtc2Nyb2xsJyApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0aGUgaXRlbXMgb24gdGhlIHBhZ2VcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuRE9NLmNvbnRlbnQgICAgPSB0aGlzLkRPTS5tYWluLnF1ZXJ5U2VsZWN0b3IoICdtYWluJyApO1xuICAgICAgICAgICAgWyAuLi50aGlzLkRPTS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcucGFyYWxsYXgnICkgXS5mb3JFYWNoKCBpdGVtID0+IHRoaXMuaXRlbXMucHVzaCggbmV3IEl0ZW0oIGl0ZW0gKSApICk7XG5cbiAgICAgICAgICAgIC8vIGhlcmUgd2UgZGVmaW5lIHdoaWNoIHByb3BlcnR5IHdpbGwgY2hhbmdlIGFzIHdlIHNjcm9sbCB0aGUgcGFnZVxuICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHdlIHdpbGwgYmUgdHJhbnNsYXRpbmcgb24gdGhlIHktYXhpc1xuICAgICAgICAgICAgLy8gd2UgaW50ZXJwb2xhdGUgYmV0d2VlbiB0aGUgcHJldmlvdXMgYW5kIGN1cnJlbnQgdmFsdWUgdG8gYWNoaWV2ZSB0aGUgc21vb3RoIHNjcm9sbGluZyBlZmZlY3RcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25ZOiB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzOiAwLCBcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogMCwgXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IDAuMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWU6ICgpID0+IGRvY1Njcm9sbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGJvZHkncyBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcmVuZGVyIGxvb3BcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4gdGhpcy5yZW5kZXIoKSApO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIC8vIHNldHMgdGhlIGluaXRpYWwgdmFsdWUgKG5vIGludGVycG9sYXRpb24pIC0gdHJhbnNsYXRlIHRoZSBzY3JvbGwgdmFsdWVcbiAgICAgICAgICAgIGZvciAoIGNvbnN0IGtleSBpbiB0aGlzLnJlbmRlcmVkU3R5bGVzICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5wcmV2aW91cyA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnNldFZhbHVlKCk7ICAgXG4gICAgICAgICAgICB9ICAgXG5cbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgc2Nyb2xsYWJsZSBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxheW91dCgpIHtcbiAgICAgICAgICAgIHRoaXMuRE9NLnNjcm9sbGFibGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCAwLCAkeyAtMSAqIHRoaXMucmVuZGVyZWRTdHlsZXMudHJhbnNsYXRpb25ZLnByZXZpb3VzIH1weCwgMCApYDtcbiAgICAgICAgfVxuICAgICAgICBzZXRTaXplKCkge1xuICAgICAgICAgICAgLy8gc2V0IHRoZSBoZWlnaCBvZiB0aGUgYm9keSBpbiBvcmRlciB0byBrZWVwIHRoZSBzY3JvbGxiYXIgb24gdGhlIHBhZ2VcbiAgICAgICAgICAgIGJvZHkuc3R5bGUuaGVpZ2h0ID0gYCR7IHRoaXMuRE9NLnNjcm9sbGFibGUuc2Nyb2xsSGVpZ2h0IH1weGA7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGUoKSB7XG4gICAgICAgICAgICAvLyB0aGUgPG1haW4+IG5lZWRzIHRvIFwic3RpY2tcIiB0byB0aGUgc2NyZWVuIGFuZCBub3Qgc2Nyb2xsXG4gICAgICAgICAgICAvLyBmb3IgdGhhdCB3ZSBzZXQgaXQgdG8gcG9zaXRpb24gZml4ZWQgYW5kIG92ZXJmbG93IGhpZGRlbiBcbiAgICAgICAgICAgIHRoaXMuRE9NLm1haW4uc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICAgICAgdGhpcy5ET00ubWFpbi5zdHlsZS53aWR0aCAgICA9IHRoaXMuRE9NLm1haW4uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICAgICAgdGhpcy5ET00ubWFpbi5zdHlsZS50b3AgICAgICA9IHRoaXMuRE9NLm1haW4uc3R5bGUubGVmdCA9IDA7XG4gICAgICAgICAgICB0aGlzLkRPTS5tYWluLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIH1cbiAgICAgICAgaW5pdEV2ZW50cygpIHtcbiAgICAgICAgICAgIC8vIG9uIHJlc2l6ZSByZXNldCB0aGUgYm9keSdzIGhlaWdodFxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHRoaXMuc2V0U2l6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgICAvLyBHZXQgc2Nyb2xsaW5nIHNwZWVkXG4gICAgICAgICAgICAvLyBVcGRhdGUgbGFzdFNjcm9sbFxuICAgICAgICAgICAgc2Nyb2xsaW5nU3BlZWQgPSBNYXRoLmFicyggZG9jU2Nyb2xsIC0gbGFzdFNjcm9sbCApO1xuICAgICAgICAgICAgbGFzdFNjcm9sbCAgICAgPSBkb2NTY3JvbGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCBhbmQgaW50ZXJwb2xhdGVkIHZhbHVlc1xuICAgICAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHRoaXMucmVuZGVyZWRTdHlsZXMgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCAgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5zZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzID0gTWF0aFV0aWxzLmxlcnAoIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzLCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50LCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5lYXNlICk7ICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhbmQgdHJhbnNsYXRlIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoIGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtcyApIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgaXRlbSBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0IGNhbGwgaXQncyByZW5kZXIgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgdXBkYXRlIGl0ZW0ncyBzdHlsZXMsIGJhc2VkIG9uIHRoZSBkb2N1bWVudCBzY3JvbGwgdmFsdWUgYW5kIHRoZSBpdGVtJ3MgcG9zaXRpb24gb24gdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLmlzVmlzaWJsZSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpdGVtLmluc2lkZVZpZXdwb3J0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW5kZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pbnNpZGVWaWV3cG9ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmluc2lkZVZpZXdwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBsb29wXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHRoaXMucmVuZGVyKCkgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByZWxvYWRJbWFnZXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiB7XG4gICAgICAgICAgICBpbWFnZXNMb2FkZWQoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcucGFyYWxsYXgtaW1nJyApLCB7IGJhY2tncm91bmQ6IHRydWUgfSwgcmVzb2x2ZSApO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIHByZWxvYWRJbWFnZXMoKS50aGVuKCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSggJ2lzLWxvYWRpbmcnICk7XG4gICAgICAgIGdldFBhZ2VZU2Nyb2xsKCk7XG4gICAgICAgIGxhc3RTY3JvbGwgPSBkb2NTY3JvbGw7XG5cbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzICYmIGpRdWVyeSggJ2JvZHknICkuaXMoICcuaGFzLXBhcmFsbGF4JyApICkge1xuICAgICAgICAgICAgcGFnZVNjcm9sbCA9IG5ldyBTbW9vdGhTY3JvbGwoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy1yZXBseScgKSApIHtcbiAgICAgICAgJCggJy5qcy1yZXBseScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbWUgXHQgICAgPSAkKCB0aGlzICksXG5cdFx0XHRcdGNvbW1lbnQgPSBtZS5jbG9zZXN0KCAnLmNvbW1lbnQnICksXG5cdFx0XHRcdG5hbWUgICAgPSBjb21tZW50LmF0dHIoICdkYXRhLW5hbWUnICksXG5cdFx0XHRcdHBhcmVudCAgPSBjb21tZW50LmF0dHIoICdkYXRhLXBhcmVudCcgKSxcblx0XHRcdFx0cmVwbHkgICA9ICQoICcuanMtY29tbWVudC1yZXBseScgKTtcblxuICAgICAgICAgICAgJCggJyNmdF81ZjhkYjVmMzI2NzM1JyApLnZhbCggcGFyZW50ICk7XG5cbiAgICAgICAgICAgIHBhZ2Vfc2Nyb2xsKCByZXBseSApO1xuXG4gICAgICAgICAgIFx0JCggJzxkaXYgY2xhc3M9XCJhbGVydCBpcy1pbmZvXCI+JyArIHJlcGx5LmF0dHIoICdkYXRhLXJlcGx5JyApICsgJyAnICsgbmFtZSArICcgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNsb3NlIGpzLXJlc2V0LXJlcGx5XCI+JnRpbWVzOzwvYT48L2Rpdj4nICkuaW5zZXJ0QWZ0ZXIoIHJlcGx5LmZpbmQoICdoMycgKSApO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXHQkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCAnLmpzLXJlc2V0LXJlcGx5JywgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG1lIFx0ICA9ICQoIHRoaXMgKSxcblx0XHRcdHJlcGx5ID0gbWUuY2xvc2VzdCggJy5hbGVydCcgKTtcblxuXHRcdCQoICcjZnRfNWY4ZGI1ZjMyNjczNScgKS52YWwoICcwJyApO1xuXG5cdFx0cmVwbHkuZmFkZU91dCggMzAwLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoIHRoaXMgKS5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cbiAgICBmdW5jdGlvbiBwYWdlX3Njcm9sbCggYW5jaG9yICkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gJCggJy5qcy1oZWFkZXInICkub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICggaXNfbGcubWF0Y2hlcyApIHtcbiAgICAgICAgICAgIG9mZnNldCA9ICQoICcuanMtaG9sZGVyJyApLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCAnaHRtbCwgYm9keScgKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogYW5jaG9yLm9mZnNldCgpLnRvcCAtIG9mZnNldFxuICAgICAgICB9LCA4MDAgKTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnLmpzLWZhcScgKSApIHtcbiAgICAgICAgJCggJy5qcy1mYXEnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApLmNsb3Nlc3QoICcuZmFxLWl0ZW0nICk7XG5cbiAgICAgICAgICAgIGlmICggbWUuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgICAgIG1lLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIG1lLmZpbmQoICcuZmFxLWFuc3dlcicgKS5zbGlkZVVwKCAyMDAgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICBtZS5maW5kKCAnLmZhcS1hbnN3ZXInICkuc2xpZGVEb3duKCAyMDAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJ2lucHV0W3R5cGU9ZmlsZV0nICkgKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEluaXRcbiAgICAgICAgICovXG4gICAgICAgICQoICdpbnB1dFt0eXBlPWZpbGVdJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICBpbnB1dC53cmFwKCAnPGRpdiBjbGFzcz1cImZpbGVcIj48L2Rpdj4nICk7XG5cbiAgICAgICAgICAgIHZhciBmaWxlICAgICAgICA9IGlucHV0LmNsb3Nlc3QoICcuZmlsZScgKSxcbiAgICAgICAgICAgICAgICBsYWJlbCAgICAgICA9IGlucHV0LmF0dHIoICdkYXRhLWxhYmVsJyApLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gaW5wdXQuYXR0ciggJ2RhdGEtcGxhY2Vob2xkZXInICk7XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIGxhYmVsID09PSAndW5kZWZpbmVkJyB8fCBsYWJlbCA9PSAnJyApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9ICdQYXJjb3VyaXInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBwbGFjZWhvbGRlciA9PT0gJ3VuZGVmaW5lZCcgfHwgcGxhY2Vob2xkZXIgPT0gJycgKSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpbnB1dC5pcyggJzpkaXNhYmxlZCcgKSApIHtcbiAgICAgICAgICAgICAgICBmaWxlLmFkZENsYXNzKCAnaXMtZGlzYWJsZWQnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpbGUucHJlcGVuZCggJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhcmtcIj4nICsgbGFiZWwgKyAnPC9idXR0b24+PGRpdiBjbGFzcz1cImZpbGUtc2VsZWN0ZWRcIj4nICsgcGxhY2Vob2xkZXIgKyAnPC9kaXY+JyApO1xuICAgICAgICAgICAgZmlsZS5hcHBlbmQoICc8YSBjbGFzcz1cImZpbGUtcmVtb3ZlIGpzLWZpbGUtcmVtb3ZlXCI+JnRpbWVzOzwvYT4nICk7XG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgKiBCcm93c2UgYnV0dG9uIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmZpbGUnICkuZmluZCggJ2J1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYnRuICAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgZmlsZSAgPSBidG4uY2xvc2VzdCggJy5maWxlJyApLFxuICAgICAgICAgICAgICAgIGlucHV0ID0gZmlsZS5maW5kKCAnaW5wdXQnICk7XG5cbiAgICAgICAgICAgIGlucHV0LmNsaWNrKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBSZW1vdmUgYnV0dG9uIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmZpbGUnICkuZmluZCggJy5qcy1maWxlLXJlbW92ZScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYnRuICAgICAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgZmlsZSAgICAgPSBidG4uY2xvc2VzdCggJy5maWxlJyApLFxuICAgICAgICAgICAgICAgIGlucHV0ICAgID0gZmlsZS5maW5kKCAnaW5wdXQnICksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmaWxlLmZpbmQoICcuZmlsZS1zZWxlY3RlZCcgKTtcblxuICAgICAgICAgICAgaW5wdXQudmFsKCAnJyApLmNoYW5nZSgpO1xuXG4gICAgICAgICAgICBzZWxlY3RlZC50ZXh0KCBpbnB1dC5hdHRyKCAnZGF0YS1wbGFjZWhvbGRlcicgKSApO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogQ2hhbmdlIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmZpbGUnICkuZmluZCggJ2lucHV0JyApLm9uKCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgICAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgZmlsZSAgICAgPSBpbnB1dC5jbG9zZXN0KCAnLmZpbGUnICksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmaWxlLmZpbmQoICcuZmlsZS1zZWxlY3RlZCcgKTtcblxuICAgICAgICAgICAgaWYoIGlucHV0LnZhbCgpICE9PSAnJyApIHtcbiAgICAgICAgICAgICAgICBmaWxlLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuYW1lcyA9ICcnO1xuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgaW5wdXQuZ2V0KDApLmZpbGVzLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgICAgIGlmICggaSA+IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzICs9ICcsICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWVzICs9IGlucHV0LmdldCgwKS5maWxlc1tpXS5uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3RlZC50ZXh0KCBuYW1lcyApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgdmFyIG1hcCxcbiAgICBpbmZvX3dpbmRvd3MgPSBbXSxcbiAgICBlbGVtZW50cyAgICAgPSBbXSxcbiAgICBpY29uICAgICAgICAgPSBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9hc3NldHMvaW1nL3Bpbi5zdmcnO1xuXG4gICAgZnVuY3Rpb24gbmV3X21hcCggJGVsICkge1xuICAgICAgICB2YXIgJG1hcmtlcnMgPSAkZWwuZmluZCggJy5qcy1tYXJrZXInICk7XG5cbiAgICAgICAgdmFyIHN0eWxlZE1hcFR5cGUgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWY1ZjVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjE2MTYxXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjVmNWY1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2JkYmRiZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNzU3NTc1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlNWU1ZTVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzc1NzU3NVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2RhZGFkYVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjE2MTYxXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5saW5lXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZTVlNWU1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZWVlZWVlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNjOWM5YzlcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHtuYW1lOiAnU3R5bGVkIE1hcCd9KTtcblxudmFyIGFyZ3MgPSB7XG4gICAgem9vbSA6IDE0LFxuICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMCwgMCksXG4gICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgc2Nyb2xsd2hlZWwgOiBmYWxzZSxcbiAgICBwYW5Db250cm9sIDogZmFsc2UsXG4gICAgcGFuQ29udHJvbE9wdGlvbnMgOiB7XG4gICAgICAgIHBvc2l0aW9uIDogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVFxuICAgIH0sXG4gICAgem9vbUNvbnRyb2wgOiB0cnVlLFxuICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICBzdHlsZSA6IGdvb2dsZS5tYXBzLlpvb21Db250cm9sU3R5bGUuTEFSR0UsXG4gICAgICAgIHBvc2l0aW9uIDogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVFxuICAgIH0sXG4gICAgbWFwVHlwZUNvbnRyb2wgOiBmYWxzZSxcbiAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnMgOiB7XG4gICAgICAgIG1hcFR5cGVJZHMgOiBbZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsICdzdHlsZWRfbWFwJ11cbiAgICB9LFxuICAgIGRyYWdnYWJsZSA6IHRydWUsXG4gICAgZGlzYWJsZURlZmF1bHRVSSA6IHRydWVcbn07XG5cbm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoICRlbFswXSwgYXJncyApO1xuXG5tYXAubWFwVHlwZXMuc2V0KCAnc3R5bGVkX21hcCcsIHN0eWxlZE1hcFR5cGUgKTtcbm1hcC5zZXRNYXBUeXBlSWQoICdzdHlsZWRfbWFwJyApO1xuXG5tYXAubWFya2VycyA9IFtdO1xuZWxlbWVudHMgPSBbXTtcblxuJG1hcmtlcnMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgdmFyIGVsZW1lbnQgPSB7XG4gICAgICAgICdfaWQnOiBwYXJzZUludCggbWUuYXR0ciggJ2RhdGEtaWQnICkgKSxcbiAgICAgICAgJ190aXRsZSc6IG1lLmF0dHIoICdkYXRhLXRpdGxlJyApLFxuICAgICAgICAnX2FkZHJlc3MnOiBtZS5hdHRyKCAnZGF0YS1hZGRyZXNzJyApLFxuICAgICAgICAnX2VtYWlsJzogbWUuYXR0ciggJ2RhdGEtZW1haWwnICksXG4gICAgICAgICdfcGhvbmUnOiBtZS5hdHRyKCAnZGF0YS1waG9uZScgKSxcbiAgICAgICAgJ19sYXQnOiBtZS5hdHRyKCAnZGF0YS1sYXQnICksXG4gICAgICAgICdfbG5nJzogbWUuYXR0ciggJ2RhdGEtbG5nJyApXG4gICAgfTtcblxuICAgIGVsZW1lbnRzLnB1c2goIGVsZW1lbnQgKTtcbn0pO1xuXG4kbWFya2Vycy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICBhZGRfbWFya2VyKCBtZSwgbWFwICk7XG59KTtcblxuY2VudGVyX21hcCggbWFwICk7XG5cbnJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIGFkZF9tYXJrZXIoICRtYXJrZXIsIG1hcCApIHtcbiAgICB2YXIgbGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggJG1hcmtlci5hdHRyKCAnZGF0YS1sYXQnICksICRtYXJrZXIuYXR0ciggJ2RhdGEtbG5nJyApICk7XG5cbiAgICB2YXIgcGluID0ge1xuICAgICAgICB1cmw6IGJyYXZhZC50ZW1wbGF0ZV91cmwgKyAnL2Fzc2V0cy9pbWcvcGluLnN2ZycsXG4gICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKCA0NSwgNTQgKSxcbiAgICAgICAgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoIDQ1LCA1NCApLFxuICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCggMjIsIDU0IClcbiAgICB9O1xuXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbiA6IGxhdGxuZyxcbiAgICAgICAgbWFwIDogbWFwLFxuICAgICAgICBpY29uIDogcGluXG4gICAgfSk7XG5cbiAgICBtYXAubWFya2Vycy5wdXNoKCBtYXJrZXIgKTtcblxuICAgIHZhciBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuICAgICAgICBjb250ZW50IDogJG1hcmtlci5odG1sKClcbiAgICB9KTtcblxuICAgIGluZm9fd2luZG93cy5wdXNoKCBpbmZvd2luZG93ICk7XG5cbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lciggbWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xvc2VfaW5mb3dpbmRvdygpO1xuXG4gICAgICAgIGluZm93aW5kb3cub3BlbiggbWFwLCBtYXJrZXIgKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2xvc2VfaW5mb3dpbmRvdygpIHtcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaW5mb193aW5kb3dzW2ldLmNsb3NlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjZW50ZXJfbWFwKCBtYXAgKSB7XG4gICAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcblxuICAgICQuZWFjaCggbWFwLm1hcmtlcnMsIGZ1bmN0aW9uKCBpLCBtYXJrZXIgKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBtYXJrZXIucG9zaXRpb24ubGF0KCksIG1hcmtlci5wb3NpdGlvbi5sbmcoKSApO1xuXG4gICAgICAgIGJvdW5kcy5leHRlbmQoIGxhdGxuZyApO1xuICAgIH0pO1xuXG4gICAgaWYgKCBtYXAubWFya2Vycy5sZW5ndGggPT0gMSApIHtcbiAgICAgICAgbWFwLnNldENlbnRlciggYm91bmRzLmdldENlbnRlcigpICk7XG4gICAgICAgIG1hcC5zZXRab29tKCAxNSApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmZpdEJvdW5kcyggYm91bmRzICk7XG4gICAgfVxufVxuXG5tYXAgPSBudWxsO1xuXG4kKCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAkKCAnLmpzLW1hcCcgKS5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICBtYXAgPSBuZXdfbWFwKCAkKCB0aGlzICkgKTtcbiAgICB9KTtcbn0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQuZm4uYnJhdmFkX251bWJlciA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBjdXJyX3ZhbCA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkX21pbnVzLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkX3BsdXM7XG5cbiAgICAgICAgICAgIGlucHV0LndyYXAoICc8ZGl2IGNsYXNzPVwibnVtYmVyIGpzLW51bWJlclwiPjwvZGl2PicgKTtcblxuICAgICAgICAgICAgdmFyIG51bWJlciA9IGlucHV0LmNsb3Nlc3QoICcuanMtbnVtYmVyJyApO1xuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmF0dHIoICdkYXRhLXBvc2l0aW9uJyApID09ICdsZWZ0JyApIHtcbiAgICAgICAgICAgICAgICBudW1iZXIuYWRkQ2xhc3MoICdudW1iZXItbGVmdCcgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpbnB1dC5pcyggJzpkaXNhYmxlZCcgKSApIHtcbiAgICAgICAgICAgICAgICBudW1iZXIuYWRkQ2xhc3MoICdpcy1kaXNhYmxlZCcgKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9taW51cyA9ICdkaXNhYmxlZD1cImRpc2FibGVkXCInO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkX3BsdXMgID0gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIGN1cnJfdmFsIDw9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICkgKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfbWludXMgPSAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBjdXJyX3ZhbCA+PSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21heCcgKSApICkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVkX3BsdXMgPSAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIEFwcGVuZCBidXR0b25zIHRvIHRoZSB3cmFwcGVyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG51bWJlci5wcmVwZW5kKCAnPGJ1dHRvbiBjbGFzcz1cIm51bWJlci1taW51c1wiJyArIGRpc2FibGVkX21pbnVzICsgJz4tPC9idXR0b24+JyApO1xuICAgICAgICAgICAgbnVtYmVyLmFwcGVuZCggJzxidXR0b24gY2xhc3M9XCJudW1iZXItcGx1c1wiJyArIGRpc2FibGVkX3BsdXMgKyAnPis8L2J1dHRvbj4nICk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogTWludXMgYnV0dG9uIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmpzLW51bWJlcicgKS5maW5kKCAnLm51bWJlci1taW51cycgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYnRuICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIG51bWJlciA9IGJ0bi5jbG9zZXN0KCAnLm51bWJlcicgKSxcbiAgICAgICAgICAgICAgICBpbnB1dCAgPSBudW1iZXIuZmluZCggJ2lucHV0JyApLFxuICAgICAgICAgICAgICAgIHZhbCAgICA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIHN0ZXAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnc3RlcCcgKSApLFxuICAgICAgICAgICAgICAgIG1pbiAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICksXG4gICAgICAgICAgICAgICAgbWF4ICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtYXgnICkgKSxcbiAgICAgICAgICAgICAgICBuZXdfdmFsO1xuXG4gICAgICAgICAgICBuZXdfdmFsID0gdmFsIC0gc3RlcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaW5wdXRcbiAgICAgICAgICAgICAgICAudmFsKCBuZXdfdmFsIClcbiAgICAgICAgICAgICAgICAuY2hhbmdlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBQbHVzIGJ1dHRvbiBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5qcy1udW1iZXInICkuZmluZCggJy5udW1iZXItcGx1cycgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYnRuICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIG51bWJlciA9IGJ0bi5jbG9zZXN0KCAnLm51bWJlcicgKSxcbiAgICAgICAgICAgICAgICBpbnB1dCAgPSBudW1iZXIuZmluZCggJ2lucHV0JyApLFxuICAgICAgICAgICAgICAgIHZhbCAgICA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIHN0ZXAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnc3RlcCcgKSApLFxuICAgICAgICAgICAgICAgIG1pbiAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICksXG4gICAgICAgICAgICAgICAgbWF4ICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtYXgnICkgKSxcbiAgICAgICAgICAgICAgICBuZXdfdmFsO1xuXG4gICAgICAgICAgICBuZXdfdmFsID0gdmFsICsgc3RlcDtcblxuICAgICAgICAgICAgaW5wdXRcbiAgICAgICAgICAgICAgICAudmFsKCBuZXdfdmFsIClcbiAgICAgICAgICAgICAgICAuY2hhbmdlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDaGFuZ2UgZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuanMtbnVtYmVyJyApLmZpbmQoICdpbnB1dCcgKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBpbnB1dC5jbG9zZXN0KCAnLm51bWJlcicgKSxcbiAgICAgICAgICAgICAgICB2YWwgICAgPSBwYXJzZUludCggaW5wdXQudmFsKCkgKSxcbiAgICAgICAgICAgICAgICBtaW4gICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21pbicgKSApLFxuICAgICAgICAgICAgICAgIG1heCAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWF4JyApICk7XG5cbiAgICAgICAgICAgIGlmICggdmFsID49IG1heCApIHtcbiAgICAgICAgICAgICAgICBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcubnVtYmVyLXBsdXMnIClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoICdkaXNhYmxlZCcsIHRydWUgKTtcblxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCggbWF4ICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLm51bWJlci1wbHVzJyApXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCAnZGlzYWJsZWQnLCBmYWxzZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHZhbCA8PSBtaW4gKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLm51bWJlci1taW51cycgKVxuICAgICAgICAgICAgICAgICAgICAucHJvcCggJ2Rpc2FibGVkJywgdHJ1ZSApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoIG1pbiApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAuZmluZCggJy5udW1iZXItbWludXMnIClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoICdkaXNhYmxlZCcsIGZhbHNlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgdmFyIG1hcCxcbiAgICAgICAgaW5mb3dpbmRvdyAgID0gbnVsbCxcbiAgICAgICAgZWxlbWVudHMgICAgID0gW10sXG4gICAgICAgIHZfZWxlbWVudHMgICA9IFtdLFxuICAgICAgICBzdGFydF9wb3MgICAgPSAnJyxcbiAgICAgICAgbG9hZGVyICAgICAgID0gJCggJy5qcy1zYWxlLWxvYWRlcicgKSxcbiAgICAgICAgaWNvbiAgICAgICAgID0gYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4uc3ZnJztcblxuICAgIGZ1bmN0aW9uIG5ld19tYXAoICRlbCApIHtcbiAgICAgICAgdmFyIHN0eWxlZE1hcFR5cGUgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWY1ZjVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjE2MTYxXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjVmNWY1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2JkYmRiZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNzU3NTc1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlNWU1ZTVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzc1NzU3NVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2RhZGFkYVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjE2MTYxXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5saW5lXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZTVlNWU1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZWVlZWVlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNjOWM5YzlcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHtuYW1lOiAnU3R5bGVkIE1hcCd9KTtcblxuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIHpvb20gOiAxNCxcbiAgICAgICAgICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIDQ1LjQxMTY4OTg1MDg2OTk5LCAtNzEuODkyNDI3NDI3MjAxNTMgKSxcbiAgICAgICAgICAgIG1hcFR5cGVJZCA6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgICAgc2Nyb2xsd2hlZWwgOiBmYWxzZSxcbiAgICAgICAgICAgIHBhbkNvbnRyb2wgOiBmYWxzZSxcbiAgICAgICAgICAgIHBhbkNvbnRyb2xPcHRpb25zIDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHpvb21Db250cm9sIDogdHJ1ZSxcbiAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHN0eWxlIDogZ29vZ2xlLm1hcHMuWm9vbUNvbnRyb2xTdHlsZS5MQVJHRSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfUklHSFRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbCA6IGZhbHNlLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zIDoge1xuICAgICAgICAgICAgICAgIG1hcFR5cGVJZHMgOiBbZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsICdzdHlsZWRfbWFwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxuICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRVSSA6IHRydWVcbiAgICAgICAgfTtcbiAgICAgXG4gICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoICRlbFswXSwgYXJncyApO1xuXG4gICAgICAgIG1hcC5tYXBUeXBlcy5zZXQoICdzdHlsZWRfbWFwJywgc3R5bGVkTWFwVHlwZSApO1xuICAgICAgICBtYXAuc2V0TWFwVHlwZUlkKCAnc3R5bGVkX21hcCcgKTtcblxuICAgICAgICB2YXIgcGluID0ge1xuICAgICAgICAgICAgdXJsOiBicmF2YWQudGVtcGxhdGVfdXJsICsgJy9hc3NldHMvaW1nL3Bpbi5zdmcnLFxuICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoIDMwLCAzNiApLFxuICAgICAgICAgICAgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoIDMwLCAzNiApLFxuICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoIDE1LCAzNiApXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgcG9zaXRpb24gOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCA0NS40MTE2ODk4NTA4Njk5OSwgLTcxLjg5MjQyNzQyNzIwMTUzICksXG4gICAgICAgICAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QLFxuICAgICAgICAgICAgbWFwIDogbWFwLFxuICAgICAgICAgICAgaWNvbiA6IHBpbixcbiAgICAgICAgICAgIHRpdGxlIDogYnJhdmFkLnNpdGVfdGl0bGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoIG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIGluZm93aW5kb3cgKSB7XG4gICAgICAgICAgICAgICAgaW5mb3dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29udGVudF9zdHIgPSAnPHA+PHN0cm9uZz4nICsgYnJhdmFkLnNpdGVfdGl0bGUgKyAnPC9zdHJvbmc+PC9wPic7XG5cbiAgICAgICAgICAgIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgICAgICAgICAgaW5mb3dpbmRvdy5zZXRDb250ZW50KCBjb250ZW50X3N0ciApO1xuICAgICAgICAgICAgaW5mb3dpbmRvdy5vcGVuKCBtYXAsIG1hcmtlciApO1xuICAgICAgICB9KTtcblxuICAgICAgICBtYXAubWFya2VycyA9IFtdO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGJyYXZhZC5hamF4X3VybCxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdnZXRfcG9pbnRzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiggZGF0YSwgdGV4dFN0YXR1cywganFYSFIgKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBkYXRhLmRhdGEubWFya2VycztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBlbGVtZW50cyApO1xuICAgICAgICAgICAgICAgIHJlbW92ZV9sb2FkZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfbWFya2VyKCBlbGVtZW50LCBtYXAgKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBlbGVtZW50LmxhdCwgZWxlbWVudC5sbmcgKSxcbiAgICAgICAgICAgIGljb247XG5cbiAgICAgICAgaWYgKCBlbGVtZW50LmNhdCAhPT0gJycgKSB7XG4gICAgICAgICAgICBpY29uID0gYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4tJyArIGVsZW1lbnQuY2F0ICsgJy5zdmcnO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpY29uID0gYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4uc3ZnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwaW4gPSB7XG4gICAgICAgICAgICB1cmw6IGljb24sXG4gICAgICAgICAgICBzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggMzAsIDM2ICksXG4gICAgICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggMzAsIDM2ICksXG4gICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCggMTUsIDM2IClcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGxhdGxuZyxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXG4gICAgICAgICAgICBtYXAgOiBtYXAsXG4gICAgICAgICAgICBpY29uIDogcGluLFxuICAgICAgICAgICAgdGl0bGUgOiBlbGVtZW50LnRpdGxlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hcC5tYXJrZXJzLnB1c2goIG1hcmtlciApO1xuICAgICAgICB2X2VsZW1lbnRzLnB1c2goIGVsZW1lbnQuY2F0ICk7XG5cbiAgICAgICAgJCggJy5qcy1maWx0ZXJzJyApLmZpbmQoICcuYmFkZ2VbZGF0YS1jYXQ9JyArIGVsZW1lbnQuY2F0ICsgJ10nICkuc2hvdygpO1xuICAgICAgICAkKCAnLmpzLWZpbHRlcnMgc21hbGwnICkuc2hvdygpO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKCBtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCBpbmZvd2luZG93ICkge1xuICAgICAgICAgICAgICAgIGluZm93aW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBicmF2YWQubGFuZ19jb2RlID09ICdmcicgKSB7XG4gICAgICAgICAgICAgICAgcm91dGVfbGFiZWwgPSAnSXRpbsOpcmFpcmUnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdXRlX2xhYmVsID0gJ1JvdXRlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJvdXRlID0gJzxhIGhyZWY9XCJodHRwczovL3d3dy5nb29nbGUuY29tL21hcHM/Zj1kJnNhZGRyPScgKyBzdGFydF9wb3MgKyAnJmRhZGRyPScgKyBlbGVtZW50LmxhdCArICcsJyArIGVsZW1lbnQubG5nICsgJyZkaXJmbGc9ZFwiIHRhcmdldD1cIl9ibGFua1wiPicgKyByb3V0ZV9sYWJlbCArICc8L2E+JztcblxuICAgICAgICAgICAgLy8gdmFyIGNvbnRlbnRfc3RyID0gJzxwPjxzdHJvbmc+JyArIGVsZW1lbnQudGl0bGUgKyAnPC9zdHJvbmc+PC9wPjxwPicgKyBlbGVtZW50LmFkZHJlc3MgKyAnPC9wPjxwPkRpc3RhbmNlOiAnICsgZWxlbWVudC5kaXN0YW5jZSArICcgKCcgKyBlbGVtZW50LmR1cmF0aW9uICsgJyk8L3A+JyArIHJvdXRlO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRfc3RyID0gJzxwPjxzdHJvbmc+JyArIGVsZW1lbnQudGl0bGUgKyAnPC9zdHJvbmc+PC9wPjxwPicgKyBlbGVtZW50LmFkZHJlc3MgKyAnPC9wPjxwPkRpc3RhbmNlOiAnICsgZWxlbWVudC5kaXN0YW5jZS50b0ZpeGVkKCAyICkgKyAnIGttPC9wPicgKyByb3V0ZTtcblxuICAgICAgICAgICAgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgICAgICAgICBpbmZvd2luZG93LnNldENvbnRlbnQoIGNvbnRlbnRfc3RyICk7XG4gICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4oIG1hcCwgbWFya2VyICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNlbnRlcl9tYXAoIG1hcCApIHtcbiAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcblxuICAgICAgICAkLmVhY2goIG1hcC5tYXJrZXJzLCBmdW5jdGlvbiggaSwgbWFya2VyICkge1xuICAgICAgICAgICAgdmFyIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIG1hcmtlci5wb3NpdGlvbi5sYXQoKSwgbWFya2VyLnBvc2l0aW9uLmxuZygpICk7XG5cbiAgICAgICAgICAgIGJvdW5kcy5leHRlbmQoIGxhdGxuZyApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIG1hcC5tYXJrZXJzLmxlbmd0aCA9PSAxICkge1xuICAgICAgICAgICAgbWFwLnNldENlbnRlciggYm91bmRzLmdldENlbnRlcigpICk7XG4gICAgICAgICAgICBtYXAuc2V0Wm9vbSggMTUgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyggYm91bmRzICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kX2Nsb3Nlc3QoIHBvc2l0aW9uICkge1xuICAgICAgICBnZXRfZGlzdGFuY2UoIDAgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gZGlzdGFuY2UgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZURpc3RhbmNlQmV0d2VlbiggcG9zaXRpb24sIGxhdExuZyApIC8gMTAwMDtcblxuICAgICAgICBmdW5jdGlvbiBnZXRfZGlzdGFuY2UoIGkgKSB7XG4gICAgICAgICAgICBpZiAoIGkgPCBlbGVtZW50cy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuZF9wb3MgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBlbGVtZW50c1tpXS5sYXQsIGVsZW1lbnRzW2ldLmxuZyApO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbaV0uZGlzdGFuY2UgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZURpc3RhbmNlQmV0d2VlbiggcG9zaXRpb24sIGVuZF9wb3MgKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbaV0uY2FsYyA9IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnNwaGVyaWNhbC5jb21wdXRlRGlzdGFuY2VCZXR3ZWVuKCBwb3NpdGlvbiwgZW5kX3BvcyApIC8gMTAwMDtcblxuICAgICAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgICAgIGdldF9kaXN0YW5jZSggaSApO1xuXG4gICAgICAgICAgICAgICAgLy8gdmFyIGRpcmVjdGlvbnMgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgIC8vICAgICBvcmlnaW46IHN0YXJ0X3BvcyxcbiAgICAgICAgICAgICAgICAvLyAgICAgZGVzdGluYXRpb246IGVuZF9wb3MsXG4gICAgICAgICAgICAgICAgLy8gICAgIHRyYXZlbE1vZGU6IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuRFJJVklOR1xuICAgICAgICAgICAgICAgIC8vIH07XG5cbiAgICAgICAgICAgICAgICAvLyBkaXJlY3Rpb25zLnJvdXRlKCByZXF1ZXN0LCBmdW5jdGlvbiggcmVzcG9uc2UsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKCBzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1N0YXR1cy5PSyApIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRzW2ldLmRpc3RhbmNlID0gcmVzcG9uc2Uucm91dGVzWzBdLmxlZ3NbMF0uZGlzdGFuY2UudGV4dDtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGVsZW1lbnRzW2ldLmNhbGMgPSByZXNwb25zZS5yb3V0ZXNbMF0ubGVnc1swXS5kaXN0YW5jZS52YWx1ZSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBlbGVtZW50c1tpXS5kdXJhdGlvbiA9IHJlc3BvbnNlLnJvdXRlc1swXS5sZWdzWzBdLmR1cmF0aW9uLnRleHQ7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZ2V0X2Rpc3RhbmNlKCBpICk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgfSBlbHNlIGlmICggc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9WRVJfUVVFUllfTElNSVQgKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgZ2V0X2Rpc3RhbmNlKCBpICk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9LCAxMTAwICk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggaSA9PSBlbGVtZW50cy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlX21hcmtlcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZV9tYXJrZXJzKCkge1xuICAgICAgICAgICAgdmFyIG1heF9kaXN0YW5jZSA9ICQoICcuanMtcmF5b24nICkudmFsKCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLnNvcnQoIGNvbXBhcmVfZGlzdGFuY2UgKTtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBlbGVtZW50c1tpXS5jYWxjIDw9IG1heF9kaXN0YW5jZSApIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkX21hcmtlciggZWxlbWVudHNbaV0sIG1hcCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VudGVyX21hcCggbWFwICk7XG5cbiAgICAgICAgICAgIHJlbW92ZV9sb2FkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmVfZGlzdGFuY2UoIHBvaW50QSwgcG9pbnRCICkge1xuICAgICAgICAgICAgdmFyIGlSZXMgPSAwO1xuXG4gICAgICAgICAgICBpZiAoIHBvaW50QS5jYWxjIDwgcG9pbnRCLmNhbGMgKSB7XG4gICAgICAgICAgICAgICAgaVJlcyA9IC0xO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBwb2ludEEuY2FsYyA+IHBvaW50Qi5jYWxjICkge1xuICAgICAgICAgICAgICAgIGlSZXMgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaVJlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoICcuanMtc2VhcmNoLXBvaW50cycgKS5vbiggJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcl9lcnJvcigpO1xuXG4gICAgICAgIHZhciBhZGRyZXNzID0gJCggJy5qcy1hZGRyZXNzJyApLnZhbCgpO1xuXG4gICAgICAgIGlmICggYWRkcmVzcyAhPT0gJycgKSB7XG4gICAgICAgICAgICBhZGRfbG9hZGVyKCk7XG5cbiAgICAgICAgICAgIGdldF9hZGRyZXNzKCBhZGRyZXNzICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkKCAnLmpzLWdlbycgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyX2Vycm9yKCk7XG5cbiAgICAgICAgaWYgKCBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24gKSB7XG4gICAgICAgICAgICBhZGRfbG9hZGVyKCk7XG5cbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oIGZ1bmN0aW9uKCBwb3NpdGlvbiApIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlICk7XG5cbiAgICAgICAgICAgICAgICBzdGFydF9wb3MgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRfcG9zaXRpb24oIHBvcyApO1xuXG4gICAgICAgICAgICAgICAgbWFwLnNldENlbnRlciggcG9zICk7XG5cbiAgICAgICAgICAgICAgICBmaW5kX2Nsb3Nlc3QoIHBvcyApO1xuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHt9ICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICggYnJhdmFkLmxhbmdfY29kZSA9PSAnZnInICkge1xuICAgICAgICAgICAgICAgIHJlbmRlcl9lcnJvciggXCJWb3RyZSBuYXZpZ2F0ZXVyIG5lIHByZW5kIHBhcyBlbiBjaGFyZ2UgbGEgZ8Opb2xvY2FsaXNhdGlvblwiICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyX2Vycm9yKCBcIkJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEdlb2xvY2F0aW9uXCIgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVtb3ZlX2xvYWRlcigpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZXNldF9wb3NpdGlvbiggcG9zaXRpb24gKSB7XG4gICAgICAgIGlmICggcG9zaXRpb24gIT09ICcnICkge1xuICAgICAgICAgICAgY2xlYXJfbWFya2VyKCk7XG5cbiAgICAgICAgICAgIHZhciBwaW4gPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4teW91LnN2ZycsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKCAzMCwgMzYgKSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoIDMwLCAzNiApLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCggMTUsIDM2IClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpdGxlID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggYnJhdmFkLmxhbmdfY29kZSA9PSAnZnInICkge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gJ1ZvdXMgw6p0ZXMgaWNpJztcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICdZb3UgYXJlIGhlcmUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBtYXAgOiBtYXAsXG4gICAgICAgICAgICAgICAgaWNvbiA6IHBpbixcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXAubWFya2Vycy5wdXNoKCBtYXJrZXIgKTtcbiAgICAgICAgICAgIHZfZWxlbWVudHMucHVzaCggJ3lvdScgKTtcblxuICAgICAgICAgICAgJCggJy5qcy1maWx0ZXJzIC5iYWRnZVtkYXRhLWNhdD15b3VdJyApLnNob3coKTtcbiAgICAgICAgICAgICQoICcuanMtZmlsdGVycyBzbWFsbCcgKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIDQ1LjY1NzczNjYxMjEyOTMxLCAtNzIuMTQ3MTg4MDgwNzc4NjggKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9hZGRyZXNzKCBhZGRyZXNzICkge1xuICAgICAgICB2YXIgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcblxuICAgICAgICBnZW9jb2Rlci5nZW9jb2RlKCB7ICdhZGRyZXNzJzogYWRkcmVzcyB9LCBmdW5jdGlvbiggcmVzdWx0cywgc3RhdHVzICkge1xuICAgICAgICAgICAgaWYgKCBzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0sgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb247XG5cbiAgICAgICAgICAgICAgICBzdGFydF9wb3MgPSBwb3M7XG5cbiAgICAgICAgICAgICAgICByZXNldF9wb3NpdGlvbiggcG9zICk7XG5cbiAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKCBwb3MgKTtcblxuICAgICAgICAgICAgICAgIGZpbmRfY2xvc2VzdCggcG9zICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PVkVSX1FVRVJZX0xJTUlUICkge1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuWkVST19SRVNVTFRTICkge1xuICAgICAgICAgICAgICAgIGlmICggYnJhdmFkLmxhbmdfY29kZSA9PSAnZnInICkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJfZXJyb3IoIFwiTm91cyBuJ2F2b25zIHBhcyB0cm91dsOpIGwnYWRyZXNzZVwiICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJfZXJyb3IoIFwiV2UgY291bGRuJ3QgZmluZCB0aGUgYWRkcmVzc1wiICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlX2xvYWRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhcl9tYXJrZXIoKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IG1hcC5tYXJrZXJzLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgbWFwLm1hcmtlcnNbaV0uc2V0TWFwKCBudWxsICk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXAubWFya2VycyA9IFtdO1xuICAgICAgICB2X2VsZW1lbnRzID0gW107XG5cbiAgICAgICAgJCggJy5qcy1maWx0ZXJzIC5iYWRnZScgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoIHRoaXMgKS5oaWRlKCkuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoICcuanMtZmlsdGVycyBzbWFsbCcgKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2Vycm9yKCBtc2cgKSB7XG4gICAgICAgIHZhciBlcnJvciA9ICQoICcuanMtbWFwLXNhbGUtZXJyb3InICk7XG5cbiAgICAgICAgZXJyb3IuZW1wdHkoKTtcbiAgICAgICAgZXJyb3IuYXBwZW5kKCAnPGJyIC8+PGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicgKyBtc2cgKyAnPC9kaXY+JyApO1xuXG4gICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcGFnZVNjcm9sbC5zZXRTaXplKCk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJfZXJyb3IoKSB7XG4gICAgICAgIHZhciBlcnJvciA9ICQoICcuanMtbWFwLXNhbGUtZXJyb3InICk7XG5cbiAgICAgICAgZXJyb3IuZW1wdHkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfbG9hZGVyKCkge1xuICAgICAgICBsb2FkZXIuZmFkZUluKCAzMDAgKTtcblxuICAgICAgICAkKCAnZm9ybS5zZWFyY2gtcG9pbnRzIDppbnB1dCcgKS5wcm9wKCAnZGlzYWJsZWQnLCB0cnVlICk7XG4gICAgICAgICQoICdmb3JtLnNlYXJjaC1wb2ludHMgc2VsZWN0JyApLnByb3AoICdkaXNhYmxlZCcsIHRydWUgKTtcbiAgICAgICAgJCggJ2Zvcm0uc2VhcmNoLXBvaW50cyAuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtZGlzYWJsZWQnICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlX2xvYWRlcigpIHtcbiAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCBsb2FkZXIgKS5mYWRlT3V0KCAzMDAgKTtcblxuICAgICAgICAgICAgJCggJ2Zvcm0uc2VhcmNoLXBvaW50cyA6aW5wdXQnICkucHJvcCggJ2Rpc2FibGVkJywgZmFsc2UgKTtcbiAgICAgICAgICAgICQoICdmb3JtLnNlYXJjaC1wb2ludHMgc2VsZWN0JyApLnByb3AoICdkaXNhYmxlZCcsIGZhbHNlICk7XG4gICAgICAgICAgICAkKCAnZm9ybS5zZWFyY2gtcG9pbnRzIC5zZWxlY3QnICkucmVtb3ZlQ2xhc3MoICdpcy1kaXNhYmxlZCcgKTtcbiAgICAgICAgfSwgNTAwICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyX21hcmtlciggY2F0LCBzdGF0dXMgKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IG1hcC5tYXJrZXJzLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgaWYgKCB2X2VsZW1lbnRzW2ldID09IGNhdCApIHtcbiAgICAgICAgICAgICAgICBtYXAubWFya2Vyc1tpXS5zZXRWaXNpYmxlKCBzdGF0dXMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoICcuanMtbWFwLXNhbGUtZmlsdGVyJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgIGlmICggbWUuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgIGZpbHRlcl9tYXJrZXIoIG1lLmF0dHIoICdkYXRhLWNhdCcgKSwgZmFsc2UgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgIGZpbHRlcl9tYXJrZXIoIG1lLmF0dHIoICdkYXRhLWNhdCcgKSwgdHJ1ZSApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgbWFwID0gbnVsbDtcblxuICAgICQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICAgICBhZGRfbG9hZGVyKCk7XG5cbiAgICAgICAgJCggJy5qcy1tYXAtc2FsZScgKS5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbWFwID0gbmV3X21hcCggJCggdGhpcyApICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQoIHdpbmRvdyApLm9uKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXJsUGFyYW1ldGVyID0gZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKCBzUGFyYW0gKSB7XG4gICAgICAgICAgICB2YXIgc1BhZ2VVUkwgPSBkZWNvZGVVUklDb21wb25lbnQoIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpICksXG4gICAgICAgICAgICAgICAgc1VSTFZhcmlhYmxlcyA9IHNQYWdlVVJMLnNwbGl0KCAnJicgKSxcbiAgICAgICAgICAgICAgICBzUGFyYW1ldGVyTmFtZSxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCAnPScgKTtcblxuICAgICAgICAgICAgICAgIGlmICggc1BhcmFtZXRlck5hbWVbMF0gPT09IHNQYXJhbSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhbmNob3IgPSBnZXRVcmxQYXJhbWV0ZXIoICdzZWN0aW9uJyApO1xuXG4gICAgICAgIGlmICggdHlwZW9mIGFuY2hvciAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwYWdlX3Njcm9sbCggJyMnICsgYW5jaG9yICk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFkZGVkID0gZ2V0VXJsUGFyYW1ldGVyKCAnYWRkLXRvLWNhcnQnICk7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgYWRkZWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoICcud29vY29tbWVyY2UtbWVzc2FnZScgKS5jbG9zZXN0KCAnLmJsb2NrJyApO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwYWdlX3Njcm9sbCggdGFyZ2V0ICk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCAnYS5qcy1zY3JvbGxbaHJlZl49XCIjXCJdJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBhbmNob3IgPSAkLmF0dHIoIHRoaXMsICdocmVmJyApO1xuXG4gICAgICAgIHBhZ2Vfc2Nyb2xsKCBhbmNob3IgKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHBhZ2Vfc2Nyb2xsKCBhbmNob3IgKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAkKCAnLmpzLWhlYWRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzICkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gJCggJy5qcy1ob2xkZXInICkub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoICdodG1sLCBib2R5JyApLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCBhbmNob3IgKS5vZmZzZXQoKS50b3AgLSBvZmZzZXRcbiAgICAgICAgfSwgODAwICk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQoICcuanMtaGVhZGVyIC5qcy1zZWFyY2gnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzID09IHRydWUgKSB7XG4gICAgICAgICAgICBpZiAoICEgbWUuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ3NlYXJjaC1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgICAgICAkKCAnLmpzLW5hdiAubWVudS1pdGVtLWhhcy1jaGlsZHJlbicgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLnN1Yi1tZW51JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCggMjAwICk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCAkKCAnLnNlYXJjaC1maWVsZCcgKS52YWwoKSA9PSAnJyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5zZWFyY2gtZmllbGQnICkudmFsKCkgPT0gJycgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoICcuanMtc2VhcmNoLWZvcm0nICkub24oICdzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgIGlmICggbWUuZmluZCggJy5zZWFyY2gtZmllbGQnICkudmFsKCkgPT0gJycgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIHdpbmRvdyApLm9uKCAncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsb3NlX3NlYXJjaCgpO1xuICAgIH0pO1xuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggaXNfbGcubWF0Y2hlcyA9PSB0cnVlICkge1xuICAgICAgICAgICAgY2xvc2Vfc2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICcuanMtc2VhcmNoLWZvcm0nLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY2xvc2Vfc2VhcmNoKCkge1xuICAgICAgICAkKCAnLmpzLXNlYXJjaCcgKS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnc2VhcmNoLW9wZW5lZCcgKTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnc2VsZWN0JyApICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICAkKCAnc2VsZWN0JyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdCAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgY3VyclZhbCA9IHNlbGVjdC5maW5kKCAnb3B0aW9uOnNlbGVjdGVkJyApLnRleHQoKSxcbiAgICAgICAgICAgICAgICBjbGFzc2VzO1xuXG4gICAgICAgICAgICBpZiAoIHNlbGVjdC5pcyggJyNyYXRpbmcnICkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBzZWxlY3QuYXR0ciggJ2NsYXNzJyApICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gJyAnICsgc2VsZWN0LmF0dHIoICdjbGFzcycgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3RcbiAgICAgICAgICAgICAgICAud3JhcCggJzxkaXYgY2xhc3M9XCJzZWxlY3QnICsgY2xhc3NlcyArICdcIj48L2Rpdj4nIClcbiAgICAgICAgICAgICAgICAuY3NzKCAnb3BhY2l0eScsICcwJyApO1xuXG4gICAgICAgICAgICBzZWxlY3QuY2xvc2VzdCggJy5zZWxlY3QnICkuYXBwZW5kKCAnPHNwYW4gY2xhc3M9XCJzZWxlY3QtY2hvaWNlXCI+PC9zcGFuPicgKTtcbiAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5maW5kKCAnLnNlbGVjdC1jaG9pY2UnICkudGV4dCggY3VyclZhbCApO1xuXG4gICAgICAgICAgICBpZiAoIHNlbGVjdC5pcyggJy5pcy1kYW5nZXInICkgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtZGFuZ2VyJyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHNlbGVjdC5pcyggJy5pcy1zdWNjZXNzJyApICkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5hZGRDbGFzcyggJ2lzLXN1Y2Nlc3MnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnOmRpc2FibGVkJyApICkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5hZGRDbGFzcyggJ2lzLWRpc2FibGVkJyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIENoYW5nZSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkub24oICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3QgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGN1cnJWYWwgPSBzZWxlY3QuZmluZCggJ29wdGlvbjpzZWxlY3RlZCcgKS50ZXh0KCk7XG5cbiAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5maW5kKCAnLnNlbGVjdC1jaG9pY2UnICkudGV4dCggY3VyclZhbCApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgdmFyIHNsaWRlc2hvdyA9IFtdO1xuXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggJCggJy5qcy1iYWNrZ3JvdW5kLXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAkKCAnLmpzLWJhY2tncm91bmQtc3dpcGVyJyApLmVhY2goIGZ1bmN0aW9uKCBpLCBvYmogKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldID0gbmV3IFN3aXBlciggb2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDgwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbG9zZXN0KCAnLmpzLWJhY2tncm91bmQnICkuZmluZCggJy5qcy1uZXh0JyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldLnNsaWRlTmV4dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtYmFja2dyb3VuZCcgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICQoICcuanMtc2xpZGVzaG93LXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAkKCAnLmpzLXNsaWRlc2hvdy1zd2lwZXInICkuZWFjaCggZnVuY3Rpb24oIGksIG9iaiApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0gPSBuZXcgU3dpcGVyKCBvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtc2xpZGVzaG93JyApLmZpbmQoICcuanMtbmV4dCcgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZU5leHQoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbG9zZXN0KCAnLmpzLXNsaWRlc2hvdycgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICQoICcuanMtcG9zdHMtc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICQoICcuanMtcG9zdHMtc3dpcGVyJyApLmVhY2goIGZ1bmN0aW9uKCBpLCBvYmogKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldID0gbmV3IFN3aXBlciggb2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA4MDAsXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbDogJy5qcy1uZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZFbDogJy5qcy1wcmV2JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1wb3N0cycgKS5maW5kKCAnLmpzLW5leHQnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVOZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1wb3N0cycgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ2FsbGVyeV90aHVtYm5haWwsXG4gICAgICAgICAgICBnYWxsZXJ5X3N3aXBlcjtcblxuICAgICAgICBpZiAoICQoICcuanMtdGh1bWJuYWlsLXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBnYWxsZXJ5X3RodW1ibmFpbCA9IG5ldyBTd2lwZXIoICcuanMtdGh1bWJuYWlsLXN3aXBlcicsIHtcbiAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICBzcGVlZDogODAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1nYWxsZXJ5LXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBnYWxsZXJ5X3N3aXBlciA9IG5ldyBTd2lwZXIoICcuanMtZ2FsbGVyeS1zd2lwZXInLCB7XG4gICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDgwMCxcbiAgICAgICAgICAgICAgICB0aHVtYnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyOiBnYWxsZXJ5X3RodW1ibmFpbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy10YWJzJyApICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICAkKCAnLmpzLXRhYnMnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGFicyA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgdGFicy5maW5kKCAnLnRhYnMtbmF2IGEnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBtZS5hdHRyKCAnaHJlZicgKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggdGFyZ2V0IClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBDbGljayBldmVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9KS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lICAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gbWUuYXR0ciggJ2hyZWYnICksXG4gICAgICAgICAgICAgICAgICAgIG5hdiAgICA9IHRhYnMuZmluZCggJy50YWJzLW5hdicgKSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQgID0gMzAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCAhIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmZpbmQoICdhJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggJy50YWJzLWl0ZW0uaXMtYWN0aXZlJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWRlT3V0KCBzcGVlZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFic1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggdGFyZ2V0IClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhZGVJbiggc3BlZWQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy10b2dnbGUnICkgKSB7XG4gICAgICAgICQoICcuanMtdG9nZ2xlJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSAgICAgPSAkKCB0aGlzICksIFxuICAgICAgICAgICAgICAgIHRhcmdldCA9IG1lLm5leHQoKTtcblxuICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNsaWRlVXAoIDIwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2xpZGVEb3duKCAyMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XHJcblxyXG5cdCQoIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCBpc19tZC5tYXRjaGVzICkge1xyXG5cdFx0XHQkKCAnaW5wdXRbdHlwZT1udW1iZXJdJyApLmJyYXZhZF9udW1iZXIoKTtcclxuICAgICAgICB9XHJcblx0fSk7XHJcblxyXG5cdCQoIGRvY3VtZW50LmJvZHkgKS5vbiggJ2FkZGVkX3RvX2NhcnQgdXBkYXRlZF93Y19kaXYnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICggaXNfbWQubWF0Y2hlcyApIHtcclxuXHRcdFx0JCggJy53b29jb21tZXJjZS1jYXJ0LWZvcm0gaW5wdXRbdHlwZT1udW1iZXJdJyApLmJyYXZhZF9udW1iZXIoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHQgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xyXG5cdFx0ICAgIH0sIDMwMCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KGpRdWVyeSkpO1xyXG4iXX0=
