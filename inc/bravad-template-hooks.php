<?php
/**
 * Bravad hooks
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Head
 */
add_action( 'wp_head', 'bravad_google_analytics', 99 );
add_action( 'wp_head', 'bravad_facebook_pixel', 99 );

/**
 * Before site
 */
add_action( 'bravad_before_site', 'bravad_site_header', 10 );

/**
 * Before main content
 */
add_action( 'bravad_before_main_content', 'bravad_page_hero', 10 );

/**
 * Main content
 */
add_action( 'bravad_main_content', 'bravad_posts_content', 10 );
add_action( 'bravad_main_content', 'bravad_woocommerce_content', 15 );
add_action( 'bravad_main_content', 'bravad_blocks_content', 20 );

/**
 * After main content
 */
add_action( 'bravad_after_main_content', 'bravad_post_comments', 10 );
add_action( 'bravad_after_main_content', 'bravad_page_footer', 20 );

/**
 * After site
 */
add_action( 'bravad_after_site', 'bravad_site_footer', 10 );

/**
 * Footer
 */
add_action( 'wp_footer', 'bravad_cookies', 10 );

/**
 * Hero
 */
add_action( 'bravad_hero_caption', 'bravad_page_title', 10 );
add_action( 'bravad_hero_caption', 'bravad_page_subtitle', 20 );
add_action( 'bravad_hero_caption', 'bravad_page_link', 30 );
