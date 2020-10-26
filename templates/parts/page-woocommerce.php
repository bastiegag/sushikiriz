<?php
/**
 * Woocommerce template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! bravad_is_woocommerce_activated() ) {
	return;
}
?>

<section class="block page-woocommerce">
	<div class="container">

		<?php
		if ( is_cart() ) {
			echo do_shortcode( '[woocommerce_cart]' );
		}

		if ( is_checkout() ) {
			echo do_shortcode( '[woocommerce_checkout]' );
		}

		if ( is_account_page() ) {
			echo do_shortcode( '[woocommerce_my_account]' );
		}
		?>

	</div><!-- .container -->
</section><!-- .block -->
