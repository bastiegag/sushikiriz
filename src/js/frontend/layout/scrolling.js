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
