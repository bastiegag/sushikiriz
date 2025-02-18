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
$bg    = get_sub_field( 'background' );
$desktopCol = get_sub_field( 'desktop-col' );
$mobileCol = get_sub_field( 'mobile-col' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			?>

			<div class="row">
				<?

				if(have_rows('texts')):
					while(have_rows('texts')) : the_row();
				?>
					<div class="col-<?echo (12 /  $mobileCol);?> col-md-<?echo (12 / $desktopCol);?>">
						<div class="text-column">
							<?php the_sub_field('text'); ?>
						</div>
					</div>

				<?php
					endwhile;
				endif;
				?>
			</div>
				
			

			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
