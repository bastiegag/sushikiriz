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
