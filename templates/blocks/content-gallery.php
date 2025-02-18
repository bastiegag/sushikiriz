<?php
/**
 * Gallery template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type    = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width   = get_sub_field( 'full-width' );
$photos  = get_sub_field( 'photos' );
$format  = get_sub_field( 'format' );
$columns = get_sub_field( 'columns' );
$size    = get_sub_field( 'size' );
$ratio   = get_sub_field( 'ratio' );
$order   = get_sub_field( 'order' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );

			if ( $photos ) {
				if ( ! $format ) {
					$ids = implode( ',', $photos );

					$gallery = sprintf( 'gallery columns="%s" size="%s" ratio="%s" ids="%s"%s',
						$columns,
						$size,
						$ratio,
						$ids,
						isset( $order ) && $order ? ' orderby="rand"' : ''
					);

					echo do_shortcode( '[' . $gallery . ']' );

				} else {
					if ( isset( $order ) && $order ) {
						shuffle( $photos );
					}

					echo '<div class="slideshow js-slideshow" data-view="' . $columns . '"><div class="slideshow-wrapper">';

					echo sprintf( '<a href="#" class="swiper-direction swiper-prev js-prev">%s</a>',
						bravad_icon( 'chevron-left' )
					);

					echo sprintf( '<a href="#" class="swiper-direction swiper-next js-next">%s</a>',
						bravad_icon( 'chevron-right' )
					);

					echo '<div class="swiper-container js-slideshow-swiper"><div class="swiper-wrapper">';

					foreach ( $photos as $img_id ) {
						echo sprintf( '<div class="swiper-slide"><div class="image image-%s"><img src="%s" alt="%s" /></div></div>',
							$ratio,
							bravad_img( $img_id, $size )['url'],
							bravad_img( $img_id )['alt']
						);
					}

					echo '</div></div></div></div>';
				}
			}
			?>
			
		</div><!-- .container -->
		
	</div><!-- .block-background -->
</section>
