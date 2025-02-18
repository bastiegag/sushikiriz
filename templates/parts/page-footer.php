<?php
/**
 * Page footer template part
 *
 * @package Sushikiriz
 * @version 2.0.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! bravad_is( 'footer', false ) ) {
	return;
}
?>

<section class="block page-footer">
	<div class="container">

		<div class="widget-list">
			<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
				<?php
				/**
				 * Get footer widget
				 */
				dynamic_sidebar( 'sidebar-footer' );
				?>
			</div><!-- .row -->
		</div><!-- .widget-list -->

		<?php if ( has_nav_menu( 'footer' ) ) : ?>
			<nav id="footer-nav" class="footer-nav">
			    <ul>
			        <?php 
			        /**
			         * Get footer menu
			         */
			        bravad_menu( 'footer' );
			        ?>
			    </ul>
			</nav><!-- .secondary-nav -->
		<?php endif ?>

		<?php
		if ( bravad_has_social() ) {
			/**
			 * Get social medias
			 */
			bravad_social();
		}
		?>

	</div><!-- .container -->
</section><!-- .block -->
