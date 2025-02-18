<?php
/**
 * Bravad Customize Class
 *
 * @package Sushikiriz
 * @version 2.0.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_Customize' ) ) :

	/**
	 * Bravad_Customize class
	 */
	class Bravad_Customize {

		public function __construct() {
			add_action( 'customize_register', array( $this, 'register' ) );
		}

		/**
		 * Customizer content
		 */
		public function register( $wp_customize ) {
			$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
			$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

			$wp_customize->selective_refresh->add_partial(
				'blogname',
				array(
					'selector'        => '.site-title',
					'render_callback' => array( $this, 'get_site_name' ),
				)
			);

			$wp_customize->selective_refresh->add_partial(
				'blogdescription',
				array(
					'selector'        => '.site-description',
					'render_callback' => array( $this, 'get_site_description' ),
				)
			);
		}

		/**
		 * Get site name
		 */
		public function get_site_name() {
			return get_bloginfo( 'name' );
		}

		/**
		 * Get site description
		 */
		public function get_site_description() {
			return get_bloginfo( 'description' );
		}
	}

endif;

return new Bravad_Customize();
