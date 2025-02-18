<?php
/**
 * Site footer template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<footer id="footer" class="site-footer">
	<div class="container">

		<?php
		echo sprintf( '<p class="m-0">&copy; %d %s - %s</p>',
			date( 'Y' ),
			esc_html( get_bloginfo( 'name' ) ),
			__( 'Tous droits réservés.', 'bravad' )
		);

		echo sprintf( '<p class="bravad m-0">%s <a href="%s" target="_blank" title="%s">%s</a></p>',
			__( 'Conception web', 'bravad' ),
			esc_url( 'http://bravad.ca' ),
			'Bravad',
			'Bravad'
		);
		?>

	</div><!-- .container -->
</footer>
