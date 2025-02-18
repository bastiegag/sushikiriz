<?php
/**
 * Archive posts template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! bravad_is( 'post' ) ) {
	return;
}
?>

<div class="block archive-post">
	<div class="container">
		
		<div class="row">
			<div class="col-md-4 order-last">
				<?php 
				/**
				 * Get sidebar
				 */
				get_sidebar( null, array( 'id' => 'sidebar-post' ) ); 
				?>
			</div><!-- .col -->

			<div class="col-md-8">
				<?php
				if ( have_posts() ) :
					while( have_posts() ) : the_post();
						
						get_template_part( 'templates/parts/item', 'post' );

					endwhile;

				else :

					echo sprintf( '<p>%s</p>', __( 'Aucun article', 'bravad' ) );

				endif;
				wp_reset_postdata();

				/**
				 * Get pagination
				 */
				get_template_part( 'templates/parts/site', 'pagination' );
				?>
			</div><!-- .col -->
		</div><!-- .row -->

	</div><!-- .container -->
</div><!-- .archive-post -->
