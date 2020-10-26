<?php
/**
 * Bravad functions
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'bravad_is_formtastic' ) ) {
	/**
	 * Is Formtastic activated
	 */
	function bravad_is_formtastic() {
		return class_exists( 'Formtastic' ) ? true : false;
	}
}

if ( ! function_exists( 'bravad_is_woocommerce_activated' ) ) {
	/**
	 * Is WooCommerce activated
	 */
	function bravad_is_woocommerce_activated() {
		return class_exists( 'woocommerce' ) ? true : false;
	}
}

if ( ! function_exists( 'bravad_is_wpml_activated' ) ) {
	/**
	 * Is WPML activated
	 */
	function bravad_is_wpml_activated() {
		return class_exists( 'SitePress' ) ? true : false;
	}
}

if ( ! function_exists( 'bravad_is' ) ) {
	/**
	 * Is option activated
	 */
	function bravad_is( $fields, $translate = true, $all = true ) {
		$post_id = 'option';

		if ( ! $translate ) {
			add_filter( 'acf/settings/current_language', '__return_false' );
		}

		if ( is_array( $fields ) ) {
			if ( $all ) {
				$bool = true;

				foreach ( $fields as $field ) {
					if ( ! bravad_field( $field, $post_id ) ) {
						$bool = false;

						break;
					}
				}

			} else {
				$bool = false;

				foreach ( $fields as $field ) {
					if ( bravad_field( $field, $post_id ) ) {
						$bool = true;

						break;
					}
				}
			}

			if ( ! $translate ) {
				remove_filter( 'acf/settings/current_language', '__return_false' );
			}

			return $bool;

		} else {
			$option = bravad_field( $fields, $post_id );

			if ( $fields == 'product' && bravad_is_woocommerce_activated() ) {
				return true;
			}

			if ( ! $translate ) {
				remove_filter( 'acf/settings/current_language', '__return_false' );
			}

			if ( isset( $option ) && ! empty( $option ) ) {
				return true;

			} else {
				return false;
			}
		}
	}
}

if ( ! function_exists( 'bravad_language_code' ) ) {
	/**
	 * Get language code
	 */
	function bravad_language_code() {
		if ( bravad_is_wpml_activated() ) {
			$code = ICL_LANGUAGE_CODE;
			
		} else {
			$code = get_locale();
		}

		$code = substr( $code, 0, 2 );

		return esc_attr( $code );
	}
}

if ( ! function_exists( 'bravad_field' ) ) {
	/**
	 * Get field
	 */
	function bravad_field( $field, $post_id = null ) {
		if ( function_exists( 'get_field' ) ) {
			return get_field( $field, $post_id );

		} else {
			return false;
		}
	}
}

if ( ! function_exists( 'bravad_get_slug' ) ) {
	/**
	 * Get the current post slug
	 */
	function bravad_get_slug( $id ) {
		global $post;

		$post_id   = ( empty( $id ) ) ? $post->ID : $id;
		$post_data = get_post( $post_id, ARRAY_A );
		$slug      = $post_data['post_name'];

		return esc_attr( $slug );
	}
}

if ( ! function_exists( 'bravad_dump' ) ) {
	/**
	 * Custom var dump
	 */
	function bravad_dump( $var, $render = false ) {
		ob_start();

		var_dump( $var);          
		$result = ob_get_contents();

		ob_end_clean();

		if ( $render ) {
			echo '<pre>' . $result . '</pre>';

		} else {
			echo '<pre style="display: none;">' . $result . '</pre>';
		}
	}
}

if ( ! function_exists( 'bravad_test' ) ) {
	/**
	 * Check if test
	 */
	function bravad_test() {
		if ( isset( $_GET['bravad'] ) && $_GET['bravad'] == 'test' ) {
			return true;

		} else {
			return false;
		}
	}
}

if ( ! function_exists( 'bravad_id' ) ) {
	/**
	 * Get the current post id
	 */
	function bravad_id() {
		$post_id = get_the_ID();

		if ( is_front_page() && is_home() ) {

		} elseif ( is_front_page() ) {
			$post_id = get_option( 'page_on_front' );

		} elseif ( is_home() || is_category() || is_archive() ) {
			$post_id = get_option( 'page_for_posts' );
		}

		if ( bravad_is_woocommerce_activated() && is_shop() ) {
			$post_id = get_option( 'woocommerce_shop_page_id' );
		}
		
		if ( is_search() ) {
			$post_id = get_option( 'page_on_front' );
		}

		if ( is_404() ) {
			$post_id = 'option';
		}

		return $post_id;
	}
}

if ( ! function_exists( 'bravad_wpml_id' ) ) {
	/**
	 * Get the current language post id
	 */
	function bravad_wpml_id( $post_id, $type = 'page', $lang ) {
		if ( ! bravad_is_wpml_activated() ) {
			return $post_id;
		}

		if ( empty( $lang ) ) {
			$lang = ICL_LANGUAGE_CODE;
		}
		
		$curr_id = apply_filters( 'wpml_object_id', $post_id, $type, false, $lang );

		return $curr_id;
	}
}
