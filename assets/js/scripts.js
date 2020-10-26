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
                .appendTo( '.js-header' );
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

            window.scrollTo( 0, parseInt( scrollY || '0' ) * -1 );

        } else {
            me.addClass( 'is-active' );

            $( '.js-site' ).addClass( 'nav-opened' );

            $( 'body' )
                .css({
                    'position' : 'fixed',
                    'top': '-' + window.scrollY + 'px'
                });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLmpzIiwiY29va2llcy5qcyIsIm5hdmlnYXRpb24uanMiLCJzY3JvbGxpbmcuanMiLCJjb21tZW50LmpzIiwiZmFxLmpzIiwiZmlsZS5qcyIsImdvb2dsZS1tYXAuanMiLCJudW1iZXIuanMiLCJzY3JvbGwuanMiLCJzZWFyY2guanMiLCJzZWxlY3QuanMiLCJzbGlkZXNob3cuanMiLCJ0YWJzLmpzIiwidG9nZ2xlLmpzIiwiZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpc194cywgaXNfc20sIGlzX21kLCBpc19sZywgaXNfeGwsIGlzX3h4bDtcblxuaWYgKCBtYXRjaE1lZGlhICkge1xuICAgIHZhciBpc194cyAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDBweCknICksXG4gICAgICAgIGlzX3NtICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogNTc2cHgpJyApLFxuICAgICAgICBpc19tZCAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDc2OHB4KScgKSxcbiAgICAgICAgaXNfbGcgID0gd2luZG93Lm1hdGNoTWVkaWEoICcobWluLXdpZHRoOiA5OTJweCknICksXG4gICAgICAgIGlzX3hsICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogMTIwMHB4KScgKTtcbn1cbiIsIihmdW5jdGlvbigkKSB7XG4gICAgXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggc2Vzc2lvblN0b3JhZ2UgKSB7XG4gICAgICAgICAgICB2YXIgY29va2llID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSggJ2Nvb2tpZXMnICk7XG5cbiAgICAgICAgICAgIGlmICggY29va2llID09IG51bGwgfHwgY29va2llID09ICd0cnVlJyApIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCAnY29va2llcycsICd0cnVlJyApO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQoICcuanMtY29va2llcycgKS5hZGRDbGFzcyggJ3JldmVhbCcgKTtcbiAgICAgICAgICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggY29va2llID09ICdmYWxzZScgKSB7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1jb29raWVzJyApLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCAnLmpzLWNvb2tpZXMgLmJ0bicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oICdjb29raWVzJywgJ2ZhbHNlJyApO1xuXG4gICAgICAgICQoICcuanMtY29va2llcycgKS5yZW1vdmVDbGFzcyggJ3JldmVhbCcgKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoICcuanMtY29va2llcycgKS5yZW1vdmUoKTtcbiAgICAgICAgfSwgNTAwICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIHZhciBtb2JpbGUgID0gdHJ1ZSxcbiAgICAgICAgdGltZW91dCA9IGZhbHNlO1xuXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHN3aXRjaF9uYXYoKTtcbiAgICAgICAgc2Nyb2xsX2NsYXNzZXMoKTtcbiAgICB9KTtcblxuICAgICQoIHdpbmRvdyApLm9uKCAncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ2lzLXJlc2l6ZScgKTtcblxuICAgICAgICBpZiAoIHRpbWVvdXQgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgdGltZW91dCA9IHRydWU7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ2lzLXJlc2l6ZScgKTtcbiAgICAgICAgICAgIH0sIDMwMCApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoX25hdigpO1xuICAgIH0pO1xuXG4gICAgJCggd2luZG93ICkub24oICdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2Nyb2xsX2NsYXNzZXMoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbF9jbGFzc2VzKCkge1xuICAgICAgICBpZiAoIHdpbmRvdy5zY3JvbGxZID49IDEwMCApIHtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ25hdi1zdGlja3knICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ25hdi1zdGlja3knICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hfbmF2KCkge1xuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gdHJ1ZSAmJiBtb2JpbGUgPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIG1vYmlsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoICQoICcuanMtc2l0ZScgKS5pcyggJy5uYXYtb3BlbmVkJyApICkge1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ25hdi1vcGVuZWQnICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1uYXYtb3BlbmVyJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFkgPSAkKCAnYm9keScgKS5jc3MoICd0b3AnICk7XG5cbiAgICAgICAgICAgICAgICAkKCAnYm9keScgKS5yZW1vdmVBdHRyKCAnc3R5bGUnICk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oIDAsIHBhcnNlSW50KCBzY3JvbGxZIHx8ICcwJyApICogLTEgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCggJy5qcy1zZWNvbmRhcnktbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLnByZXBlbmRUbyggJy5qcy1oZWFkZXIgPiAuY29udGFpbmVyJyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLXNob3AtbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKCAnLmpzLXByaW1hcnktbmF2JyApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gZmFsc2UgJiYgbW9iaWxlID09IGZhbHNlICkge1xuICAgICAgICAgICAgbW9iaWxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgJCggJy5qcy1zZWNvbmRhcnktbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKCAnLmpzLXByaW1hcnktbmF2JyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLXNob3AtbmF2JyApXG4gICAgICAgICAgICAgICAgLmRldGFjaCgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKCAnLmpzLWhlYWRlcicgKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoICcuc2l0ZScgKS5hZGRDbGFzcyggJ2lzLXNob3duJyApO1xuICAgICAgICBpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoICcuanMtbmF2LW9wZW5lcicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICBpZiAoIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgIG1lLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICduYXYtb3BlbmVkJyApO1xuXG4gICAgICAgICAgICAkKCAnLmpzLW5hdiAubWVudS1pdGVtLWhhcy1jaGlsZHJlbicgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBtZVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcuc3ViLW1lbnUnIClcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoIDIwMCApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzY3JvbGxZID0gJCggJ2JvZHknICkuY3NzKCAndG9wJyApO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggc2Nyb2xsWSApO1xuXG4gICAgICAgICAgICAkKCAnYm9keScgKS5yZW1vdmVBdHRyKCAnc3R5bGUnICk7XG4gICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQXR0ciggJ3N0eWxlJyApO1xuXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oIDAsIHBhcnNlSW50KCBzY3JvbGxZIHx8ICcwJyApICogLTEgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ25hdi1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgICQoICdib2R5JyApXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbicgOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICAndG9wJzogJy0nICsgd2luZG93LnNjcm9sbFkgKyAncHgnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkKCAnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBNb2Rlcm5penIudG91Y2hldmVudHMgKSB7XG4gICAgICAgICAgICB2YXIgbGluayA9ICQoIHRoaXMgKS5wYXJlbnQoKSxcbiAgICAgICAgICAgICAgICBzdWIgID0gbGluay5maW5kKCAnPiAuc3ViLW1lbnUnICk7XG5cbiAgICAgICAgICAgIGlmICggbGluay5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbGluay5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICBzdWIuc2xpZGVVcCggMjAwICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnc3ViLW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaW5rLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIHN1Yi5zbGlkZURvd24oIDIwMCApO1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ3N1Yi1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIHZhciBsaW5rID0gJCggJy5tZW51IC5pcy1hY3RpdmUnICksXG4gICAgICAgICAgICAgICAgc3ViICA9IGxpbmsuZmluZCggJy5zdWItbWVudScgKTtcblxuICAgICAgICAgICAgbGluay5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgIHN1Yi5zbGlkZVVwKCAyMDAgKTtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ3N1Yi1vcGVuZWQnICk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICcuanMtaGVhZGVyJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTtcbiIsInZhciBwYWdlU2Nyb2xsO1xuXG57XG4gICAgY29uc3QgTWF0aFV0aWxzID0ge1xuICAgICAgICBtYXA6ICggeCwgYSwgYiwgYywgZCApID0+ICggeCAtIGEgKSAqICggZCAtIGMgKSAvICggYiAtIGEgKSArIGMsXG4gICAgICAgIGxlcnA6ICggYSwgYiwgbiApID0+ICggMSAtIG4gKSAqIGEgKyBuICogYixcbiAgICAgICAgZ2V0UmFuZG9tRmxvYXQ6ICggbWluLCBtYXggKSA9PiAoIE1hdGgucmFuZG9tKCkgKiAoIG1heCAtIG1pbiApICsgbWluICkudG9GaXhlZCggMiApXG4gICAgfTtcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIFxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgdmlld3BvcnQgc2l6ZVxuICAgIGxldCB3aW5zaXplO1xuICAgIGNvbnN0IGNhbGNXaW5zaXplID0gKCkgPT4gd2luc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9O1xuICAgIGNhbGNXaW5zaXplKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIGNhbGNXaW5zaXplICk7XG4gICAgXG4gICAgLy8gc2Nyb2xsIHBvc2l0aW9uXG4gICAgbGV0IGRvY1Njcm9sbDtcbiAgICBsZXQgbGFzdFNjcm9sbDtcbiAgICBsZXQgc2Nyb2xsaW5nU3BlZWQgPSAwO1xuXG4gICAgLy8gc2Nyb2xsIHBvc2l0aW9uIHVwZGF0ZSBmdW5jdGlvblxuICAgIGNvbnN0IGdldFBhZ2VZU2Nyb2xsID0gKCkgPT4gZG9jU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCBnZXRQYWdlWVNjcm9sbCApO1xuXG4gICAgY2xhc3MgSXRlbSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICAgICAgICAgIHRoaXMuRE9NICAgICAgICAgICAgICA9IHsgZWw6IGVsIH07XG4gICAgICAgICAgICB0aGlzLkRPTS5pbWFnZSAgICAgICAgPSB0aGlzLkRPTS5lbC5xdWVyeVNlbGVjdG9yKCAnLnBhcmFsbGF4LWltYWdlJyApO1xuICAgICAgICAgICAgdGhpcy5ET00uaW1hZ2VXcmFwcGVyID0gdGhpcy5ET00uaW1hZ2UucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuRE9NLnRpdGxlICAgICAgICA9IHRoaXMuRE9NLmVsLnF1ZXJ5U2VsZWN0b3IoICcucGFyYWxsYXgtdGl0bGUnICk7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgLy8gaGVyZSB3ZSBkZWZpbmUgd2hpY2ggcHJvcGVydHkgd2lsbCBjaGFuZ2UgYXMgd2Ugc2Nyb2xsIHRoZSBwYWdlIGFuZCB0aGUgaXRlbSBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHdlIHdpbGwgYmU6XG4gICAgICAgICAgICAgICAgLy8gLSBzY2FsaW5nIHRoZSBpbm5lciBpbWFnZVxuICAgICAgICAgICAgICAgIC8vIC0gdHJhbnNsYXRpbmcgdGhlIGl0ZW0ncyB0aXRsZVxuICAgICAgICAgICAgICAgIC8vIHdlIGludGVycG9sYXRlIGJldHdlZW4gdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50IHZhbHVlIHRvIGFjaGlldmUgYSBzbW9vdGggZWZmZWN0XG4gICAgICAgICAgICAgICAgaW1hZ2VUcmFuc2xhdGlvblk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IDAsIFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAwLCBcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogMC4xLFxuICAgICAgICAgICAgICAgICAgICBmcm9tVmFsdWU6IC0xMDAsXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnJlbmRlcmVkU3R5bGVzLmltYWdlVHJhbnNsYXRpb25ZLmZyb21WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgICA9IC0xICogZnJvbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsICAgICAgID0gTWF0aFV0aWxzLm1hcCggdGhpcy5wcm9wcy50b3AgLSBkb2NTY3JvbGwsIHdpbnNpemUuaGVpZ2h0LCAtMSAqIHRoaXMucHJvcHMuaGVpZ2h0LCBmcm9tVmFsdWUsIHRvVmFsdWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb21WYWx1ZSA8IDAgPyBNYXRoLm1pbiggTWF0aC5tYXgoIHZhbCwgZnJvbVZhbHVlICksIHRvVmFsdWUgKSA6IE1hdGgubWF4KCBNYXRoLm1pbiggdmFsLCBmcm9tVmFsdWUgKSwgdG9WYWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0cyB0aGUgaXRlbSdzIGhlaWdodCBhbmQgdG9wIChyZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnQpXG4gICAgICAgICAgICB0aGlzLmdldFNpemUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIC8vIHVzZSB0aGUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgQVBJIHRvIGNoZWNrIHdoZW4gdGhlIGVsZW1lbnQgaXMgaW5zaWRlIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gb25seSB0aGVuIHRoZSBlbGVtZW50IHN0eWxlcyB3aWxsIGJlIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoICggZW50cmllcyApID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHRoaXMuaXNWaXNpYmxlID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSggdGhpcy5ET00uZWwgKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIC8vIHNldHMgdGhlIGluaXRpYWwgdmFsdWUgKG5vIGludGVycG9sYXRpb24pXG4gICAgICAgICAgICBmb3IgKCBjb25zdCBrZXkgaW4gdGhpcy5yZW5kZXJlZFN0eWxlcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50ID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5zZXRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhcHBseSBjaGFuZ2VzL3N0eWxlc1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRTaXplKCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuRE9NLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAvLyBpdGVtJ3MgaGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAvLyBvZmZzZXQgdG9wIHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgIHRvcDogZG9jU2Nyb2xsICsgcmVjdC50b3BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaW5pdEV2ZW50cygpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgKCkgPT4gdGhpcy5yZXNpemUoKSApO1xuICAgICAgICB9XG4gICAgICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgICAgIC8vIGdldHMgdGhlIGl0ZW0ncyBoZWlnaHQgYW5kIHRvcCAocmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50KVxuICAgICAgICAgICAgdGhpcy5nZXRTaXplKCk7XG4gICAgICAgICAgICAvLyBvbiByZXNpemUgcmVzZXQgc2l6ZXMgYW5kIHVwZGF0ZSBzdHlsZXNcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IGFuZCBpbnRlcnBvbGF0ZWQgdmFsdWVzXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIGZvciAoIGNvbnN0IGtleSBpbiB0aGlzLnJlbmRlcmVkU3R5bGVzICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5zZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzID0gTWF0aFV0aWxzLmxlcnAoIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzLCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50LCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5lYXNlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFuZCBhcHBseSBjaGFuZ2VzXG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxheW91dCgpIHtcbiAgICAgICAgICAgIC8vIGltYWdlXG4gICAgICAgICAgICB0aGlzLkRPTS5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoIDAsICR7IHRoaXMucmVuZGVyZWRTdHlsZXMuaW1hZ2VUcmFuc2xhdGlvblkucHJldmlvdXMgfXB4LCAwIClgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgU21vb3RoU2Nyb2xsIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLkRPTSAgICAgICAgICAgID0geyBtYWluOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLnNpdGUnICkgfTtcbiAgICAgICAgICAgIC8vIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIC8vIHdlIHRyYW5zbGF0ZSB0aGlzIGVsZW1lbnQgd2hlbiBzY3JvbGxpbmcgKHktYXhpcylcbiAgICAgICAgICAgIHRoaXMuRE9NLnNjcm9sbGFibGUgPSB0aGlzLkRPTS5tYWluLnF1ZXJ5U2VsZWN0b3IoICcuc2l0ZS1zY3JvbGwnICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHRoZSBpdGVtcyBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgdGhpcy5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ET00uY29udGVudCAgICA9IHRoaXMuRE9NLm1haW4ucXVlcnlTZWxlY3RvciggJ21haW4nICk7XG4gICAgICAgICAgICBbIC4uLnRoaXMuRE9NLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCggJy5wYXJhbGxheCcgKSBdLmZvckVhY2goIGl0ZW0gPT4gdGhpcy5pdGVtcy5wdXNoKCBuZXcgSXRlbSggaXRlbSApICkgKTtcblxuICAgICAgICAgICAgLy8gaGVyZSB3ZSBkZWZpbmUgd2hpY2ggcHJvcGVydHkgd2lsbCBjaGFuZ2UgYXMgd2Ugc2Nyb2xsIHRoZSBwYWdlXG4gICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2Ugd2Ugd2lsbCBiZSB0cmFuc2xhdGluZyBvbiB0aGUgeS1heGlzXG4gICAgICAgICAgICAvLyB3ZSBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZSB0byBhY2hpZXZlIHRoZSBzbW9vdGggc2Nyb2xsaW5nIGVmZmVjdFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlcyA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvblk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IDAsIFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAwLCBcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogMC4xLFxuICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZTogKCkgPT4gZG9jU2Nyb2xsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgYm9keSdzIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSByZW5kZXIgbG9vcFxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB0aGlzLnJlbmRlcigpICk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgLy8gc2V0cyB0aGUgaW5pdGlhbCB2YWx1ZSAobm8gaW50ZXJwb2xhdGlvbikgLSB0cmFuc2xhdGUgdGhlIHNjcm9sbCB2YWx1ZVxuICAgICAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHRoaXMucmVuZGVyZWRTdHlsZXMgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnByZXZpb3VzID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uc2V0VmFsdWUoKTsgICBcbiAgICAgICAgICAgIH0gICBcblxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5b3V0KCkge1xuICAgICAgICAgICAgdGhpcy5ET00uc2Nyb2xsYWJsZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoIDAsICR7IC0xICogdGhpcy5yZW5kZXJlZFN0eWxlcy50cmFuc2xhdGlvblkucHJldmlvdXMgfXB4LCAwIClgO1xuICAgICAgICB9XG4gICAgICAgIHNldFNpemUoKSB7XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGhlaWdoIG9mIHRoZSBib2R5IGluIG9yZGVyIHRvIGtlZXAgdGhlIHNjcm9sbGJhciBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgYm9keS5zdHlsZS5oZWlnaHQgPSBgJHsgdGhpcy5ET00uc2Nyb2xsYWJsZS5zY3JvbGxIZWlnaHQgfXB4YDtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZSgpIHtcbiAgICAgICAgICAgIC8vIHRoZSA8bWFpbj4gbmVlZHMgdG8gXCJzdGlja1wiIHRvIHRoZSBzY3JlZW4gYW5kIG5vdCBzY3JvbGxcbiAgICAgICAgICAgIC8vIGZvciB0aGF0IHdlIHNldCBpdCB0byBwb3NpdGlvbiBmaXhlZCBhbmQgb3ZlcmZsb3cgaGlkZGVuIFxuICAgICAgICAgICAgdGhpcy5ET00ubWFpbi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgICAgICB0aGlzLkRPTS5tYWluLnN0eWxlLndpZHRoICAgID0gdGhpcy5ET00ubWFpbi5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgICAgICB0aGlzLkRPTS5tYWluLnN0eWxlLnRvcCAgICAgID0gdGhpcy5ET00ubWFpbi5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuRE9NLm1haW4uc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuICAgICAgICBpbml0RXZlbnRzKCkge1xuICAgICAgICAgICAgLy8gb24gcmVzaXplIHJlc2V0IHRoZSBib2R5J3MgaGVpZ2h0XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5zZXRTaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIC8vIEdldCBzY3JvbGxpbmcgc3BlZWRcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBsYXN0U2Nyb2xsXG4gICAgICAgICAgICBzY3JvbGxpbmdTcGVlZCA9IE1hdGguYWJzKCBkb2NTY3JvbGwgLSBsYXN0U2Nyb2xsICk7XG4gICAgICAgICAgICBsYXN0U2Nyb2xsICAgICA9IGRvY1Njcm9sbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IGFuZCBpbnRlcnBvbGF0ZWQgdmFsdWVzXG4gICAgICAgICAgICBmb3IgKCBjb25zdCBrZXkgaW4gdGhpcy5yZW5kZXJlZFN0eWxlcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50ICA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnNldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMgPSBNYXRoVXRpbHMubGVycCggdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMsIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQsIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmVhc2UgKTsgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFuZCB0cmFuc2xhdGUgdGhlIHNjcm9sbGFibGUgZWxlbWVudFxuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICggY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zICkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBpdGVtIGlzIGluc2lkZSB0aGUgdmlld3BvcnQgY2FsbCBpdCdzIHJlbmRlciBmdW5jdGlvblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCB1cGRhdGUgaXRlbSdzIHN0eWxlcywgYmFzZWQgb24gdGhlIGRvY3VtZW50IHNjcm9sbCB2YWx1ZSBhbmQgdGhlIGl0ZW0ncyBwb3NpdGlvbiBvbiB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0uaXNWaXNpYmxlICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGl0ZW0uaW5zaWRlVmlld3BvcnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmluc2lkZVZpZXdwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5zaWRlVmlld3BvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxvb3BcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4gdGhpcy5yZW5kZXIoKSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJlbG9hZEltYWdlcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcbiAgICAgICAgICAgIGltYWdlc0xvYWRlZCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5wYXJhbGxheC1pbWcnICksIHsgYmFja2dyb3VuZDogdHJ1ZSB9LCByZXNvbHZlICk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgXG4gICAgcHJlbG9hZEltYWdlcygpLnRoZW4oICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCAnaXMtbG9hZGluZycgKTtcbiAgICAgICAgZ2V0UGFnZVlTY3JvbGwoKTtcbiAgICAgICAgbGFzdFNjcm9sbCA9IGRvY1Njcm9sbDtcblxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgJiYgalF1ZXJ5KCAnYm9keScgKS5pcyggJy5oYXMtcGFyYWxsYXgnICkgKSB7XG4gICAgICAgICAgICBwYWdlU2Nyb2xsID0gbmV3IFNtb290aFNjcm9sbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnLmpzLXJlcGx5JyApICkge1xuICAgICAgICAkKCAnLmpzLXJlcGx5JyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBtZSBcdCAgICA9ICQoIHRoaXMgKSxcblx0XHRcdFx0Y29tbWVudCA9IG1lLmNsb3Nlc3QoICcuY29tbWVudCcgKSxcblx0XHRcdFx0bmFtZSAgICA9IGNvbW1lbnQuYXR0ciggJ2RhdGEtbmFtZScgKSxcblx0XHRcdFx0cGFyZW50ICA9IGNvbW1lbnQuYXR0ciggJ2RhdGEtcGFyZW50JyApLFxuXHRcdFx0XHRyZXBseSAgID0gJCggJy5qcy1jb21tZW50LXJlcGx5JyApO1xuXG4gICAgICAgICAgICAkKCAnI2Z0XzVmOGRiNWYzMjY3MzUnICkudmFsKCBwYXJlbnQgKTtcblxuICAgICAgICAgICAgcGFnZV9zY3JvbGwoIHJlcGx5ICk7XG5cbiAgICAgICAgICAgXHQkKCAnPGRpdiBjbGFzcz1cImFsZXJ0IGlzLWluZm9cIj4nICsgcmVwbHkuYXR0ciggJ2RhdGEtcmVwbHknICkgKyAnICcgKyBuYW1lICsgJyA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2xvc2UganMtcmVzZXQtcmVwbHlcIj4mdGltZXM7PC9hPjwvZGl2PicgKS5pbnNlcnRBZnRlciggcmVwbHkuZmluZCggJ2gzJyApICk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cdCQoIGRvY3VtZW50ICkub24oICdjbGljaycsICcuanMtcmVzZXQtcmVwbHknLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbWUgXHQgID0gJCggdGhpcyApLFxuXHRcdFx0cmVwbHkgPSBtZS5jbG9zZXN0KCAnLmFsZXJ0JyApO1xuXG5cdFx0JCggJyNmdF81ZjhkYjVmMzI2NzM1JyApLnZhbCggJzAnICk7XG5cblx0XHRyZXBseS5mYWRlT3V0KCAzMDAsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCggdGhpcyApLnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KTtcblxuICAgIGZ1bmN0aW9uIHBhZ2Vfc2Nyb2xsKCBhbmNob3IgKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAkKCAnLmpzLWhlYWRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzICkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gJCggJy5qcy1ob2xkZXInICkub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoICdodG1sLCBib2R5JyApLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBhbmNob3Iub2Zmc2V0KCkudG9wIC0gb2Zmc2V0XG4gICAgICAgIH0sIDgwMCApO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICBpZiAoICQoICcuanMtZmFxJyApICkge1xuICAgICAgICAkKCAnLmpzLWZhcScgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICkuY2xvc2VzdCggJy5mYXEtaXRlbScgKTtcblxuICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgbWUuZmluZCggJy5mYXEtYW5zd2VyJyApLnNsaWRlVXAoIDIwMCApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIG1lLmZpbmQoICcuZmFxLWFuc3dlcicgKS5zbGlkZURvd24oIDIwMCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNjcm9sbC5zZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnaW5wdXRbdHlwZT1maWxlXScgKSApIHtcbiAgICAgICAgLypcbiAgICAgICAgICogSW5pdFxuICAgICAgICAgKi9cbiAgICAgICAgJCggJ2lucHV0W3R5cGU9ZmlsZV0nICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgIGlucHV0LndyYXAoICc8ZGl2IGNsYXNzPVwiZmlsZVwiPjwvZGl2PicgKTtcblxuICAgICAgICAgICAgdmFyIGZpbGUgICAgICAgID0gaW5wdXQuY2xvc2VzdCggJy5maWxlJyApLFxuICAgICAgICAgICAgICAgIGxhYmVsICAgICAgID0gaW5wdXQuYXR0ciggJ2RhdGEtbGFiZWwnICksXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgPSBpbnB1dC5hdHRyKCAnZGF0YS1wbGFjZWhvbGRlcicgKTtcblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgbGFiZWwgPT09ICd1bmRlZmluZWQnIHx8IGxhYmVsID09ICcnICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gJ1BhcmNvdXJpcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBsYWNlaG9sZGVyID09PSAndW5kZWZpbmVkJyB8fCBwbGFjZWhvbGRlciA9PSAnJyApIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmlzKCAnOmRpc2FibGVkJyApICkge1xuICAgICAgICAgICAgICAgIGZpbGUuYWRkQ2xhc3MoICdpcy1kaXNhYmxlZCcgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlsZS5wcmVwZW5kKCAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFya1wiPicgKyBsYWJlbCArICc8L2J1dHRvbj48ZGl2IGNsYXNzPVwiZmlsZS1zZWxlY3RlZFwiPicgKyBwbGFjZWhvbGRlciArICc8L2Rpdj4nICk7XG4gICAgICAgICAgICBmaWxlLmFwcGVuZCggJzxhIGNsYXNzPVwiZmlsZS1yZW1vdmUganMtZmlsZS1yZW1vdmVcIj4mdGltZXM7PC9hPicgKTtcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAqIEJyb3dzZSBidXR0b24gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuZmlsZScgKS5maW5kKCAnYnV0dG9uJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBmaWxlICA9IGJ0bi5jbG9zZXN0KCAnLmZpbGUnICksXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBmaWxlLmZpbmQoICdpbnB1dCcgKTtcblxuICAgICAgICAgICAgaW5wdXQuY2xpY2soKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIFJlbW92ZSBidXR0b24gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuZmlsZScgKS5maW5kKCAnLmpzLWZpbGUtcmVtb3ZlJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gICAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBmaWxlICAgICA9IGJ0bi5jbG9zZXN0KCAnLmZpbGUnICksXG4gICAgICAgICAgICAgICAgaW5wdXQgICAgPSBmaWxlLmZpbmQoICdpbnB1dCcgKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZpbGUuZmluZCggJy5maWxlLXNlbGVjdGVkJyApO1xuXG4gICAgICAgICAgICBpbnB1dC52YWwoICcnICkuY2hhbmdlKCk7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkLnRleHQoIGlucHV0LmF0dHIoICdkYXRhLXBsYWNlaG9sZGVyJyApICk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDaGFuZ2UgZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuZmlsZScgKS5maW5kKCAnaW5wdXQnICkub24oICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBmaWxlICAgICA9IGlucHV0LmNsb3Nlc3QoICcuZmlsZScgKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZpbGUuZmluZCggJy5maWxlLXNlbGVjdGVkJyApO1xuXG4gICAgICAgICAgICBpZiggaW5wdXQudmFsKCkgIT09ICcnICkge1xuICAgICAgICAgICAgICAgIGZpbGUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsZS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5hbWVzID0gJyc7XG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dC5nZXQoMCkuZmlsZXMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpID4gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMgKz0gJywgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZXMgKz0gaW5wdXQuZ2V0KDApLmZpbGVzW2ldLm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdGVkLnRleHQoIG5hbWVzICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgbWFwLFxuICAgICAgICBpbmZvX3dpbmRvd3MgPSBbXSxcbiAgICAgICAgZWxlbWVudHMgICAgID0gW10sXG4gICAgICAgIGljb24gICAgICAgICA9IGJyYXZhZC50ZW1wbGF0ZV91cmwgKyAnL2Fzc2V0cy9pbWcvcGluLnN2Zyc7XG5cbiAgICBmdW5jdGlvbiBuZXdfbWFwKCAkZWwgKSB7XG4gICAgICAgIHZhciAkbWFya2VycyA9ICRlbC5maW5kKCAnLmpzLW1hcmtlcicgKTtcblxuICAgICAgICB2YXIgc3R5bGVkTWFwVHlwZSA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWY1ZjVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYxNjE2MVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LnN0cm9rZVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjVmNWY1XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmRiZGJkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlZWVlZWVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNzU3NTc1XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U1ZTVlNVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzllOWU5ZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNzU3NTc1XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkYWRhZGFcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjE2MTYxXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM5ZTllOWVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LmxpbmVcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U1ZTVlNVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQuc3RhdGlvblwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZWVlZWVlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2M5YzljOVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzllOWU5ZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAge25hbWU6ICdTdHlsZWQgTWFwJ30pO1xuXG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgem9vbSA6IDE0LFxuICAgICAgICAgICAgY2VudGVyIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygwLCAwKSxcbiAgICAgICAgICAgIG1hcFR5cGVJZCA6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgICAgc2Nyb2xsd2hlZWwgOiBmYWxzZSxcbiAgICAgICAgICAgIHBhbkNvbnRyb2wgOiBmYWxzZSxcbiAgICAgICAgICAgIHBhbkNvbnRyb2xPcHRpb25zIDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHpvb21Db250cm9sIDogdHJ1ZSxcbiAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHN0eWxlIDogZ29vZ2xlLm1hcHMuWm9vbUNvbnRyb2xTdHlsZS5MQVJHRSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfUklHSFRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbCA6IGZhbHNlLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zIDoge1xuICAgICAgICAgICAgICAgIG1hcFR5cGVJZHMgOiBbZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsICdzdHlsZWRfbWFwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxuICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRVSSA6IHRydWVcbiAgICAgICAgfTtcbiAgICAgXG4gICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoICRlbFswXSwgYXJncyApO1xuXG4gICAgICAgIG1hcC5tYXBUeXBlcy5zZXQoICdzdHlsZWRfbWFwJywgc3R5bGVkTWFwVHlwZSApO1xuICAgICAgICBtYXAuc2V0TWFwVHlwZUlkKCAnc3R5bGVkX21hcCcgKTtcblxuICAgICAgICBtYXAubWFya2VycyA9IFtdO1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICRtYXJrZXJzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAnX2lkJzogcGFyc2VJbnQoIG1lLmF0dHIoICdkYXRhLWlkJyApICksXG4gICAgICAgICAgICAgICAgJ190aXRsZSc6IG1lLmF0dHIoICdkYXRhLXRpdGxlJyApLFxuICAgICAgICAgICAgICAgICdfYWRkcmVzcyc6IG1lLmF0dHIoICdkYXRhLWFkZHJlc3MnICksXG4gICAgICAgICAgICAgICAgJ19lbWFpbCc6IG1lLmF0dHIoICdkYXRhLWVtYWlsJyApLFxuICAgICAgICAgICAgICAgICdfcGhvbmUnOiBtZS5hdHRyKCAnZGF0YS1waG9uZScgKSxcbiAgICAgICAgICAgICAgICAnX2xhdCc6IG1lLmF0dHIoICdkYXRhLWxhdCcgKSxcbiAgICAgICAgICAgICAgICAnX2xuZyc6IG1lLmF0dHIoICdkYXRhLWxuZycgKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZWxlbWVudHMucHVzaCggZWxlbWVudCApO1xuICAgICAgICB9KTtcblxuICAgICAgICAkbWFya2Vycy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgYWRkX21hcmtlciggbWUsIG1hcCApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjZW50ZXJfbWFwKCBtYXAgKTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9tYXJrZXIoICRtYXJrZXIsIG1hcCApIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoICRtYXJrZXIuYXR0ciggJ2RhdGEtbGF0JyApLCAkbWFya2VyLmF0dHIoICdkYXRhLWxuZycgKSApO1xuXG4gICAgICAgIHZhciBwaW4gPSB7XG4gICAgICAgICAgICB1cmw6IGJyYXZhZC50ZW1wbGF0ZV91cmwgKyAnL2Fzc2V0cy9pbWcvcGluLnN2ZycsXG4gICAgICAgICAgICBzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggNDUsIDU0ICksXG4gICAgICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSggNDUsIDU0ICksXG4gICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCggMjIsIDU0IClcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGxhdGxuZyxcbiAgICAgICAgICAgIG1hcCA6IG1hcCxcbiAgICAgICAgICAgIGljb24gOiBwaW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFwLm1hcmtlcnMucHVzaCggbWFya2VyICk7XG5cbiAgICAgICAgdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG4gICAgICAgICAgICBjb250ZW50IDogJG1hcmtlci5odG1sKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW5mb193aW5kb3dzLnB1c2goIGluZm93aW5kb3cgKTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lciggbWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsb3NlX2luZm93aW5kb3coKTtcblxuICAgICAgICAgICAgaW5mb3dpbmRvdy5vcGVuKCBtYXAsIG1hcmtlciApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZV9pbmZvd2luZG93KCkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGluZm9fd2luZG93c1tpXS5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2VudGVyX21hcCggbWFwICkge1xuICAgICAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgICAgICQuZWFjaCggbWFwLm1hcmtlcnMsIGZ1bmN0aW9uKCBpLCBtYXJrZXIgKSB7XG4gICAgICAgICAgICB2YXIgbGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggbWFya2VyLnBvc2l0aW9uLmxhdCgpLCBtYXJrZXIucG9zaXRpb24ubG5nKCkgKTtcblxuICAgICAgICAgICAgYm91bmRzLmV4dGVuZCggbGF0bG5nICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICggbWFwLm1hcmtlcnMubGVuZ3RoID09IDEgKSB7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKCBib3VuZHMuZ2V0Q2VudGVyKCkgKTtcbiAgICAgICAgICAgIG1hcC5zZXRab29tKCAxNSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKCBib3VuZHMgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcCA9IG51bGw7XG5cbiAgICAkKCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCggJy5qcy1tYXAnICkuZWFjaCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIG1hcCA9IG5ld19tYXAoICQoIHRoaXMgKSApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICAkLmZuLmJyYXZhZF9udW1iZXIgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAgICAgLypcbiAgICAgICAgICogSW5pdFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgICAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgY3Vycl92YWwgPSBwYXJzZUludCggaW5wdXQudmFsKCkgKSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9taW51cyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9wbHVzO1xuXG4gICAgICAgICAgICBpbnB1dC53cmFwKCAnPGRpdiBjbGFzcz1cIm51bWJlciBqcy1udW1iZXJcIj48L2Rpdj4nICk7XG5cbiAgICAgICAgICAgIHZhciBudW1iZXIgPSBpbnB1dC5jbG9zZXN0KCAnLmpzLW51bWJlcicgKTtcblxuICAgICAgICAgICAgaWYgKCBpbnB1dC5hdHRyKCAnZGF0YS1wb3NpdGlvbicgKSA9PSAnbGVmdCcgKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyLmFkZENsYXNzKCAnbnVtYmVyLWxlZnQnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggaW5wdXQuaXMoICc6ZGlzYWJsZWQnICkgKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyLmFkZENsYXNzKCAnaXMtZGlzYWJsZWQnICk7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfbWludXMgPSAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9wbHVzICA9ICdkaXNhYmxlZD1cImRpc2FibGVkXCInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCBjdXJyX3ZhbCA8PSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21pbicgKSApICkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVkX21pbnVzID0gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggY3Vycl92YWwgPj0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtYXgnICkgKSApIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9wbHVzID0gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBBcHBlbmQgYnV0dG9ucyB0byB0aGUgd3JhcHBlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBudW1iZXIucHJlcGVuZCggJzxidXR0b24gY2xhc3M9XCJudW1iZXItbWludXNcIicgKyBkaXNhYmxlZF9taW51cyArICc+LTwvYnV0dG9uPicgKTtcbiAgICAgICAgICAgIG51bWJlci5hcHBlbmQoICc8YnV0dG9uIGNsYXNzPVwibnVtYmVyLXBsdXNcIicgKyBkaXNhYmxlZF9wbHVzICsgJz4rPC9idXR0b24+JyApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIE1pbnVzIGJ1dHRvbiBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5qcy1udW1iZXInICkuZmluZCggJy5udW1iZXItbWludXMnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJ0biAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBidG4uY2xvc2VzdCggJy5udW1iZXInICksXG4gICAgICAgICAgICAgICAgaW5wdXQgID0gbnVtYmVyLmZpbmQoICdpbnB1dCcgKSxcbiAgICAgICAgICAgICAgICB2YWwgICAgPSBwYXJzZUludCggaW5wdXQudmFsKCkgKSxcbiAgICAgICAgICAgICAgICBzdGVwICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ3N0ZXAnICkgKSxcbiAgICAgICAgICAgICAgICBtaW4gICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21pbicgKSApLFxuICAgICAgICAgICAgICAgIG1heCAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWF4JyApICksXG4gICAgICAgICAgICAgICAgbmV3X3ZhbDtcblxuICAgICAgICAgICAgbmV3X3ZhbCA9IHZhbCAtIHN0ZXA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlucHV0XG4gICAgICAgICAgICAgICAgLnZhbCggbmV3X3ZhbCApXG4gICAgICAgICAgICAgICAgLmNoYW5nZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogUGx1cyBidXR0b24gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuanMtbnVtYmVyJyApLmZpbmQoICcubnVtYmVyLXBsdXMnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJ0biAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBidG4uY2xvc2VzdCggJy5udW1iZXInICksXG4gICAgICAgICAgICAgICAgaW5wdXQgID0gbnVtYmVyLmZpbmQoICdpbnB1dCcgKSxcbiAgICAgICAgICAgICAgICB2YWwgICAgPSBwYXJzZUludCggaW5wdXQudmFsKCkgKSxcbiAgICAgICAgICAgICAgICBzdGVwICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ3N0ZXAnICkgKSxcbiAgICAgICAgICAgICAgICBtaW4gICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21pbicgKSApLFxuICAgICAgICAgICAgICAgIG1heCAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWF4JyApICksXG4gICAgICAgICAgICAgICAgbmV3X3ZhbDtcblxuICAgICAgICAgICAgbmV3X3ZhbCA9IHZhbCArIHN0ZXA7XG5cbiAgICAgICAgICAgIGlucHV0XG4gICAgICAgICAgICAgICAgLnZhbCggbmV3X3ZhbCApXG4gICAgICAgICAgICAgICAgLmNoYW5nZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogQ2hhbmdlIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmpzLW51bWJlcicgKS5maW5kKCAnaW5wdXQnICkub24oICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgbnVtYmVyID0gaW5wdXQuY2xvc2VzdCggJy5udW1iZXInICksXG4gICAgICAgICAgICAgICAgdmFsICAgID0gcGFyc2VJbnQoIGlucHV0LnZhbCgpICksXG4gICAgICAgICAgICAgICAgbWluICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtaW4nICkgKSxcbiAgICAgICAgICAgICAgICBtYXggICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21heCcgKSApO1xuXG4gICAgICAgICAgICBpZiAoIHZhbCA+PSBtYXggKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLm51bWJlci1wbHVzJyApXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCAnZGlzYWJsZWQnLCB0cnVlICk7XG5cbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoIG1heCApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAuZmluZCggJy5udW1iZXItcGx1cycgKVxuICAgICAgICAgICAgICAgICAgICAucHJvcCggJ2Rpc2FibGVkJywgZmFsc2UgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCB2YWwgPD0gbWluICkge1xuICAgICAgICAgICAgICAgIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAuZmluZCggJy5udW1iZXItbWludXMnIClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoICdkaXNhYmxlZCcsIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKCBtaW4gKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcubnVtYmVyLW1pbnVzJyApXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCAnZGlzYWJsZWQnLCBmYWxzZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQoIHdpbmRvdyApLm9uKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXJsUGFyYW1ldGVyID0gZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKCBzUGFyYW0gKSB7XG4gICAgICAgICAgICB2YXIgc1BhZ2VVUkwgPSBkZWNvZGVVUklDb21wb25lbnQoIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpICksXG4gICAgICAgICAgICAgICAgc1VSTFZhcmlhYmxlcyA9IHNQYWdlVVJMLnNwbGl0KCAnJicgKSxcbiAgICAgICAgICAgICAgICBzUGFyYW1ldGVyTmFtZSxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCAnPScgKTtcblxuICAgICAgICAgICAgICAgIGlmICggc1BhcmFtZXRlck5hbWVbMF0gPT09IHNQYXJhbSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhbmNob3IgPSBnZXRVcmxQYXJhbWV0ZXIoICdzZWN0aW9uJyApO1xuXG4gICAgICAgIGlmICggdHlwZW9mIGFuY2hvciAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwYWdlX3Njcm9sbCggJyMnICsgYW5jaG9yICk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFkZGVkID0gZ2V0VXJsUGFyYW1ldGVyKCAnYWRkLXRvLWNhcnQnICk7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgYWRkZWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoICcud29vY29tbWVyY2UtbWVzc2FnZScgKS5jbG9zZXN0KCAnLmJsb2NrJyApO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwYWdlX3Njcm9sbCggdGFyZ2V0ICk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCAnYS5qcy1zY3JvbGxbaHJlZl49XCIjXCJdJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBhbmNob3IgPSAkLmF0dHIoIHRoaXMsICdocmVmJyApO1xuXG4gICAgICAgIHBhZ2Vfc2Nyb2xsKCBhbmNob3IgKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHBhZ2Vfc2Nyb2xsKCBhbmNob3IgKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAkKCAnLmpzLWhlYWRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzICkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gJCggJy5qcy1ob2xkZXInICkub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoICdodG1sLCBib2R5JyApLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCBhbmNob3IgKS5vZmZzZXQoKS50b3AgLSBvZmZzZXRcbiAgICAgICAgfSwgODAwICk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQoICcuanMtaGVhZGVyIC5qcy1zZWFyY2gnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzID09IHRydWUgKSB7XG4gICAgICAgICAgICBpZiAoICEgbWUuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5hZGRDbGFzcyggJ3NlYXJjaC1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgICAgICAkKCAnLmpzLW5hdiAubWVudS1pdGVtLWhhcy1jaGlsZHJlbicgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLnN1Yi1tZW51JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCggMjAwICk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCAkKCAnLnNlYXJjaC1maWVsZCcgKS52YWwoKSA9PSAnJyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5zZWFyY2gtZmllbGQnICkudmFsKCkgPT0gJycgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoICcuanMtc2VhcmNoLWZvcm0nICkub24oICdzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgIGlmICggbWUuZmluZCggJy5zZWFyY2gtZmllbGQnICkudmFsKCkgPT0gJycgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIHdpbmRvdyApLm9uKCAncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsb3NlX3NlYXJjaCgpO1xuICAgIH0pO1xuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggaXNfbGcubWF0Y2hlcyA9PSB0cnVlICkge1xuICAgICAgICAgICAgY2xvc2Vfc2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICcuanMtc2VhcmNoLWZvcm0nLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY2xvc2Vfc2VhcmNoKCkge1xuICAgICAgICAkKCAnLmpzLXNlYXJjaCcgKS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnc2VhcmNoLW9wZW5lZCcgKTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnc2VsZWN0JyApICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICAkKCAnc2VsZWN0JyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdCAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgY3VyclZhbCA9IHNlbGVjdC5maW5kKCAnb3B0aW9uOnNlbGVjdGVkJyApLnRleHQoKSxcbiAgICAgICAgICAgICAgICBjbGFzc2VzO1xuXG4gICAgICAgICAgICBpZiAoIHNlbGVjdC5pcyggJyNyYXRpbmcnICkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBzZWxlY3QuYXR0ciggJ2NsYXNzJyApICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gJyAnICsgc2VsZWN0LmF0dHIoICdjbGFzcycgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3RcbiAgICAgICAgICAgICAgICAud3JhcCggJzxkaXYgY2xhc3M9XCJzZWxlY3QnICsgY2xhc3NlcyArICdcIj48L2Rpdj4nIClcbiAgICAgICAgICAgICAgICAuY3NzKCAnb3BhY2l0eScsICcwJyApO1xuXG4gICAgICAgICAgICBzZWxlY3QuY2xvc2VzdCggJy5zZWxlY3QnICkuYXBwZW5kKCAnPHNwYW4gY2xhc3M9XCJzZWxlY3QtY2hvaWNlXCI+PC9zcGFuPicgKTtcbiAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5maW5kKCAnLnNlbGVjdC1jaG9pY2UnICkudGV4dCggY3VyclZhbCApO1xuXG4gICAgICAgICAgICBpZiAoIHNlbGVjdC5pcyggJy5pcy1kYW5nZXInICkgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtZGFuZ2VyJyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHNlbGVjdC5pcyggJy5pcy1zdWNjZXNzJyApICkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5hZGRDbGFzcyggJ2lzLXN1Y2Nlc3MnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnOmRpc2FibGVkJyApICkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5hZGRDbGFzcyggJ2lzLWRpc2FibGVkJyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIENoYW5nZSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkub24oICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3QgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGN1cnJWYWwgPSBzZWxlY3QuZmluZCggJ29wdGlvbjpzZWxlY3RlZCcgKS50ZXh0KCk7XG5cbiAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5maW5kKCAnLnNlbGVjdC1jaG9pY2UnICkudGV4dCggY3VyclZhbCApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgdmFyIHNsaWRlc2hvdyA9IFtdO1xuXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggJCggJy5qcy1iYWNrZ3JvdW5kLXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAkKCAnLmpzLWJhY2tncm91bmQtc3dpcGVyJyApLmVhY2goIGZ1bmN0aW9uKCBpLCBvYmogKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldID0gbmV3IFN3aXBlciggb2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDgwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbG9zZXN0KCAnLmpzLWJhY2tncm91bmQnICkuZmluZCggJy5qcy1uZXh0JyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldLnNsaWRlTmV4dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtYmFja2dyb3VuZCcgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICQoICcuanMtcG9zdHMtc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICQoICcuanMtcG9zdHMtc3dpcGVyJyApLmVhY2goIGZ1bmN0aW9uKCBpLCBvYmogKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldID0gbmV3IFN3aXBlciggb2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA4MDAsXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbDogJy5qcy1uZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZFbDogJy5qcy1wcmV2JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1wb3N0cycgKS5maW5kKCAnLmpzLW5leHQnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVOZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1wb3N0cycgKS5maW5kKCAnLmpzLXByZXYnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVQcmV2KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ2FsbGVyeV90aHVtYm5haWwsXG4gICAgICAgICAgICBnYWxsZXJ5X3N3aXBlcjtcblxuICAgICAgICBpZiAoICQoICcuanMtdGh1bWJuYWlsLXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBnYWxsZXJ5X3RodW1ibmFpbCA9IG5ldyBTd2lwZXIoICcuanMtdGh1bWJuYWlsLXN3aXBlcicsIHtcbiAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICBzcGVlZDogODAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1nYWxsZXJ5LXN3aXBlcicgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBnYWxsZXJ5X3N3aXBlciA9IG5ldyBTd2lwZXIoICcuanMtZ2FsbGVyeS1zd2lwZXInLCB7XG4gICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDgwMCxcbiAgICAgICAgICAgICAgICB0aHVtYnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyOiBnYWxsZXJ5X3RodW1ibmFpbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy10YWJzJyApICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICAkKCAnLmpzLXRhYnMnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGFicyA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgdGFicy5maW5kKCAnLnRhYnMtbmF2IGEnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBtZS5hdHRyKCAnaHJlZicgKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggdGFyZ2V0IClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBDbGljayBldmVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9KS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lICAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gbWUuYXR0ciggJ2hyZWYnICksXG4gICAgICAgICAgICAgICAgICAgIG5hdiAgICA9IHRhYnMuZmluZCggJy50YWJzLW5hdicgKSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQgID0gMzAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCAhIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmZpbmQoICdhJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggJy50YWJzLWl0ZW0uaXMtYWN0aXZlJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWRlT3V0KCBzcGVlZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFic1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCggdGFyZ2V0IClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhZGVJbiggc3BlZWQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy10b2dnbGUnICkgKSB7XG4gICAgICAgICQoICcuanMtdG9nZ2xlJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSAgICAgPSAkKCB0aGlzICksIFxuICAgICAgICAgICAgICAgIHRhcmdldCA9IG1lLm5leHQoKTtcblxuICAgICAgICAgICAgaWYgKCBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNsaWRlVXAoIDIwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2xpZGVEb3duKCAyMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XHJcblxyXG5cdCQoIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCBpc19tZC5tYXRjaGVzICkge1xyXG5cdFx0XHQkKCAnaW5wdXRbdHlwZT1udW1iZXJdJyApLmJyYXZhZF9udW1iZXIoKTtcclxuICAgICAgICB9XHJcblx0fSk7XHJcblxyXG5cdCQoIGRvY3VtZW50LmJvZHkgKS5vbiggJ2FkZGVkX3RvX2NhcnQgdXBkYXRlZF93Y19kaXYnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICggaXNfbWQubWF0Y2hlcyApIHtcclxuXHRcdFx0JCggJy53b29jb21tZXJjZS1jYXJ0LWZvcm0gaW5wdXRbdHlwZT1udW1iZXJdJyApLmJyYXZhZF9udW1iZXIoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHQgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xyXG5cdFx0ICAgIH0sIDMwMCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KGpRdWVyeSkpO1xyXG4iXX0=
