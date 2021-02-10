<?php
/**
 * Site header template part
 *
 * @package Sushikiriz
 * @version 2.1.6
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<header id="header" class="site-header js-header">
    <?php
    $banner = bravad_option( 'banner' );
    $text   = bravad_option( 'banner-text' );
    $link   = bravad_option( 'banner-link' );

    if ( $banner && is_front_page() ) {
        echo sprintf( '<p class="banner">%s %s</p>',
            $text,
            ! empty( $link ) ? '- <a href="' . $link['url'] . '" target="' . $link['target'] . '">' . $link['title'] . '</a>' : ''
        );
    }
    ?>

    <div class="container">

        <div class="holder js-holder">
            <?php
            echo '<a href="#" class="site-nav-opener js-nav-opener"><span></span></a>';

            $path = bravad_img( bravad_option( 'logo' ) )['url'];
            
            if ( isset( $path ) ) {
                $ext  = explode( '.', basename( $path ) );

                $args = array(
                    'ssl' => array(
                        'verify_peer'      => false,
                        'verify_peer_name' => false
                    )
                );

                $file = file_get_contents( $path, false, stream_context_create( $args ) );
                $img  = sprintf( '<img src="%s" alt="%s" />', $path, get_bloginfo( 'name' ) );

                echo sprintf( '<a href="%s" title="%s" class="site-logo">%s</a>',
                    esc_url( home_url( '/' ) ),
                    get_bloginfo( 'name' ),
                    isset( $ext[1] ) && $ext[1] == 'svg' ? $file : $img
                );
            }

            $phone = bravad_option( 'phone', false );

            if ( ! empty( $phone ) ) {
                $regex = "#^([1][- ]*)?+\(?+[0-9]{3}+\)?+[- ]*+[0-9]{3}+[-]*+[0-9]{4}$#";

                if ( preg_match( $regex, $phone ) ) {
                    $phone = preg_replace( '/\D+/', '', $phone );

                    echo sprintf( '<a href="tel:%s" class="site-call">%s</a>',
                        $phone,
                        bravad_icon( 'phone' )
                    );
                }
            }
            ?>

            <div class="site-nav js-nav">
                <div class="container">
                    <?php 
                    if ( bravad_is( 'search', false ) ) {
                        /**
                         * Get search form
                         */
                        get_search_form();
                    }
                    ?>
                    
                    <nav id="primary-nav" class="primary-nav js-primary-nav">
                        <ul class="menu">
                            <?php 
                            /**
                             * Get primary menu
                             */
                            bravad_menu( 'primary', 3 );
                            ?>
                        </ul>
                    </nav><!-- .primary-nav -->

                    <?php if ( has_nav_menu( 'secondary' ) || bravad_has_social() ) : ?>
                        <nav id="secondary-nav" class="secondary-nav js-secondary-nav">

                            <?php
                            if ( has_nav_menu( 'secondary' ) ) {
                                echo '<ul class="menu">';

                                /**
                                 * Get secondary menu
                                 */
                                bravad_menu( 'secondary' );

                                if ( bravad_is_woocommerce_activated() ) {
                                    echo sprintf( '<li class="account-link"><a href="%s">%s</a></li>%s',
                                        get_permalink( get_option( 'woocommerce_myaccount_page_id' ) ),
                                        is_user_logged_in() ? __( 'Mon compte', 'bravad' ) : __( 'Connexion', 'bravad' ),
                                        is_user_logged_in() ? '<li><a href="' . wc_logout_url() . '">' . __( 'Déconnexion', 'bravad' ) . '</a></li>' : ''
                                    );
                                }

                                echo '</ul>';
                            }

                            /**
                             * Get social medias
                             */
                            bravad_social();
                            ?>

                        </nav><!-- .secondary-nav -->
                    <?php endif; ?>

                    <?php
                    /**
                     * Get shop nav
                     */
                    bravad_shop_nav();
                    ?>

                </div><!-- .container -->
            </div><!-- .site-nav -->
        </div><!-- .holder -->

    </div><!-- .container -->
</header>
