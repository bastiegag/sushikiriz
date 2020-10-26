<?php
/**
 * Bravad WooCommerce Class
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_WooCommerce' ) ) :

	/**
	 * The Bravad WooCommerce Integration class
	 */
	class Bravad_WooCommerce {

		/**
		 * Setup class
		 */
		public function __construct() {
			add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
			
			add_action( 'after_setup_theme', array( $this, 'theme_support' ), 10 );
			add_filter( 'loop_shop_per_page', array( $this, 'products_per_page' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ), 10 );
		}

		/* 
		 * Declare WooCommerce support
		 */
		public function theme_support() {
			add_theme_support( 'woocommerce', array(
				'single_image_width'            => 1024,
				'thumbnail_image_width'         => 300,
				'gallery_thumbnail_image_width' => 150
			) );

			update_option( 'woocommerce_thumbnail_cropping', 'uncropped' );
		}

		/**
		 * Products per page
		 */
		public function products_per_page() {
			return intval( apply_filters( 'bravad_products_per_page', get_option( 'posts_per_page' ) ) );
		}

		/**
		 * Enqueue scripts and styles
		 */
		public function scripts() {
			wp_dequeue_style( 'select2' );
			wp_deregister_style( 'select2' );
			wp_dequeue_script( 'selectWoo' );
			wp_deregister_script( 'selectWoo' );

			// wp_dequeue_script( 'wc-cart' );
			// wp_enqueue_script( 'wc-cart', get_theme_file_uri( '/assets/js/woocommerce/cart' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.js' ), array( 'jquery' ), '4.6.0', true );
		}

	}

endif;

return new Bravad_WooCommerce();
