<?php
/**
 * Portfolio template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! bravad_is( 'portfolio' ) ) {
	return;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$terms = get_sub_field( 'category' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );

			$args = array(
				'order'          => 'asc',
				'orderby'        => 'menu_order',
				'post_status'    => 'publish',
				'post_type'      => 'portfolio',
				'posts_per_page' => -1
			);

			if ( ! empty( $terms ) ) {
				$args['tax_query'] = array(
					array(
						'taxonomy' => 'portfolio_cat',
						'field'    => 'term_id',
						'terms'    => $terms,
					),
				);
			}

			$loop = new WP_Query( $args );

			if ( $loop->have_posts() ) :
				echo '<div class="portfolio-list">';
				echo '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">';

				while( $loop->have_posts() ) : $loop->the_post();

					echo '<div class="col">';

					get_template_part( 'templates/parts/item', 'portfolio' );

					echo '</div>';

				endwhile;

				echo '</div>';
				echo '</div>';

			else :

				echo sprintf( '<p>%s</p>', __( 'Aucune réalisation', 'bravad' ) );

			endif;
			wp_reset_postdata();
			?>
			
		</div><!-- .container -->
		
	</div><!-- .block-background -->
</section>
