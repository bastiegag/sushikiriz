<?php
/**
 * Text template part
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
$link  = get_sub_field( 'link' );
$bg    = get_sub_field( 'background' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			
			if ( ! empty( $text ) ) {
				echo sprintf( '<div class="row">%s</div>',
					bravad_multi_col( $text )
				);
			}

			echo ! empty( $link ) ? sprintf( '<div class="mt-3"><a href="%s" title="%s" class="btn btn-%s"%s>%2$s</a></div>',
				$link['url'],
				$link['title'],
				$bg['color'] == 'primary' ? 'white' : 'primary',
				! empty( $link['target'] ) ? ' target="_blank"' : ''
			) : '';
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
