<?php
/**
 * Hero template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$post_id    = bravad_id();
$fullscreen = bravad_field( 'hero-fullscreen', $post_id );
?>

<div class="hero <?php echo bravad_hero_options(); ?>">
	<div class="container">
		<div class="hero-caption">
			
			<?php
			/**
			 * bravad_hero_caption hook
			 *
			 * @hooked bravad_page_title - 10
			 * @hooked bravad_page_subtitle - 20
			 * @hooked bravad_page_link - 30
			 */
			do_action( 'bravad_hero_caption' );
			?>

		</div><!-- .hero-caption -->
	</div><!-- .container -->

	<?php echo bravad_background( 'hero' ); ?>

		<?php
		if ( $fullscreen ) {
			echo sprintf( '<a href="#content" class="hero-scroll js-scroll">%s</a>',
				bravad_icon( 'double-arrow-down' )
			);
		}
		?>

	</div><!-- .hero-background -->
</div><!-- .hero -->
