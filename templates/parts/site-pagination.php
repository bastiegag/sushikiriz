<?php
/**
 * Pagination template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $wp_query;

$total = $wp_query->max_num_pages;

if ( $total > 1 ) {
	the_posts_pagination(
		array(
			'mid_size'  => 3,
			'prev_text' => bravad_icon( 'arrow-left', 'xs' ),
			'next_text' => bravad_icon( 'arrow-right', 'xs' )
		)
	);
}
