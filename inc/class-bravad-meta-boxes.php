<?php
/**
 * Bravad Meta Boxes Class
 *
 * @package Sushikiriz
 * @version 2.2.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_Meta_boxes' ) ) :

	/**
	 * Bravad_Meta_boxes class
	 */
	class Bravad_Meta_boxes {

		public function __construct() {
			add_filter( 'acf/load_field', array( $this, 'fields' ) );

			add_filter( 'acf/fields/flexible_content/layout_title/name=blocks', array( $this, 'blocks_title' ), 10, 4 );

			add_filter( 'acf/load_field/name=icon', array( $this, 'icon_field' ) );
			add_filter( 'acf/load_field/name=post-type', array( $this, 'post_type_field' ) );
			add_filter( 'acf/load_field/name=form', array( $this, 'form_field' ) );
			add_filter( 'acf/load_field/name=font', array( $this, 'font_field' ) );
			add_filter( 'acf/load_field/name=reusable-block', array( $this, 'reusable_field' ) );
		}

		/**
		 * Fields
		 */
		public function fields( $field ) {
			if ( ! empty( $field['label'] ) ) {
				$label = $field['label'];

				$field['label'] = __( $label, 'bravad' );
			}

			if ( ! empty( $field['button_label'] ) ) {
				$label = $field['button_label'];

				$field['button_label'] = __( $label, 'bravad' );
			}

			if ( ! empty( $field['ui_on_text'] ) ) {
				$label = $field['ui_on_text'];

				$field['ui_on_text'] = __( $label, 'bravad' );
			}

			if ( ! empty( $field['ui_off_text'] ) ) {
				$label = $field['ui_off_text'];

				$field['ui_off_text'] = __( $label, 'bravad' );
			}

			if ( ! empty( $field['instructions'] ) ) {
				$label = $field['instructions'];
				
				$field['instructions'] = __( $label, 'bravad' );
			}

			if ( ! empty( $field['choices'] ) ) {
				foreach ( $field['choices'] as $key => $value ) {
					$field['choices'][ $key ] = __( $value, 'bravad' ); 
				}
			}

			return $field;
		}

		/**
		 * Blocks title
		 */
		public function blocks_title( $title, $field, $layout, $i ) {
			$type  = $title;

			$title = get_sub_field( 'title' );

			return stripslashes( $title ) . ' <small>(' . __( $type, 'bravad' ) . ')</small>';
		}

		/**
		 * Icon field
		 */
		public function icon_field( $field ) {
			$dir   = dirname( __FILE__, 2 ) . '/src/svg/';
			$type  = '*.svg';
			$paths = glob( $dir . $type );
			$icons = array();

			foreach ( $paths as $path ) {
				$icon = str_replace( $dir, '', $path );
				$icon = str_replace( '.svg', '', $icon );

				$icons[ $icon ] = $icon;
			}

			$field['choices'] = $icons;

			return $field;
		}

		/**
		 * Post type field
		 */
		public function post_type_field( $field ) {
			$post_types = array();

			$args = array(
				'public'             => true,
				'publicly_queryable' => true
			);

			$arr = get_post_types( $args, 'objects' );

			foreach ( $arr as $key => $value ) {
				if ( $key !== 'attachment' ) {
					if ( bravad_is( $key, false ) ) {
						$post_types[ $key ] = $value->labels->name;
					}
				}
			}

			$field['choices'] = $post_types;

			return $field;
		}

		/**
		 * Form field
		 */
		public function form_field( $field ) {
			$forms = array();
			$args  = array(
				'posts_per_page' => -1,
				'orderby'        => 'title',
				'order'          => 'asc',
				'post_type'      => 'formtastic',
				'post_status'    => 'publish',
				'fields'         => 'ids',
			);

			$posts = get_posts( $args );

			foreach ( $posts as $form_id ) {
				$forms[ $form_id ] = get_the_title( $form_id );
			}

			$field['choices'] = $forms;

			return $field;
		}

		/**
		 * Fonts field
		 */
		public function font_field( $field ) {
			$google_key = bravad_option( 'google-maps' );

			if ( empty( $google_key ) ) {
				return;
			}

			if ( ! is_admin() ) {
				return;
			}

			$ch = curl_init();
			curl_setopt( $ch, CURLOPT_URL, 'https://www.googleapis.com/webfonts/v1/webfonts?key=' . $google_key );
			curl_setopt( $ch, CURLOPT_HTTPHEADER, array(
			    'Content-Type: application/json'
			) );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );  

			$list      = json_decode( curl_exec( $ch ), true );
			$http_code = curl_getinfo( $ch, CURLINFO_HTTP_CODE );

			curl_close( $ch );

			if ( $http_code !== 200 ) {
				exit( __( 'Erreur : Échec de l\'obtention de la liste des polices Google', 'bravad' ) );
			}

			$fonts = array();

			foreach ( $list['items'] as $key => $font ) {
				$args   = array();
				$weight = array();
				$value  = str_replace( ' ', '+', $font['family'] );

				if ( in_array( 'italic', $font['variants'] ) ) {
					$args[] = 'ital';
				}

				$variants = array();
				$italic   = false;

				foreach ( $font['variants'] as $key ) {
					if ( $key !== 'regular' && $key !== 'italic' ) {
						if ( strpos( $key, 'italic' ) !== false ) {
							$key        = str_replace( 'italic', '', $key );
							$variants[] = '1,' . $key;
							$italic     = true;

						} else {
							$variants[] = '0,' . $key;
						}

					} else {
						if ( $key == 'italic' ) {
							$variants[] = '1,400';
							$italic     = true;

						} else {
							$variants[] = '0,400';
						}
					}
				}

				if ( $italic ) {
					$weight = $variants;

				} else {
					foreach ( $variants as $variant ) {
						$weight[] = str_replace( '0,', '', $variant );
					}
				}

				if ( ! empty( $weight ) && count( $weight ) > 1 ) {
					sort( $weight );

					$args[] = 'wght@' . implode( ';', $weight );
				}

				if ( ! empty( $args ) ) {
					$fonts[ $value . ':' . implode( ',', $args ) ] = $font['family'];

				} else {
					$fonts[ $value ] = $font['family'];
				}
			}

			$field['choices'] = $fonts;

			return $field;
		}

		/**
		 * Reusable field
		 */
		public function reusable_field( $field ) {
			// $blocks = bravad_option( 'reusable' );
			$blocks = bravad_field( 'reusable', 'option' );
			$output = array();

			if ( isset( $blocks ) && ! empty( $blocks ) ) {
				foreach ( $blocks as $key => $value ) {
					$output[ $key ] = $value['title'];
				}

				$field['choices'] = $output;
			}

			return $field;
		}

	}

endif;

return new Bravad_Meta_boxes();
