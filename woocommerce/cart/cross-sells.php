<?php
/**
 * Cross-sells
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cross-sells.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.4.0
 */

defined( 'ABSPATH' ) || exit;

if ( $cross_sells ) : ?>

	<div class="cross-sells pt-2 pt-md-5 pb-2">

		<?php
		$heading = apply_filters( 'woocommerce_product_cross_sells_products_heading', __( 'You may be interested in&hellip;', 'woocommerce' ) );

		echo $heading ? '<h2 class="h3">' . esc_html( $heading ) . '</h2>' : '';

		echo '<div class="products-list">';
		echo '<div class="row row-cols-md-4 row-cols-2">';

		foreach ( $cross_sells as $cross_sell ) :

			$post_object = get_post( $cross_sell->get_id() );

			setup_postdata( $GLOBALS['post'] =& $post_object );

			echo '<div class="col">';

			wc_get_template_part( 'content', 'product' );

			echo '</div>';

		endforeach;

		echo '</div></div>';
		?>

	</div><!-- .cross-sells -->

	<?php
endif;

wp_reset_postdata();
