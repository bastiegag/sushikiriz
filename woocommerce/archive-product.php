<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header(); 
?>

<div class="archive-product block">
	<div class="container">

		<?php
		/**
		 * Hook: bravad_before_shop_loop.
		 *
		 * @hooked woocommerce_output_all_notices - 10
		 */
		do_action( 'bravad_before_shop_loop' );
		?>

		<div class="row">
			<div class="col-md-4 order-md-last">
				<?php 
				/**
				 * Get sidebar
				 */
				get_sidebar( null, array( 'id' => 'sidebar-shop', 'toggle' => __( 'Filtrer', 'bravad' ) ) ); 
				?>
			</div><!-- .col -->

			<div class="col-md-8">
				<?php
				if ( woocommerce_product_loop() ) {

					/**
					 * Hook: woocommerce_before_shop_loop.
					 *
					 * @hooked woocommerce_output_all_notices - 10
					 * @hooked woocommerce_result_count - 20
					 * @hooked woocommerce_catalog_ordering - 30
					 */
					do_action( 'woocommerce_before_shop_loop' );

					echo '<div class="products-list">';
					echo '<div class="row row-cols-lg-3 row-cols-2">';

					if ( wc_get_loop_prop( 'total' ) ) {
						while ( have_posts() ) {
							the_post();

							/**
							 * Hook: woocommerce_shop_loop.
							 */
							do_action( 'woocommerce_shop_loop' );

							echo '<div class="col">';

							wc_get_template_part( 'content', 'product' );

							echo '</div>';
						}
					}

					echo '</div>'; // .row
					echo '</div>'; // .products-list

					/**
					 * Hook: woocommerce_after_shop_loop.
					 *
					 * @hooked woocommerce_pagination - 10
					 */
					do_action( 'woocommerce_after_shop_loop' );
				} else {
					/**
					 * Hook: woocommerce_no_products_found.
					 *
					 * @hooked wc_no_products_found - 10
					 */
					do_action( 'woocommerce_no_products_found' );
				}
				?>
			</div><!-- .col -->
		</div><!-- .row -->

	</div><!-- .container -->
</div><!-- .archive-product -->

<?php
get_footer();
