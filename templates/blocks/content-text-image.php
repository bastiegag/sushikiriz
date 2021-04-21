<?php
/**
 * Text & image template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$text  = get_sub_field( 'text' );
$image = get_sub_field( 'image' );
$order = get_sub_field( 'order' );
$link  = get_sub_field( 'link' );
$bg    = get_sub_field( 'background' );
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<div class="row align-items-center">
				<?php 
				echo sprintf( '<div class="col-12 col-md-6%s">%s%s',
					$order ? ' order-last' : '',
					bravad_block_title( $type ),
					$text
				);

				echo ! empty( $link ) ? sprintf( '<div class="mt-3"><a href="%s" title="%s" class="btn btn-%s"%s>%2$s</a></div>',
					$link['url'],
					$link['title'],
					$bg['color'] == 'primary' ? 'white' : 'primary',
					! empty( $link['target'] ) ? ' target="_blank"' : ''
				) : '';
				
				echo '</div>';

				echo sprintf( '<div class="col-12 col-md-6"><div class="image image-square"><img src="%s" alt="%s" /></div></div>',
					bravad_img( $image, 'large' )['url'],
					bravad_img( $image )['alt']
				);
				?>
			</div><!-- .row -->
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
