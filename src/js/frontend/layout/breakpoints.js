var is_xs, is_sm, is_md, is_lg, is_xl, is_xxl;

if ( matchMedia ) {
    var is_xs  = window.matchMedia( '(min-width: 0px)' ),
        is_sm  = window.matchMedia( '(min-width: 576px)' ),
        is_md  = window.matchMedia( '(min-width: 768px)' ),
        is_lg  = window.matchMedia( '(min-width: 992px)' ),
        is_xl  = window.matchMedia( '(min-width: 1200px)' );
}
