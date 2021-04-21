<?php
/**
 * Posts template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type           = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width          = get_sub_field( 'full-width' );
$post_type      = get_sub_field( 'post-type' );
$orderby        = get_sub_field( 'orderby' );
$order          = get_sub_field( 'order' );
$posts_per_page = get_sub_field( 'posts-per-page' );
$link           = get_sub_field( 'link' );
$bg             = get_sub_field( 'background' );

if ( ! bravad_is( $post_type ) ) {
	return;
}
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">
			<?php
			/**
			 * Hook: bravad_before_shop_loop.
			 *
			 * @hooked woocommerce_output_all_notices - 10
			 */
			do_action( 'bravad_before_shop_loop' );

			echo bravad_block_title( $type );
			?>
		</div><!-- .container -->

		<div class="container<?php echo $width ? '-fluid' : ''; ?>-lg js-posts">

			<?php
			echo sprintf( '<a href="#" class="swiper-direction swiper-prev js-prev">%s</a>',
				bravad_icon( 'chevron-left' )
			);

			echo sprintf( '<a href="#" class="swiper-direction swiper-next js-next">%s</a>',
				bravad_icon( 'chevron-right' )
			);
			
			$args = array(
				'order'          => $order,
				'orderby'        => $orderby,
				'post_status'    => 'publish',
				'post_type'      => $post_type,
				'posts_per_page' => $posts_per_page
			);

			$loop = new WP_Query( $args );

			if ( $loop->have_posts() ) :
				echo '<div class="swiper-container js-posts-swiper px-3 px-lg-0"><div class="swiper-wrapper">';

				while( $loop->have_posts() ) : $loop->the_post();

					echo '<div class="swiper-slide">';

					if ( $post_type == 'product' ) {
						wc_get_template_part( 'content', 'product' );

					} else {
						get_template_part( 'templates/parts/item', $post_type, array( 'block' => true ) );
					}

					echo '</div>';

				endwhile;

				echo '</div></div>';
			endif;
			wp_reset_postdata();

			echo ! empty( $link ) ? sprintf( '<div class="mt-4 text-center"><a href="%s" title="%s" class="btn btn-%s"%s>%2$s</a></div>',
				$link['url'],
				$link['title'],
				$bg['color'] == 'primary' ? 'white' : 'primary',
				! empty( $link['target'] ) ? ' target="_blank"' : ''
			) : '';
			?>
			
		</div><!-- .container-lg -->
		
	</div><!-- .block-background -->
</section>
