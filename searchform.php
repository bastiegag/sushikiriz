<?php
/**
 * Search form template
 * 
 * @package Sushikiriz
 * @version 2.0.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<form role="search" method="get" class="search-form js-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<div class="input-group">
		<input type="search" class="search-field form-control" placeholder="<?php echo __( 'Recherche', 'bravad' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
		<div class="input-group-append">
			<button type="submit" class="btn btn-gray js-search">
				<?php echo bravad_icon( 'zoom', 'md' ); ?>
			</button>
		</div>
	</div>
</form>
