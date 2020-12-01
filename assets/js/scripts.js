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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLmpzIiwiY29va2llcy5qcyIsIm5hdmlnYXRpb24uanMiLCJzY3JvbGxpbmcuanMiLCJjb21tZW50LmpzIiwiZmFxLmpzIiwiZmlsZS5qcyIsImdvb2dsZS1tYXAuanMiLCJudW1iZXIuanMiLCJzY3JvbGwuanMiLCJzZWFyY2guanMiLCJzZWxlY3QuanMiLCJzbGlkZXNob3cuanMiLCJ0YWJzLmpzIiwidG9nZ2xlLmpzIiwiZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzX3hzLCBpc19zbSwgaXNfbWQsIGlzX2xnLCBpc194bCwgaXNfeHhsO1xuXG5pZiAoIG1hdGNoTWVkaWEgKSB7XG4gICAgdmFyIGlzX3hzICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogMHB4KScgKSxcbiAgICAgICAgaXNfc20gID0gd2luZG93Lm1hdGNoTWVkaWEoICcobWluLXdpZHRoOiA1NzZweCknICksXG4gICAgICAgIGlzX21kICA9IHdpbmRvdy5tYXRjaE1lZGlhKCAnKG1pbi13aWR0aDogNzY4cHgpJyApLFxuICAgICAgICBpc19sZyAgPSB3aW5kb3cubWF0Y2hNZWRpYSggJyhtaW4td2lkdGg6IDk5MnB4KScgKSxcbiAgICAgICAgaXNfeGwgID0gd2luZG93Lm1hdGNoTWVkaWEoICcobWluLXdpZHRoOiAxMjAwcHgpJyApO1xufVxuIiwiKGZ1bmN0aW9uKCQpIHtcbiAgICBcbiAgICAkKCB3aW5kb3cgKS5vbiggJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBzZXNzaW9uU3RvcmFnZSApIHtcbiAgICAgICAgICAgIHZhciBjb29raWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCAnY29va2llcycgKTtcblxuICAgICAgICAgICAgaWYgKCBjb29raWUgPT0gbnVsbCB8fCBjb29raWUgPT0gJ3RydWUnICkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oICdjb29raWVzJywgJ3RydWUnICk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJCggJy5qcy1jb29raWVzJyApLmFkZENsYXNzKCAncmV2ZWFsJyApO1xuICAgICAgICAgICAgICAgIH0sIDUwMCApO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBjb29raWUgPT0gJ2ZhbHNlJyApIHtcbiAgICAgICAgICAgICAgICAkKCAnLmpzLWNvb2tpZXMnICkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoICcuanMtY29va2llcyAuYnRuJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSggJ2Nvb2tpZXMnLCAnZmFsc2UnICk7XG5cbiAgICAgICAgJCggJy5qcy1jb29raWVzJyApLnJlbW92ZUNsYXNzKCAncmV2ZWFsJyApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCggJy5qcy1jb29raWVzJyApLnJlbW92ZSgpO1xuICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgdmFyIG1vYmlsZSAgPSB0cnVlLFxuICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG5cbiAgICAkKCB3aW5kb3cgKS5vbiggJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3dpdGNoX25hdigpO1xuICAgICAgICBzY3JvbGxfY2xhc3NlcygpO1xuICAgIH0pO1xuXG4gICAgJCggd2luZG93ICkub24oICdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCggJy5qcy1zaXRlJyApLmFkZENsYXNzKCAnaXMtcmVzaXplJyApO1xuXG4gICAgICAgIGlmICggdGltZW91dCA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnaXMtcmVzaXplJyApO1xuICAgICAgICAgICAgfSwgMzAwICk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2hfbmF2KCk7XG4gICAgfSk7XG5cbiAgICAkKCB3aW5kb3cgKS5vbiggJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzY3JvbGxfY2xhc3NlcygpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2Nyb2xsX2NsYXNzZXMoKSB7XG4gICAgICAgIGlmICggd2luZG93LnNjcm9sbFkgPj0gMTAwICkge1xuICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLmFkZENsYXNzKCAnbmF2LXN0aWNreScgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnbmF2LXN0aWNreScgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN3aXRjaF9uYXYoKSB7XG4gICAgICAgIGlmICggaXNfbGcubWF0Y2hlcyA9PSB0cnVlICYmIG1vYmlsZSA9PSB0cnVlICkge1xuICAgICAgICAgICAgbW9iaWxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICggJCggJy5qcy1zaXRlJyApLmlzKCAnLm5hdi1vcGVuZWQnICkgKSB7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnbmF2LW9wZW5lZCcgKTtcbiAgICAgICAgICAgICAgICAkKCAnLmpzLW5hdi1vcGVuZXInICkucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsWSA9ICQoICdib2R5JyApLmNzcyggJ3RvcCcgKTtcblxuICAgICAgICAgICAgICAgICQoICdib2R5JyApLnJlbW92ZUF0dHIoICdzdHlsZScgKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyggMCwgcGFyc2VJbnQoIHNjcm9sbFkgfHwgJzAnICkgKiAtMSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCAnLmpzLXNlY29uZGFyeS1uYXYnIClcbiAgICAgICAgICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgICAgICAgICAucHJlcGVuZFRvKCAnLmpzLWhlYWRlciA+IC5jb250YWluZXInICk7XG5cbiAgICAgICAgICAgICQoICcuanMtc2hvcC1uYXYnIClcbiAgICAgICAgICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oICcuanMtcHJpbWFyeS1uYXYnICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggaXNfbGcubWF0Y2hlcyA9PSBmYWxzZSAmJiBtb2JpbGUgPT0gZmFsc2UgKSB7XG4gICAgICAgICAgICBtb2JpbGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAkKCAnLmpzLXNlY29uZGFyeS1uYXYnIClcbiAgICAgICAgICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoICcuanMtcHJpbWFyeS1uYXYnICk7XG5cbiAgICAgICAgICAgICQoICcuanMtc2hvcC1uYXYnIClcbiAgICAgICAgICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oICcuanMtaGVhZGVyJyApO1xuICAgICAgICB9XG5cbiAgICAgICAgJCggJy5zaXRlJyApLmFkZENsYXNzKCAnaXMtc2hvd24nICk7XG4gICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcGFnZVNjcm9sbC5zZXRTaXplKCk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCggJy5qcy1uYXYtb3BlbmVyJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgIGlmICggbWUuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgbWUucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVDbGFzcyggJ25hdi1vcGVuZWQnICk7XG5cbiAgICAgICAgICAgICQoICcuanMtbmF2IC5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgICAgIG1lXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCggJy5zdWItbWVudScgKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCggMjAwICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHNjcm9sbFkgPSAkKCAnYm9keScgKS5jc3MoICd0b3AnICk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBzY3JvbGxZICk7XG5cbiAgICAgICAgICAgICQoICdib2R5JyApLnJlbW92ZUF0dHIoICdzdHlsZScgKTtcbiAgICAgICAgICAgICQoICcuanMtc2l0ZScgKS5yZW1vdmVBdHRyKCAnc3R5bGUnICk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyggMCwgcGFyc2VJbnQoIHNjcm9sbFkgfHwgJzAnICkgKiAtMSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLmFkZENsYXNzKCAnbmF2LW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgJCggJ2JvZHknIClcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJyA6ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnLScgKyB3aW5kb3cuc2Nyb2xsWSArICdweCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgICQoICcubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIE1vZGVybml6ci50b3VjaGV2ZW50cyApIHtcbiAgICAgICAgICAgIHZhciBsaW5rID0gJCggdGhpcyApLnBhcmVudCgpLFxuICAgICAgICAgICAgICAgIHN1YiAgPSBsaW5rLmZpbmQoICc+IC5zdWItbWVudScgKTtcblxuICAgICAgICAgICAgaWYgKCBsaW5rLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICBsaW5rLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIHN1Yi5zbGlkZVVwKCAyMDAgKTtcbiAgICAgICAgICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICdzdWItb3BlbmVkJyApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpbmsuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgc3ViLnNsaWRlRG93biggMjAwICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLmFkZENsYXNzKCAnc3ViLW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggaXNfbGcubWF0Y2hlcyA9PSB0cnVlICkge1xuICAgICAgICAgICAgdmFyIGxpbmsgPSAkKCAnLm1lbnUgLmlzLWFjdGl2ZScgKSxcbiAgICAgICAgICAgICAgICBzdWIgID0gbGluay5maW5kKCAnLnN1Yi1tZW51JyApO1xuXG4gICAgICAgICAgICBsaW5rLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgc3ViLnNsaWRlVXAoIDIwMCApO1xuICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLnJlbW92ZUNsYXNzKCAnc3ViLW9wZW5lZCcgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgJy5qcy1oZWFkZXInLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpO1xuIiwidmFyIHBhZ2VTY3JvbGw7XG5cbntcbiAgICBjb25zdCBNYXRoVXRpbHMgPSB7XG4gICAgICAgIG1hcDogKCB4LCBhLCBiLCBjLCBkICkgPT4gKCB4IC0gYSApICogKCBkIC0gYyApIC8gKCBiIC0gYSApICsgYyxcbiAgICAgICAgbGVycDogKCBhLCBiLCBuICkgPT4gKCAxIC0gbiApICogYSArIG4gKiBiLFxuICAgICAgICBnZXRSYW5kb21GbG9hdDogKCBtaW4sIG1heCApID0+ICggTWF0aC5yYW5kb20oKSAqICggbWF4IC0gbWluICkgKyBtaW4gKS50b0ZpeGVkKCAyIClcbiAgICB9O1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgXG4gICAgLy8gY2FsY3VsYXRlIHRoZSB2aWV3cG9ydCBzaXplXG4gICAgbGV0IHdpbnNpemU7XG4gICAgY29uc3QgY2FsY1dpbnNpemUgPSAoKSA9PiB3aW5zaXplID0ge1xuICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIFxuICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIH07XG4gICAgY2FsY1dpbnNpemUoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgY2FsY1dpbnNpemUgKTtcbiAgICBcbiAgICAvLyBzY3JvbGwgcG9zaXRpb25cbiAgICBsZXQgZG9jU2Nyb2xsO1xuICAgIGxldCBsYXN0U2Nyb2xsO1xuICAgIGxldCBzY3JvbGxpbmdTcGVlZCA9IDA7XG5cbiAgICAvLyBzY3JvbGwgcG9zaXRpb24gdXBkYXRlIGZ1bmN0aW9uXG4gICAgY29uc3QgZ2V0UGFnZVlTY3JvbGwgPSAoKSA9PiBkb2NTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIGdldFBhZ2VZU2Nyb2xsICk7XG5cbiAgICBjbGFzcyBJdGVtIHtcbiAgICAgICAgY29uc3RydWN0b3IoIGVsICkge1xuICAgICAgICAgICAgdGhpcy5ET00gICAgICAgICAgICAgID0geyBlbDogZWwgfTtcbiAgICAgICAgICAgIHRoaXMuRE9NLmltYWdlICAgICAgICA9IHRoaXMuRE9NLmVsLnF1ZXJ5U2VsZWN0b3IoICcucGFyYWxsYXgtaW1hZ2UnICk7XG4gICAgICAgICAgICB0aGlzLkRPTS5pbWFnZVdyYXBwZXIgPSB0aGlzLkRPTS5pbWFnZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgdGhpcy5ET00udGl0bGUgICAgICAgID0gdGhpcy5ET00uZWwucXVlcnlTZWxlY3RvciggJy5wYXJhbGxheC10aXRsZScgKTtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlcyA9IHtcbiAgICAgICAgICAgICAgICAvLyBoZXJlIHdlIGRlZmluZSB3aGljaCBwcm9wZXJ0eSB3aWxsIGNoYW5nZSBhcyB3ZSBzY3JvbGwgdGhlIHBhZ2UgYW5kIHRoZSBpdGVtIGlzIGluc2lkZSB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2Ugd2Ugd2lsbCBiZTpcbiAgICAgICAgICAgICAgICAvLyAtIHNjYWxpbmcgdGhlIGlubmVyIGltYWdlXG4gICAgICAgICAgICAgICAgLy8gLSB0cmFuc2xhdGluZyB0aGUgaXRlbSdzIHRpdGxlXG4gICAgICAgICAgICAgICAgLy8gd2UgaW50ZXJwb2xhdGUgYmV0d2VlbiB0aGUgcHJldmlvdXMgYW5kIGN1cnJlbnQgdmFsdWUgdG8gYWNoaWV2ZSBhIHNtb290aCBlZmZlY3RcbiAgICAgICAgICAgICAgICBpbWFnZVRyYW5zbGF0aW9uWToge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91czogMCwgXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDAsIFxuICAgICAgICAgICAgICAgICAgICBlYXNlOiAwLjEsXG4gICAgICAgICAgICAgICAgICAgIGZyb21WYWx1ZTogLTEwMCxcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMucmVuZGVyZWRTdHlsZXMuaW1hZ2VUcmFuc2xhdGlvblkuZnJvbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9WYWx1ZSAgID0gLTEgKiBmcm9tVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgICAgICAgPSBNYXRoVXRpbHMubWFwKCB0aGlzLnByb3BzLnRvcCAtIGRvY1Njcm9sbCwgd2luc2l6ZS5oZWlnaHQsIC0xICogdGhpcy5wcm9wcy5oZWlnaHQsIGZyb21WYWx1ZSwgdG9WYWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbVZhbHVlIDwgMCA/IE1hdGgubWluKCBNYXRoLm1heCggdmFsLCBmcm9tVmFsdWUgKSwgdG9WYWx1ZSApIDogTWF0aC5tYXgoIE1hdGgubWluKCB2YWwsIGZyb21WYWx1ZSApLCB0b1ZhbHVlICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXRzIHRoZSBpdGVtJ3MgaGVpZ2h0IGFuZCB0b3AgKHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudClcbiAgICAgICAgICAgIHRoaXMuZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgICAgICAgLy8gdXNlIHRoZSBJbnRlcnNlY3Rpb25PYnNlcnZlciBBUEkgdG8gY2hlY2sgd2hlbiB0aGUgZWxlbWVudCBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBvbmx5IHRoZW4gdGhlIGVsZW1lbnQgc3R5bGVzIHdpbGwgYmUgdXBkYXRlZFxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlciggKCBlbnRyaWVzICkgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4gdGhpcy5pc1Zpc2libGUgPSBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKCB0aGlzLkRPTS5lbCApO1xuICAgICAgICAgICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgLy8gc2V0cyB0aGUgaW5pdGlhbCB2YWx1ZSAobm8gaW50ZXJwb2xhdGlvbilcbiAgICAgICAgICAgIGZvciAoIGNvbnN0IGtleSBpbiB0aGlzLnJlbmRlcmVkU3R5bGVzICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5wcmV2aW91cyA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnNldFZhbHVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IGNoYW5nZXMvc3R5bGVzXG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIGdldFNpemUoKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5ET00uZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0ge1xuICAgICAgICAgICAgICAgIC8vIGl0ZW0ncyBoZWlnaHRcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIC8vIG9mZnNldCB0b3AgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgdG9wOiBkb2NTY3JvbGwgKyByZWN0LnRvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpbml0RXZlbnRzKCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCAoKSA9PiB0aGlzLnJlc2l6ZSgpICk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzaXplKCkge1xuICAgICAgICAgICAgLy8gZ2V0cyB0aGUgaXRlbSdzIGhlaWdodCBhbmQgdG9wIChyZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnQpXG4gICAgICAgICAgICB0aGlzLmdldFNpemUoKTtcbiAgICAgICAgICAgIC8vIG9uIHJlc2l6ZSByZXNldCBzaXplcyBhbmQgdXBkYXRlIHN0eWxlc1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgYW5kIGludGVycG9sYXRlZCB2YWx1ZXNcbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHRoaXMucmVuZGVyZWRTdHlsZXMgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCA9IHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLnNldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMgPSBNYXRoVXRpbHMubGVycCggdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMsIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQsIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmVhc2UgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gYW5kIGFwcGx5IGNoYW5nZXNcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5b3V0KCkge1xuICAgICAgICAgICAgLy8gaW1hZ2VcbiAgICAgICAgICAgIHRoaXMuRE9NLmltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCggMCwgJHsgdGhpcy5yZW5kZXJlZFN0eWxlcy5pbWFnZVRyYW5zbGF0aW9uWS5wcmV2aW91cyB9cHgsIDAgKWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBTbW9vdGhTY3JvbGwge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuRE9NICAgICAgICAgICAgPSB7IG1haW46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuc2l0ZScgKSB9O1xuICAgICAgICAgICAgLy8gdGhlIHNjcm9sbGFibGUgZWxlbWVudFxuICAgICAgICAgICAgLy8gd2UgdHJhbnNsYXRlIHRoaXMgZWxlbWVudCB3aGVuIHNjcm9sbGluZyAoeS1heGlzKVxuICAgICAgICAgICAgdGhpcy5ET00uc2Nyb2xsYWJsZSA9IHRoaXMuRE9NLm1haW4ucXVlcnlTZWxlY3RvciggJy5zaXRlLXNjcm9sbCcgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdGhlIGl0ZW1zIG9uIHRoZSBwYWdlXG4gICAgICAgICAgICB0aGlzLml0ZW1zICAgICAgICAgID0gW107XG4gICAgICAgICAgICB0aGlzLkRPTS5jb250ZW50ICAgID0gdGhpcy5ET00ubWFpbi5xdWVyeVNlbGVjdG9yKCAnbWFpbicgKTtcbiAgICAgICAgICAgIFsgLi4udGhpcy5ET00uY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnBhcmFsbGF4JyApIF0uZm9yRWFjaCggaXRlbSA9PiB0aGlzLml0ZW1zLnB1c2goIG5ldyBJdGVtKCBpdGVtICkgKSApO1xuXG4gICAgICAgICAgICAvLyBoZXJlIHdlIGRlZmluZSB3aGljaCBwcm9wZXJ0eSB3aWxsIGNoYW5nZSBhcyB3ZSBzY3JvbGwgdGhlIHBhZ2VcbiAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB3ZSB3aWxsIGJlIHRyYW5zbGF0aW5nIG9uIHRoZSB5LWF4aXNcbiAgICAgICAgICAgIC8vIHdlIGludGVycG9sYXRlIGJldHdlZW4gdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50IHZhbHVlIHRvIGFjaGlldmUgdGhlIHNtb290aCBzY3JvbGxpbmcgZWZmZWN0XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uWToge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91czogMCwgXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDAsIFxuICAgICAgICAgICAgICAgICAgICBlYXNlOiAwLjEsXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlOiAoKSA9PiBkb2NTY3JvbGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gc2V0IHRoZSBib2R5J3MgaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLnNldFNpemUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHJlbmRlciBsb29wXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHRoaXMucmVuZGVyKCkgKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICAvLyBzZXRzIHRoZSBpbml0aWFsIHZhbHVlIChubyBpbnRlcnBvbGF0aW9uKSAtIHRyYW5zbGF0ZSB0aGUgc2Nyb2xsIHZhbHVlXG4gICAgICAgICAgICBmb3IgKCBjb25zdCBrZXkgaW4gdGhpcy5yZW5kZXJlZFN0eWxlcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5jdXJyZW50ID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0ucHJldmlvdXMgPSB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5zZXRWYWx1ZSgpOyAgIFxuICAgICAgICAgICAgfSAgIFxuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgdGhlIHNjcm9sbGFibGUgZWxlbWVudFxuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsYXlvdXQoKSB7XG4gICAgICAgICAgICB0aGlzLkRPTS5zY3JvbGxhYmxlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCggMCwgJHsgLTEgKiB0aGlzLnJlbmRlcmVkU3R5bGVzLnRyYW5zbGF0aW9uWS5wcmV2aW91cyB9cHgsIDAgKWA7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2l6ZSgpIHtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgaGVpZ2ggb2YgdGhlIGJvZHkgaW4gb3JkZXIgdG8ga2VlcCB0aGUgc2Nyb2xsYmFyIG9uIHRoZSBwYWdlXG4gICAgICAgICAgICBib2R5LnN0eWxlLmhlaWdodCA9IGAkeyB0aGlzLkRPTS5zY3JvbGxhYmxlLnNjcm9sbEhlaWdodCB9cHhgO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlKCkge1xuICAgICAgICAgICAgLy8gdGhlIDxtYWluPiBuZWVkcyB0byBcInN0aWNrXCIgdG8gdGhlIHNjcmVlbiBhbmQgbm90IHNjcm9sbFxuICAgICAgICAgICAgLy8gZm9yIHRoYXQgd2Ugc2V0IGl0IHRvIHBvc2l0aW9uIGZpeGVkIGFuZCBvdmVyZmxvdyBoaWRkZW4gXG4gICAgICAgICAgICB0aGlzLkRPTS5tYWluLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgIHRoaXMuRE9NLm1haW4uc3R5bGUud2lkdGggICAgPSB0aGlzLkRPTS5tYWluLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgICAgIHRoaXMuRE9NLm1haW4uc3R5bGUudG9wICAgICAgPSB0aGlzLkRPTS5tYWluLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5ET00ubWFpbi5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICB9XG4gICAgICAgIGluaXRFdmVudHMoKSB7XG4gICAgICAgICAgICAvLyBvbiByZXNpemUgcmVzZXQgdGhlIGJvZHkncyBoZWlnaHRcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB0aGlzLnNldFNpemUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgICAgLy8gR2V0IHNjcm9sbGluZyBzcGVlZFxuICAgICAgICAgICAgLy8gVXBkYXRlIGxhc3RTY3JvbGxcbiAgICAgICAgICAgIHNjcm9sbGluZ1NwZWVkID0gTWF0aC5hYnMoIGRvY1Njcm9sbCAtIGxhc3RTY3JvbGwgKTtcbiAgICAgICAgICAgIGxhc3RTY3JvbGwgICAgID0gZG9jU2Nyb2xsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgYW5kIGludGVycG9sYXRlZCB2YWx1ZXNcbiAgICAgICAgICAgIGZvciAoIGNvbnN0IGtleSBpbiB0aGlzLnJlbmRlcmVkU3R5bGVzICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRTdHlsZXNbIGtleSBdLmN1cnJlbnQgID0gdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uc2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5wcmV2aW91cyA9IE1hdGhVdGlscy5sZXJwKCB0aGlzLnJlbmRlcmVkU3R5bGVzWyBrZXkgXS5wcmV2aW91cywgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uY3VycmVudCwgdGhpcy5yZW5kZXJlZFN0eWxlc1sga2V5IF0uZWFzZSApOyAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYW5kIHRyYW5zbGF0ZSB0aGUgc2Nyb2xsYWJsZSBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKCBjb25zdCBpdGVtIG9mIHRoaXMuaXRlbXMgKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGl0ZW0gaXMgaW5zaWRlIHRoZSB2aWV3cG9ydCBjYWxsIGl0J3MgcmVuZGVyIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHVwZGF0ZSBpdGVtJ3Mgc3R5bGVzLCBiYXNlZCBvbiB0aGUgZG9jdW1lbnQgc2Nyb2xsIHZhbHVlIGFuZCB0aGUgaXRlbSdzIHBvc2l0aW9uIG9uIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIGlmICggaXRlbS5pc1Zpc2libGUgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggaXRlbS5pbnNpZGVWaWV3cG9ydCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVuZGVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5zaWRlVmlld3BvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbnNpZGVWaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gbG9vcFxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB0aGlzLnJlbmRlcigpICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcmVsb2FkSW1hZ2VzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuICAgICAgICAgICAgaW1hZ2VzTG9hZGVkKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnBhcmFsbGF4LWltZycgKSwgeyBiYWNrZ3JvdW5kOiB0cnVlIH0sIHJlc29sdmUgKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICBwcmVsb2FkSW1hZ2VzKCkudGhlbiggKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoICdpcy1sb2FkaW5nJyApO1xuICAgICAgICBnZXRQYWdlWVNjcm9sbCgpO1xuICAgICAgICBsYXN0U2Nyb2xsID0gZG9jU2Nyb2xsO1xuXG4gICAgICAgIGlmICggaXNfbGcubWF0Y2hlcyAmJiBqUXVlcnkoICdib2R5JyApLmlzKCAnLmhhcy1wYXJhbGxheCcgKSApIHtcbiAgICAgICAgICAgIHBhZ2VTY3JvbGwgPSBuZXcgU21vb3RoU2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICBpZiAoICQoICcuanMtcmVwbHknICkgKSB7XG4gICAgICAgICQoICcuanMtcmVwbHknICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG1lIFx0ICAgID0gJCggdGhpcyApLFxuXHRcdFx0XHRjb21tZW50ID0gbWUuY2xvc2VzdCggJy5jb21tZW50JyApLFxuXHRcdFx0XHRuYW1lICAgID0gY29tbWVudC5hdHRyKCAnZGF0YS1uYW1lJyApLFxuXHRcdFx0XHRwYXJlbnQgID0gY29tbWVudC5hdHRyKCAnZGF0YS1wYXJlbnQnICksXG5cdFx0XHRcdHJlcGx5ICAgPSAkKCAnLmpzLWNvbW1lbnQtcmVwbHknICk7XG5cbiAgICAgICAgICAgICQoICcjZnRfNWY4ZGI1ZjMyNjczNScgKS52YWwoIHBhcmVudCApO1xuXG4gICAgICAgICAgICBwYWdlX3Njcm9sbCggcmVwbHkgKTtcblxuICAgICAgICAgICBcdCQoICc8ZGl2IGNsYXNzPVwiYWxlcnQgaXMtaW5mb1wiPicgKyByZXBseS5hdHRyKCAnZGF0YS1yZXBseScgKSArICcgJyArIG5hbWUgKyAnIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjbG9zZSBqcy1yZXNldC1yZXBseVwiPiZ0aW1lczs8L2E+PC9kaXY+JyApLmluc2VydEFmdGVyKCByZXBseS5maW5kKCAnaDMnICkgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cblx0JCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgJy5qcy1yZXNldC1yZXBseScsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBtZSBcdCAgPSAkKCB0aGlzICksXG5cdFx0XHRyZXBseSA9IG1lLmNsb3Nlc3QoICcuYWxlcnQnICk7XG5cblx0XHQkKCAnI2Z0XzVmOGRiNWYzMjY3MzUnICkudmFsKCAnMCcgKTtcblxuXHRcdHJlcGx5LmZhZGVPdXQoIDMwMCwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCB0aGlzICkucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xuXG4gICAgZnVuY3Rpb24gcGFnZV9zY3JvbGwoIGFuY2hvciApIHtcbiAgICAgICAgdmFyIG9mZnNldCA9ICQoICcuanMtaGVhZGVyJyApLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAkKCAnLmpzLWhvbGRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IGFuY2hvci5vZmZzZXQoKS50b3AgLSBvZmZzZXRcbiAgICAgICAgfSwgODAwICk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIGlmICggJCggJy5qcy1mYXEnICkgKSB7XG4gICAgICAgICQoICcuanMtZmFxJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKS5jbG9zZXN0KCAnLmZhcS1pdGVtJyApO1xuXG4gICAgICAgICAgICBpZiAoIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICBtZS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICBtZS5maW5kKCAnLmZhcS1hbnN3ZXInICkuc2xpZGVVcCggMjAwICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgbWUuZmluZCggJy5mYXEtYW5zd2VyJyApLnNsaWRlRG93biggMjAwICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBhZ2VTY3JvbGwgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlU2Nyb2xsLnNldFNpemUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICBpZiAoICQoICdpbnB1dFt0eXBlPWZpbGVdJyApICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICAkKCAnaW5wdXRbdHlwZT1maWxlXScgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgaW5wdXQud3JhcCggJzxkaXYgY2xhc3M9XCJmaWxlXCI+PC9kaXY+JyApO1xuXG4gICAgICAgICAgICB2YXIgZmlsZSAgICAgICAgPSBpbnB1dC5jbG9zZXN0KCAnLmZpbGUnICksXG4gICAgICAgICAgICAgICAgbGFiZWwgICAgICAgPSBpbnB1dC5hdHRyKCAnZGF0YS1sYWJlbCcgKSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9IGlucHV0LmF0dHIoICdkYXRhLXBsYWNlaG9sZGVyJyApO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT0gJycgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSAnUGFyY291cmlyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgcGxhY2Vob2xkZXIgPT09ICd1bmRlZmluZWQnIHx8IHBsYWNlaG9sZGVyID09ICcnICkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggaW5wdXQuaXMoICc6ZGlzYWJsZWQnICkgKSB7XG4gICAgICAgICAgICAgICAgZmlsZS5hZGRDbGFzcyggJ2lzLWRpc2FibGVkJyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWxlLnByZXBlbmQoICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYXJrXCI+JyArIGxhYmVsICsgJzwvYnV0dG9uPjxkaXYgY2xhc3M9XCJmaWxlLXNlbGVjdGVkXCI+JyArIHBsYWNlaG9sZGVyICsgJzwvZGl2PicgKTtcbiAgICAgICAgICAgIGZpbGUuYXBwZW5kKCAnPGEgY2xhc3M9XCJmaWxlLXJlbW92ZSBqcy1maWxlLXJlbW92ZVwiPiZ0aW1lczs8L2E+JyApO1xuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICogQnJvd3NlIGJ1dHRvbiBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5maWxlJyApLmZpbmQoICdidXR0b24nICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJ0biAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGZpbGUgID0gYnRuLmNsb3Nlc3QoICcuZmlsZScgKSxcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGZpbGUuZmluZCggJ2lucHV0JyApO1xuXG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogUmVtb3ZlIGJ1dHRvbiBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5maWxlJyApLmZpbmQoICcuanMtZmlsZS1yZW1vdmUnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJ0biAgICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGZpbGUgICAgID0gYnRuLmNsb3Nlc3QoICcuZmlsZScgKSxcbiAgICAgICAgICAgICAgICBpbnB1dCAgICA9IGZpbGUuZmluZCggJ2lucHV0JyApLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmlsZS5maW5kKCAnLmZpbGUtc2VsZWN0ZWQnICk7XG5cbiAgICAgICAgICAgIGlucHV0LnZhbCggJycgKS5jaGFuZ2UoKTtcblxuICAgICAgICAgICAgc2VsZWN0ZWQudGV4dCggaW5wdXQuYXR0ciggJ2RhdGEtcGxhY2Vob2xkZXInICkgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIENoYW5nZSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5maWxlJyApLmZpbmQoICdpbnB1dCcgKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIGZpbGUgICAgID0gaW5wdXQuY2xvc2VzdCggJy5maWxlJyApLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmlsZS5maW5kKCAnLmZpbGUtc2VsZWN0ZWQnICk7XG5cbiAgICAgICAgICAgIGlmKCBpbnB1dC52YWwoKSAhPT0gJycgKSB7XG4gICAgICAgICAgICAgICAgZmlsZS5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWxlLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmFtZXMgPSAnJztcbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGlucHV0LmdldCgwKS5maWxlcy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGkgPiAwICkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lcyArPSAnLCAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lcyArPSBpbnB1dC5nZXQoMCkuZmlsZXNbaV0ubmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZWN0ZWQudGV4dCggbmFtZXMgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIHZhciBtYXAsXG4gICAgICAgIGluZm9fd2luZG93cyA9IFtdLFxuICAgICAgICBlbGVtZW50cyAgICAgPSBbXSxcbiAgICAgICAgaWNvbiAgICAgICAgID0gYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4uc3ZnJztcblxuICAgIGZ1bmN0aW9uIG5ld19tYXAoICRlbCApIHtcbiAgICAgICAgdmFyICRtYXJrZXJzID0gJGVsLmZpbmQoICcuanMtbWFya2VyJyApO1xuXG4gICAgICAgIHZhciBzdHlsZWRNYXBUeXBlID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjVmNVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjE2MTYxXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWY1ZjVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiZGJkYmRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3NTc1NzVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZTVlNWU1XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3NTc1NzVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2RhZGFkYVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MTYxNjFcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzllOWU5ZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQubGluZVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZTVlNWU1XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlZWVlZWVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzljOWM5XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOWU5ZTllXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB7bmFtZTogJ1N0eWxlZCBNYXAnfSk7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSB7XG4gICAgICAgICAgICB6b29tIDogMTQsXG4gICAgICAgICAgICBjZW50ZXIgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDAsIDApLFxuICAgICAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICAgICAgICBzY3JvbGx3aGVlbCA6IGZhbHNlLFxuICAgICAgICAgICAgcGFuQ29udHJvbCA6IGZhbHNlLFxuICAgICAgICAgICAgcGFuQ29udHJvbE9wdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uVE9QX1JJR0hUXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgem9vbUNvbnRyb2wgOiB0cnVlLFxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc3R5bGUgOiBnb29nbGUubWFwcy5ab29tQ29udHJvbFN0eWxlLkxBUkdFLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sIDogZmFsc2UsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgbWFwVHlwZUlkcyA6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ3N0eWxlZF9tYXAnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdnYWJsZSA6IHRydWUsXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJIDogdHJ1ZVxuICAgICAgICB9O1xuICAgICBcbiAgICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCggJGVsWzBdLCBhcmdzICk7XG5cbiAgICAgICAgbWFwLm1hcFR5cGVzLnNldCggJ3N0eWxlZF9tYXAnLCBzdHlsZWRNYXBUeXBlICk7XG4gICAgICAgIG1hcC5zZXRNYXBUeXBlSWQoICdzdHlsZWRfbWFwJyApO1xuXG4gICAgICAgIG1hcC5tYXJrZXJzID0gW107XG4gICAgICAgIGVsZW1lbnRzID0gW107XG5cbiAgICAgICAgJG1hcmtlcnMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICdfaWQnOiBwYXJzZUludCggbWUuYXR0ciggJ2RhdGEtaWQnICkgKSxcbiAgICAgICAgICAgICAgICAnX3RpdGxlJzogbWUuYXR0ciggJ2RhdGEtdGl0bGUnICksXG4gICAgICAgICAgICAgICAgJ19hZGRyZXNzJzogbWUuYXR0ciggJ2RhdGEtYWRkcmVzcycgKSxcbiAgICAgICAgICAgICAgICAnX2VtYWlsJzogbWUuYXR0ciggJ2RhdGEtZW1haWwnICksXG4gICAgICAgICAgICAgICAgJ19waG9uZSc6IG1lLmF0dHIoICdkYXRhLXBob25lJyApLFxuICAgICAgICAgICAgICAgICdfbGF0JzogbWUuYXR0ciggJ2RhdGEtbGF0JyApLFxuICAgICAgICAgICAgICAgICdfbG5nJzogbWUuYXR0ciggJ2RhdGEtbG5nJyApXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKCBlbGVtZW50ICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRtYXJrZXJzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICBhZGRfbWFya2VyKCBtZSwgbWFwICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbnRlcl9tYXAoIG1hcCApO1xuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX21hcmtlciggJG1hcmtlciwgbWFwICkge1xuICAgICAgICB2YXIgbGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggJG1hcmtlci5hdHRyKCAnZGF0YS1sYXQnICksICRtYXJrZXIuYXR0ciggJ2RhdGEtbG5nJyApICk7XG5cbiAgICAgICAgdmFyIHBpbiA9IHtcbiAgICAgICAgICAgIHVybDogYnJhdmFkLnRlbXBsYXRlX3VybCArICcvYXNzZXRzL2ltZy9waW4uc3ZnJyxcbiAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKCA0NSwgNTQgKSxcbiAgICAgICAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKCA0NSwgNTQgKSxcbiAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KCAyMiwgNTQgKVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogbGF0bG5nLFxuICAgICAgICAgICAgbWFwIDogbWFwLFxuICAgICAgICAgICAgaWNvbiA6IHBpblxuICAgICAgICB9KTtcblxuICAgICAgICBtYXAubWFya2Vycy5wdXNoKCBtYXJrZXIgKTtcblxuICAgICAgICB2YXIgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcbiAgICAgICAgICAgIGNvbnRlbnQgOiAkbWFya2VyLmh0bWwoKVxuICAgICAgICB9KTtcblxuICAgICAgICBpbmZvX3dpbmRvd3MucHVzaCggaW5mb3dpbmRvdyApO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKCBtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xvc2VfaW5mb3dpbmRvdygpO1xuXG4gICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4oIG1hcCwgbWFya2VyICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlX2luZm93aW5kb3coKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaW5mb193aW5kb3dzW2ldLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjZW50ZXJfbWFwKCBtYXAgKSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cbiAgICAgICAgJC5lYWNoKCBtYXAubWFya2VycywgZnVuY3Rpb24oIGksIG1hcmtlciApIHtcbiAgICAgICAgICAgIHZhciBsYXRsbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBtYXJrZXIucG9zaXRpb24ubGF0KCksIG1hcmtlci5wb3NpdGlvbi5sbmcoKSApO1xuXG4gICAgICAgICAgICBib3VuZHMuZXh0ZW5kKCBsYXRsbmcgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCBtYXAubWFya2Vycy5sZW5ndGggPT0gMSApIHtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoIGJvdW5kcy5nZXRDZW50ZXIoKSApO1xuICAgICAgICAgICAgbWFwLnNldFpvb20oIDE1ICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoIGJvdW5kcyApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFwID0gbnVsbDtcblxuICAgICQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCAnLmpzLW1hcCcgKS5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbWFwID0gbmV3X21hcCggJCggdGhpcyApICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgICQuZm4uYnJhdmFkX251bWJlciA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbml0XG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCAgICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBjdXJyX3ZhbCA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkX21pbnVzLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkX3BsdXM7XG5cbiAgICAgICAgICAgIGlucHV0LndyYXAoICc8ZGl2IGNsYXNzPVwibnVtYmVyIGpzLW51bWJlclwiPjwvZGl2PicgKTtcblxuICAgICAgICAgICAgdmFyIG51bWJlciA9IGlucHV0LmNsb3Nlc3QoICcuanMtbnVtYmVyJyApO1xuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmF0dHIoICdkYXRhLXBvc2l0aW9uJyApID09ICdsZWZ0JyApIHtcbiAgICAgICAgICAgICAgICBudW1iZXIuYWRkQ2xhc3MoICdudW1iZXItbGVmdCcgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpbnB1dC5pcyggJzpkaXNhYmxlZCcgKSApIHtcbiAgICAgICAgICAgICAgICBudW1iZXIuYWRkQ2xhc3MoICdpcy1kaXNhYmxlZCcgKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZF9taW51cyA9ICdkaXNhYmxlZD1cImRpc2FibGVkXCInO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkX3BsdXMgID0gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIGN1cnJfdmFsIDw9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICkgKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRfbWludXMgPSAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBjdXJyX3ZhbCA+PSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21heCcgKSApICkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVkX3BsdXMgPSAnZGlzYWJsZWQ9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIEFwcGVuZCBidXR0b25zIHRvIHRoZSB3cmFwcGVyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG51bWJlci5wcmVwZW5kKCAnPGJ1dHRvbiBjbGFzcz1cIm51bWJlci1taW51c1wiJyArIGRpc2FibGVkX21pbnVzICsgJz4tPC9idXR0b24+JyApO1xuICAgICAgICAgICAgbnVtYmVyLmFwcGVuZCggJzxidXR0b24gY2xhc3M9XCJudW1iZXItcGx1c1wiJyArIGRpc2FibGVkX3BsdXMgKyAnPis8L2J1dHRvbj4nICk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogTWludXMgYnV0dG9uIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5jbG9zZXN0KCAnLmpzLW51bWJlcicgKS5maW5kKCAnLm51bWJlci1taW51cycgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYnRuICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIG51bWJlciA9IGJ0bi5jbG9zZXN0KCAnLm51bWJlcicgKSxcbiAgICAgICAgICAgICAgICBpbnB1dCAgPSBudW1iZXIuZmluZCggJ2lucHV0JyApLFxuICAgICAgICAgICAgICAgIHZhbCAgICA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIHN0ZXAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnc3RlcCcgKSApLFxuICAgICAgICAgICAgICAgIG1pbiAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICksXG4gICAgICAgICAgICAgICAgbWF4ICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtYXgnICkgKSxcbiAgICAgICAgICAgICAgICBuZXdfdmFsO1xuXG4gICAgICAgICAgICBuZXdfdmFsID0gdmFsIC0gc3RlcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaW5wdXRcbiAgICAgICAgICAgICAgICAudmFsKCBuZXdfdmFsIClcbiAgICAgICAgICAgICAgICAuY2hhbmdlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBQbHVzIGJ1dHRvbiBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgfSkuY2xvc2VzdCggJy5qcy1udW1iZXInICkuZmluZCggJy5udW1iZXItcGx1cycgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYnRuICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgIG51bWJlciA9IGJ0bi5jbG9zZXN0KCAnLm51bWJlcicgKSxcbiAgICAgICAgICAgICAgICBpbnB1dCAgPSBudW1iZXIuZmluZCggJ2lucHV0JyApLFxuICAgICAgICAgICAgICAgIHZhbCAgICA9IHBhcnNlSW50KCBpbnB1dC52YWwoKSApLFxuICAgICAgICAgICAgICAgIHN0ZXAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnc3RlcCcgKSApLFxuICAgICAgICAgICAgICAgIG1pbiAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWluJyApICksXG4gICAgICAgICAgICAgICAgbWF4ICAgID0gcGFyc2VJbnQoIGlucHV0LmF0dHIoICdtYXgnICkgKSxcbiAgICAgICAgICAgICAgICBuZXdfdmFsO1xuXG4gICAgICAgICAgICBuZXdfdmFsID0gdmFsICsgc3RlcDtcblxuICAgICAgICAgICAgaW5wdXRcbiAgICAgICAgICAgICAgICAudmFsKCBuZXdfdmFsIClcbiAgICAgICAgICAgICAgICAuY2hhbmdlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDaGFuZ2UgZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIH0pLmNsb3Nlc3QoICcuanMtbnVtYmVyJyApLmZpbmQoICdpbnB1dCcgKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBpbnB1dC5jbG9zZXN0KCAnLm51bWJlcicgKSxcbiAgICAgICAgICAgICAgICB2YWwgICAgPSBwYXJzZUludCggaW5wdXQudmFsKCkgKSxcbiAgICAgICAgICAgICAgICBtaW4gICAgPSBwYXJzZUludCggaW5wdXQuYXR0ciggJ21pbicgKSApLFxuICAgICAgICAgICAgICAgIG1heCAgICA9IHBhcnNlSW50KCBpbnB1dC5hdHRyKCAnbWF4JyApICk7XG5cbiAgICAgICAgICAgIGlmICggdmFsID49IG1heCApIHtcbiAgICAgICAgICAgICAgICBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcubnVtYmVyLXBsdXMnIClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoICdkaXNhYmxlZCcsIHRydWUgKTtcblxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCggbWF4ICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLm51bWJlci1wbHVzJyApXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCAnZGlzYWJsZWQnLCBmYWxzZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHZhbCA8PSBtaW4gKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLm51bWJlci1taW51cycgKVxuICAgICAgICAgICAgICAgICAgICAucHJvcCggJ2Rpc2FibGVkJywgdHJ1ZSApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoIG1pbiApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAuZmluZCggJy5udW1iZXItbWludXMnIClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoICdkaXNhYmxlZCcsIGZhbHNlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgJCggd2luZG93ICkub24oICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBnZXRVcmxQYXJhbWV0ZXIgPSBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIoIHNQYXJhbSApIHtcbiAgICAgICAgICAgIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCggd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkgKSxcbiAgICAgICAgICAgICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoICcmJyApLFxuICAgICAgICAgICAgICAgIHNQYXJhbWV0ZXJOYW1lLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoICc9JyApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc1BhcmFtZXRlck5hbWVbMV0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzUGFyYW1ldGVyTmFtZVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFuY2hvciA9IGdldFVybFBhcmFtZXRlciggJ3NlY3Rpb24nICk7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgYW5jaG9yICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBhZ2Vfc2Nyb2xsKCAnIycgKyBhbmNob3IgKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWRkZWQgPSBnZXRVcmxQYXJhbWV0ZXIoICdhZGQtdG8tY2FydCcgKTtcblxuICAgICAgICBpZiAoIHR5cGVvZiBhZGRlZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCggJy53b29jb21tZXJjZS1tZXNzYWdlJyApLmNsb3Nlc3QoICcuYmxvY2snICk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBhZ2Vfc2Nyb2xsKCB0YXJnZXQgKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoIGRvY3VtZW50ICkub24oICdjbGljaycsICdhLmpzLXNjcm9sbFtocmVmXj1cIiNcIl0nLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGFuY2hvciA9ICQuYXR0ciggdGhpcywgJ2hyZWYnICk7XG5cbiAgICAgICAgcGFnZV9zY3JvbGwoIGFuY2hvciApO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcGFnZV9zY3JvbGwoIGFuY2hvciApIHtcbiAgICAgICAgdmFyIG9mZnNldCA9ICQoICcuanMtaGVhZGVyJyApLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAkKCAnLmpzLWhvbGRlcicgKS5vdXRlckhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoIGFuY2hvciApLm9mZnNldCgpLnRvcCAtIG9mZnNldFxuICAgICAgICB9LCA4MDAgKTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgJCggJy5qcy1oZWFkZXIgLmpzLXNlYXJjaCcgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICBpZiAoIGlzX2xnLm1hdGNoZXMgPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIGlmICggISBtZS5pcyggJy5pcy1hY3RpdmUnICkgKSB7XG4gICAgICAgICAgICAgICAgbWUuYWRkQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgJCggJy5qcy1zaXRlJyApLmFkZENsYXNzKCAnc2VhcmNoLW9wZW5lZCcgKTtcblxuICAgICAgICAgICAgICAgICQoICcuanMtbmF2IC5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoICcuc3ViLW1lbnUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCAyMDAgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoICQoICcuc2VhcmNoLWZpZWxkJyApLnZhbCgpID09ICcnICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAkKCAnLnNlYXJjaC1maWVsZCcgKS52YWwoKSA9PSAnJyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggJy5qcy1zZWFyY2gtZm9ybScgKS5vbiggJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBtZS5maW5kKCAnLnNlYXJjaC1maWVsZCcgKS52YWwoKSA9PSAnJyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggd2luZG93ICkub24oICdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xvc2Vfc2VhcmNoKCk7XG4gICAgfSk7XG5cbiAgICAkKCBkb2N1bWVudCApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBpc19sZy5tYXRjaGVzID09IHRydWUgKSB7XG4gICAgICAgICAgICBjbG9zZV9zZWFyY2goKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCggZG9jdW1lbnQgKS5vbiggJ2NsaWNrJywgJy5qcy1zZWFyY2gtZm9ybScsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjbG9zZV9zZWFyY2goKSB7XG4gICAgICAgICQoICcuanMtc2VhcmNoJyApLnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAkKCAnLmpzLXNpdGUnICkucmVtb3ZlQ2xhc3MoICdzZWFyY2gtb3BlbmVkJyApO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICBpZiAoICQoICdzZWxlY3QnICkgKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEluaXRcbiAgICAgICAgICovXG4gICAgICAgICQoICdzZWxlY3QnICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ICA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBjdXJyVmFsID0gc2VsZWN0LmZpbmQoICdvcHRpb246c2VsZWN0ZWQnICkudGV4dCgpLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM7XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnI3JhdGluZycgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHNlbGVjdC5hdHRyKCAnY2xhc3MnICkgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSAnICcgKyBzZWxlY3QuYXR0ciggJ2NsYXNzJyApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdFxuICAgICAgICAgICAgICAgIC53cmFwKCAnPGRpdiBjbGFzcz1cInNlbGVjdCcgKyBjbGFzc2VzICsgJ1wiPjwvZGl2PicgKVxuICAgICAgICAgICAgICAgIC5jc3MoICdvcGFjaXR5JywgJzAnICk7XG5cbiAgICAgICAgICAgIHNlbGVjdC5jbG9zZXN0KCAnLnNlbGVjdCcgKS5hcHBlbmQoICc8c3BhbiBjbGFzcz1cInNlbGVjdC1jaG9pY2VcIj48L3NwYW4+JyApO1xuICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmZpbmQoICcuc2VsZWN0LWNob2ljZScgKS50ZXh0KCBjdXJyVmFsICk7XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnLmlzLWRhbmdlcicgKSApIHtcbiAgICAgICAgICAgICAgICBzZWxlY3QuY2xvc2VzdCggJy5zZWxlY3QnICkuYWRkQ2xhc3MoICdpcy1kYW5nZXInICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0LmlzKCAnLmlzLXN1Y2Nlc3MnICkgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtc3VjY2VzcycgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBzZWxlY3QuaXMoICc6ZGlzYWJsZWQnICkgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmFkZENsYXNzKCAnaXMtZGlzYWJsZWQnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICogQ2hhbmdlIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB9KS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdCAgPSAkKCB0aGlzICksXG4gICAgICAgICAgICAgICAgY3VyclZhbCA9IHNlbGVjdC5maW5kKCAnb3B0aW9uOnNlbGVjdGVkJyApLnRleHQoKTtcblxuICAgICAgICAgICAgc2VsZWN0LmNsb3Nlc3QoICcuc2VsZWN0JyApLmZpbmQoICcuc2VsZWN0LWNob2ljZScgKS50ZXh0KCBjdXJyVmFsICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufShqUXVlcnkpKTtcbiIsIihmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgc2xpZGVzaG93ID0gW107XG5cbiAgICAkKCB3aW5kb3cgKS5vbiggJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCAkKCAnLmpzLWJhY2tncm91bmQtc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICQoICcuanMtYmFja2dyb3VuZC1zd2lwZXInICkuZWFjaCggZnVuY3Rpb24oIGksIG9iaiApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0gPSBuZXcgU3dpcGVyKCBvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtYmFja2dyb3VuZCcgKS5maW5kKCAnLmpzLW5leHQnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0uc2xpZGVOZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1iYWNrZ3JvdW5kJyApLmZpbmQoICcuanMtcHJldicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZVByZXYoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1zbGlkZXNob3ctc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICQoICcuanMtc2xpZGVzaG93LXN3aXBlcicgKS5lYWNoKCBmdW5jdGlvbiggaSwgb2JqICkge1xuICAgICAgICAgICAgICAgIHZhciBtZSA9ICQoIHRoaXMgKTtcblxuICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXSA9IG5ldyBTd2lwZXIoIG9iaiwge1xuICAgICAgICAgICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA4MDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VzdCggJy5qcy1zbGlkZXNob3cnICkuZmluZCggJy5qcy1uZXh0JyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzaG93W2ldLnNsaWRlTmV4dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmNsb3Nlc3QoICcuanMtc2xpZGVzaG93JyApLmZpbmQoICcuanMtcHJldicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZVByZXYoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggJCggJy5qcy1wb3N0cy1zd2lwZXInICkubGVuZ3RoICkge1xuICAgICAgICAgICAgJCggJy5qcy1wb3N0cy1zd2lwZXInICkuZWFjaCggZnVuY3Rpb24oIGksIG9iaiApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXNob3dbaV0gPSBuZXcgU3dpcGVyKCBvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDgwMCxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiAnLmpzLW5leHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkVsOiAnLmpzLXByZXYnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogM1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbG9zZXN0KCAnLmpzLXBvc3RzJyApLmZpbmQoICcuanMtbmV4dCcgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZU5leHQoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbG9zZXN0KCAnLmpzLXBvc3RzJyApLmZpbmQoICcuanMtcHJldicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1tpXS5zbGlkZVByZXYoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnYWxsZXJ5X3RodW1ibmFpbCxcbiAgICAgICAgICAgIGdhbGxlcnlfc3dpcGVyO1xuXG4gICAgICAgIGlmICggJCggJy5qcy10aHVtYm5haWwtc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGdhbGxlcnlfdGh1bWJuYWlsID0gbmV3IFN3aXBlciggJy5qcy10aHVtYm5haWwtc3dpcGVyJywge1xuICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgICAgIHNwZWVkOiA4MDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAkKCAnLmpzLWdhbGxlcnktc3dpcGVyJyApLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGdhbGxlcnlfc3dpcGVyID0gbmV3IFN3aXBlciggJy5qcy1nYWxsZXJ5LXN3aXBlcicsIHtcbiAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgICAgICBzcGVlZDogODAwLFxuICAgICAgICAgICAgICAgIHRodW1iczoge1xuICAgICAgICAgICAgICAgICAgICBzd2lwZXI6IGdhbGxlcnlfdGh1bWJuYWlsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnLmpzLXRhYnMnICkgKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEluaXRcbiAgICAgICAgICovXG4gICAgICAgICQoICcuanMtdGFicycgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0YWJzID0gJCggdGhpcyApO1xuXG4gICAgICAgICAgICB0YWJzLmZpbmQoICcudGFicy1uYXYgYScgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IG1lLmF0dHIoICdocmVmJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhYnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCB0YXJnZXQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIENsaWNrIGV2ZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH0pLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgICAgID0gJCggdGhpcyApLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBtZS5hdHRyKCAnaHJlZicgKSxcbiAgICAgICAgICAgICAgICAgICAgbmF2ICAgID0gdGFicy5maW5kKCAnLnRhYnMtbmF2JyApLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZCAgPSAzMDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoICEgbWUuaXMoICcuaXMtYWN0aXZlJyApICkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuZmluZCggJ2EnICkucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG4gICAgICAgICAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhYnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCAnLnRhYnMtaXRlbS5pcy1hY3RpdmUnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhZGVPdXQoIHNwZWVkLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCB0YXJnZXQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFkZUluKCBzcGVlZCApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0oalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgaWYgKCAkKCAnLmpzLXRvZ2dsZScgKSApIHtcbiAgICAgICAgJCggJy5qcy10b2dnbGUnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lICAgICA9ICQoIHRoaXMgKSwgXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gbWUubmV4dCgpO1xuXG4gICAgICAgICAgICBpZiAoIG1lLmlzKCAnLmlzLWFjdGl2ZScgKSApIHtcbiAgICAgICAgICAgICAgICBtZS5yZW1vdmVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2xpZGVVcCggMjAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zbGlkZURvd24oIDIwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hZGRDbGFzcyggJ2lzLWFjdGl2ZScgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgcGFnZVNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTY3JvbGwuc2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCQpIHtcclxuXHJcblx0JCggZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoIGlzX21kLm1hdGNoZXMgKSB7XHJcblx0XHRcdCQoICdpbnB1dFt0eXBlPW51bWJlcl0nICkuYnJhdmFkX251bWJlcigpO1xyXG4gICAgICAgIH1cclxuXHR9KTtcclxuXHJcblx0JCggZG9jdW1lbnQuYm9keSApLm9uKCAnYWRkZWRfdG9fY2FydCB1cGRhdGVkX3djX2RpdicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCBpc19tZC5tYXRjaGVzICkge1xyXG5cdFx0XHQkKCAnLndvb2NvbW1lcmNlLWNhcnQtZm9ybSBpbnB1dFt0eXBlPW51bWJlcl0nICkuYnJhdmFkX251bWJlcigpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoIHR5cGVvZiBwYWdlU2Nyb2xsICE9PSAndW5kZWZpbmVkJyApIHtcclxuXHRcdCAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcclxuXHRcdCAgICAgICAgcGFnZVNjcm9sbC5zZXRTaXplKCk7XHJcblx0XHQgICAgfSwgMzAwKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcbn0oalF1ZXJ5KSk7XHJcbiJdfQ==
