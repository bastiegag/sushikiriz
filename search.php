<?php
/**
 * Search template
 * 
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $wp_query;

get_header(); 
?>

<div class="block">
	<div class="container">

		<?php
		$post_types = array(
			'page'      => __( 'Page', 'bravad' ),
			'product'   => __( 'Produit', 'bravad' ),
			'post'      => __( 'Article', 'bravad' ),
			'team'      => __( 'Équipe', 'bravad' ),
			'portfolio' => __( 'Portfolio', 'bravad' )
		);

		if ( have_posts() ) :
			echo '<div class="search-list">';
			echo '<div class="row">';

			while( have_posts() ) : the_post();
				
				$text = stristr( get_the_content(), get_search_query() );

				if ( ! empty( $text ) ) {
					$excerpt = bravad_excerpt( $text, 25 );

				} else {
					$excerpt = bravad_excerpt( get_the_content(), 25 );
				}

				echo sprintf( '<div class="col-12"><div class="search-item"><a href="%s" title="%s">%2$s</a> <small class="text-gray">(%s)</small><p>%s</p></div></div>',
					get_permalink(),
					preg_replace( '/(' . get_search_query() . ')/i', '<strong>$1</strong>', get_the_title() ),
					$post_types[ get_post_type() ],
					preg_replace( '/(' . get_search_query() . ')/i', '<mark>$1</mark>', $excerpt )
				);

			endwhile;

			echo '</div>';
			echo '</div>';

			/**
			 * Get pagination
			 */
			get_template_part( 'templates/parts/site', 'pagination' );

		else :

			echo sprintf( '<p>%s</p>', __( 'Aucun résultat', 'bravad' ) );

		endif;
		wp_reset_postdata();
		?>

	</div><!-- .container -->
</div><!-- .block -->

<?php
get_footer();
