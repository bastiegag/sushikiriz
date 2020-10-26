<?php
/**
 * Comments template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<section class="block block-comments bg-gray text-white">
	<div class="container">

		<?php
		echo '<h2>' . __( 'Commentaires', 'bravad' ) . '</h2>';

		/**
		 * Get comments
		 */
		Bravad_Comment::get_comments(); 
		?>

	</div><!-- .container -->
</section><!-- .block -->
