<?php
/**
 * WooCommerce template functions
 *
 * @package Sushikiriz
 */

if ( ! function_exists( 'bravad_cart_count_fragments' ) ) {
	/**
	 * Cart count fragments
	 */
	function bravad_cart_count_fragments( $fragments ) {
		$fragments['span.cart-count'] = '<span class="cart-count">' . WC()->cart->get_cart_contents_count() . '</span>';
		
		return $fragments;
	}
}
