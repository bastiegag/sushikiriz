<?php
/**
 * Form template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$text  = get_sub_field( 'text' );
$form  = get_sub_field( 'form' );
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			
			if ( ! empty( $text ) ) {
				echo sprintf( '<div class="row">%s</div>',
					bravad_multi_col( $text )
				);
			}

			if ( ! empty( $form ) ) {
				echo do_shortcode( '[formtastic id="' . $form . '"]' );
			}
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
