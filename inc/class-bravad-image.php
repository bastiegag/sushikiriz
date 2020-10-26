<?php
/**
 * Bravad Image Class
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_Image' ) ) :

	/**
	 * Bravad_Image class
	 */
	class Bravad_Image {

		public function __construct() {
			add_filter( 'image_send_to_editor', array( $this, 'image_to_editor' ), 10, 8 );

			add_filter( 'post_gallery', array( $this, 'gallery_output' ), 10, 3 );
		}

		/**
		 * Image to editor
		 */
		public function image_to_editor( $html, $id, $caption, $title, $align, $url, $size, $alt ) {
			$title = get_the_title( $id );
			$html  = get_image_tag( $id, $alt, $title, $align, $size );

			if ( $url ) {
				$html = sprintf( '<a href="%s" title="%s" data-fancybox>%s</a>',
					esc_attr( $url ),
					$title,
					$html
				);
			}

			$ratio = bravad_field( 'ratio', $id );

			if ( isset( $ratio ) && $ratio !== 'none' ) {
				$html = sprintf( '<div class="image image-%s%s">%s</div>',
					$ratio,
					$url ? ' image-link' : '',
					$html
				);
			}

			return $html;
		}

		/**
		 * Gallery output
		 */
		public function gallery_output( $output, $attr, $instance ) {
			$output = sprintf( '<div class="gallery-list"><div class="row row-cols-2 row-cols-lg-%s">',
				! empty( $attr['columns'] ) ? $attr['columns'] : '3'
			);

			$ids = $attr['ids'];

			if ( ! is_array( $ids ) ) {
				$ids = explode( ',', $attr['ids'] );
			}

			if ( $attr['orderby'] == 'rand' ) {
				shuffle( $ids );
			}

			$size  = ! empty( $attr['size'] ) ? $attr['size'] : 'thumbnail';
			$ratio = ! empty( $attr['ratio'] ) ? $attr['ratio'] : 'wide';

			foreach ( $ids as $img_id ) {
				$output .= sprintf( '<div class="col"><div class="gallery-item"><div class="image image-%s image-link"><a href="%s" title="%s" data-fancybox><img src="%s" alt="%s" /></a></div></div></div>',
					$ratio,
					bravad_img( $img_id )['url'],
					bravad_img( $img_id )['title'],
					bravad_img( $img_id, $size )['url'],
					bravad_img( $img_id )['alt']
				);
			}

			$output .= '</div></div>';

			return $output;
		}

	}

endif;

return new Bravad_Image();
