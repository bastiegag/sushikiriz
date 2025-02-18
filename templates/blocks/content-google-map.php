<?php
/**
 * Google map template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type = str_replace( 'content-', '', basename( __FILE__, '.php' ) );

if ( function_exists( 'get_field' ) && have_rows( 'locations' ) ) :
	echo '<section class="block block-' . $type . '"><div class="map js-map">';

	while ( have_rows( 'locations' ) ) : the_row(); 

		$title  = get_sub_field( 'title' );
		$marker = get_sub_field( 'marker' );

		echo sprintf( '<div class="js-marker" data-lat="%s" data-lng="%s"><h3 class="h6">%s</h3><p>%s</p></div>',
			$marker['lat'],
			$marker['lng'],
			$title,
			$marker['address']
		);

	endwhile;

	echo '</div></section>';
endif;
