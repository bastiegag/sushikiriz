<?php
/**
 * Bravad Shortcodes Class
 *
 * @package Sushikiriz
 * @version 2.1.3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_Shortcodes' ) ) :

	/**
	 * Bravad_Shortcodes class
	 */
	class Bravad_Shortcodes {

		public function __construct() {
			add_shortcode( 'email', array( $this, 'email' ) );
			add_shortcode( 'tel', array( $this, 'phone' ) );
			add_shortcode( 'button', array( $this, 'button' ) );
			add_shortcode( 'icon', array( $this, 'icon' ) );
			add_shortcode( 'feature', array( $this, 'feature' ) );
			add_shortcode( 'faq', array( $this, 'faq' ) );

			add_filter( 'embed_oembed_html', array( $this, 'embed' ), 99, 4 );
		}

		/**
		 * Email protection
		 */
		public function email( $atts, $content = null ) {
			$options = shortcode_atts( array(
				'to' => ''
		    ), $atts );

		    $email = ! empty( $options['to'] ) ? $options['to'] : $content;

		    if ( ! is_email( $email ) ) {
		    	return;
		    }

			$output = sprintf( '<a href="mailto:%s">%s</a>',
				esc_html( antispambot( $email ) ),
				is_email( $content ) ? antispambot( $content ) : $content
			);

			return $output;
		}

		/**
		 * Phone link
		 */
		public function phone( $atts, $content = null ) {
			$regex = "#^([1][- ]*)?+\(?+[0-9]{3}+\)?+[- ]*+[0-9]{3}+[-]*+[0-9]{4}$#";

			if ( ! preg_match( $regex, $content ) ) {
				return;
			}

			$options = shortcode_atts( array(
				'inline' => true
		    ), $atts );

			$phone = preg_replace( '/\D+/', '', $content );

			$output = sprintf( '<a href="tel:%s" class="d-inline-block d-md-none">%s</a><span class="d-none d-md-inline-block">%2$s</span>',
				$phone,
				$content
			);

			return $output;
		}

		/**
		 * Button
		 */
		public function button( $atts, $content = null ) {
			$options = shortcode_atts( array(
				'url'    => '',
				'bg'     => '',
				'color'  => '',
				'target' => ''
		    ), $atts );

			if ( empty( $options['url'] ) ) {
				return;
			}

			$style = array();

			if ( substr( $options['bg'], 0, 1 ) == '#' ) {
				$style[] = 'background-color: ' . $options['bg'] . ';';
			}

			if ( substr( $options['color'], 0, 1 ) == '#' ) {
				$style[] = 'color: ' . $options['color'] . ';';
			}

			$output = sprintf( '<a href="%s" class="btn%s%s"%s%s>%s</a>',
				$options['url'],
				! empty( $options['bg'] ) && substr( $options['bg'], 0, 1 ) !== '#' ? ' btn-' . $options['bg'] : '',
				! empty( $options['color'] ) && substr( $options['color'], 0, 1 ) !== '#' ? ' text-' . $options['color'] : '',
				! empty( $options['target'] ) ? ' target="' . $options['target'] . '"' : '',
				substr( $options['bg'], 0, 1 ) == '#' ? ' style="' . implode( ' ', $style ) . '"' : '',
				$content,
			);

			return $output;
		}

		/**
		 * Svg icon
		 */
		public function icon( $atts, $content = null ) {
			$options = shortcode_atts( array(
				'i'    => '',
				'size' => 'sm'
		    ), $atts );

			if ( empty( $options['i'] ) ) {
				return;
			}

			$output = bravad_icon( esc_attr( $options['i'] ), esc_attr( $options['size'] ) );

			return $output;
		}

		/**
		 * Feature
		 */
		public function feature( $atts, $content = null ) {
			$options = shortcode_atts( array(
				'icon'  => '',
				'title' => '',
				'link'  => ''
			), $atts );

			if ( empty( $options['title'] ) ) {
				return;
			}

			$output = sprintf( '<div class="feature-item">%s%s<h3 class="h6">%s</h3>%s</div>',
				! empty( $options['link'] ) ? '<a href="' . esc_url( $options['link'] ) . '" title="' . esc_html( $options['title'] ) . '"></a>' : '',
				! empty( $options['icon'] ) ? bravad_icon( $options['icon'], 'xl' ) : '',
				esc_html( $options['title'] ),
				! empty( $content ) ? '<p>' . esc_html( $content ) . '</p>' : ''
			);

			return $output;
		}

		/**
		 * Faq
		 */
		public function faq( $atts, $content = null ) {
			$options = shortcode_atts( array(
				'question'  => ''
			), $atts );

			if ( empty( $options['question'] ) ) {
				return;
			}

			$output = sprintf( '<div class="faq-item"><a href="#" class="faq-question js-faq">%s %s</a><div class="faq-answer"><p>%s</p></div></div>',
				esc_html( $options['question'] ),
				bravad_icon( 'arrow-down' ),
				esc_html( $content )
			);

			return $output;
		}

		/**
		 * Embed
		 */
		public function embed( $content, $url, $attr, $post_id ) {
			$output = sprintf( '<div class="embed-container">%s</div>',
				$content
			);

			return $output;
		}

	}
	
endif;

return new Bravad_Shortcodes();
