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

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

$img_id = get_post_thumbnail_id();
?>

<div class="product-item">
	<?php
	/**
	 * Get post thumbnail
	 */
	if ( ! empty( $img_id ) ) {
		echo sprintf( '<div class="image image-square image-link"><a href="%s" title="%s"><img src="%s" alt="%s" /></a></div>',
			get_permalink(),
			get_the_title(),
			bravad_img( $img_id, 'large' )['url'],
			bravad_img( $img_id, 'large' )['alt']
		);
	}

	the_title( '<h2><a href="' . get_permalink() . '" title="' . get_the_title() . '">', '</a></h2>' );

	echo $product->get_price_html();

	echo '<div class="product-actions">';

	/**
	 * Hook: woocommerce_after_shop_loop_item.
	 *
	 * @hooked woocommerce_template_loop_product_link_close - 5
	 * @hooked woocommerce_template_loop_add_to_cart - 10
	 */
	do_action( 'woocommerce_after_shop_loop_item' );

	echo '</div>';
	?>
</div><!-- .product-item -->
