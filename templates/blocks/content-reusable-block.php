<?php
/**
 * Reusable block template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$clone  = get_sub_field( 'reusable-block' );
$blocks = get_field( 'reusable', 'option' );

if ( isset( $clone ) && $clone !== '' ) {
	if ( have_rows( 'reusable', 'option' ) ) :
		$i = 0;
		while ( have_rows( 'reusable', 'option' ) ) : the_row();

			if ( $i == $clone ) {
				if ( have_rows( 'blocks' ) ) :
					while ( have_rows( 'blocks' ) ) : the_row();

						get_template_part( 'templates/blocks/content', bravad_layout( get_row_layout() ) );

					endwhile;
				endif;
			}

			$i++;

		endwhile;
	endif;
}
