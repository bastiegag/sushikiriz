<?php
/**
 * Main template
 * 
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header(); 

	/**
	 * bravad_main_content hook
	 *
	 * @hooked bravad_posts_content - 10
	 * @hooked bravad_woocommerce_content - 15
	 * @hooked bravad_blocks_content - 20
	 */
	do_action( 'bravad_main_content' );

get_footer();
