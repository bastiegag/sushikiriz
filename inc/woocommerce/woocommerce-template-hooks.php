<?php
/**
 * WooCommerce Hooks
 *
 * @package Sushikiriz
 * @version 2.1.8
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Global
 */
add_filter( 'woocommerce_add_to_cart_fragments', 'bravad_cart_count_fragments', 10, 1 );

/**
 * Before shop loop
 */
add_action( 'woocommerce_before_shop_loop', function() { echo '<div class="products-filter">'; }, 15 );
add_action( 'woocommerce_before_shop_loop', function() { echo '</div>'; }, 35 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
add_action( 'bravad_before_shop_loop', 'woocommerce_output_all_notices', 10 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
add_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 30 );
add_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 20 );

/**
 * Shop
 */
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );

/**
 * Single product
 */
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
