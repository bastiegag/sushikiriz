<?php
/**
 * Bravad Search Class
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'Bravad_Search' ) ) :

	/**
	 * Bravad_Search class
	 */
	class Bravad_Search {

		public function __construct() {
			add_action( 'acf/save_post', array( $this, 'save_post' ) );
		}

		/**
		 * Save post
		 */
		public function save_post( $post_id ) {
			$prefix     = array( 'hero-content', 'blocks' );
			$allowed    = array( 'title', 'subtitle', 'text' );
			// $prohibited = array( 'icon', 'image', 'photos', 'color', 'opacity', 'position', 'block-id', 'title-visible', 'background', 'text-align', 'vertical-align', 'post-type', 'order', 'orderby', 'posts-per-page', 'hero-content' );

			$fields  = get_post_custom_keys( $post_id );
			$keys    = array();
			$content = '';

			if ( ! isset( $fields ) ) {
				return;
			}

			foreach ( $fields as $field ) {
				$array = explode( '_', $field );
				
				foreach ( $array as $key => $value ) {
					if ( empty( $value[0] ) ) {
						continue;
					}
				}

				$array = array_values( $array );
				
				if ( in_array( $array[0], $prefix ) ) {
					if ( isset( $array[1] ) ) {
						if ( is_numeric( $array[1] ) ) {
							if ( isset( $array[2] ) && in_array( $array[2], $allowed ) ) {
								$keys[] = $field;
							}

						} else if ( in_array( $array[1], $allowed ) ) {
							$keys[] = $field;
						}
					}
				}
			}

			// var_dump( $keys ); exit;

			foreach ( $keys as $key ) {
				$value = get_post_meta( $post_id, $key, true );

				if ( ! empty( $value ) && ! is_array( $value ) ) {
					$content .= trim( strip_shortcodes( strip_tags( $value ) ) ) . '<br />';
				}
			}

			$p = array(
				'ID'           => $post_id,
				'post_content' => $content
			);

			wp_update_post( $p );
		}

	}

endif;

return new Bravad_Search();
