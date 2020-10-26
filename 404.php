<?php
/**
 * 404 template
 * 
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header(); 
?>

<div class="block">
	<div class="container">

		<?php
		$link = get_permalink( bravad_option( '404-contact' ) );
		
		echo sprintf( '<h2>%s</h2>',
			__( 'Que faire maintenant?', 'bravad' )
		);

		echo '<p>' . sprintf( __( "Le moyen le plus simple est de suivre ce lien pour accéder à la %s page d'accueil %s, mais vous pouvez également accéder directement à l'une de nos sections en utilisant le menu de navigation.", 'bravad' ),
			'<a href="' . esc_url( home_url( '/' ) ) . '">',
			'</a>'
		) . '</p>';

		if ( ! empty( $link ) ) {
			echo '<p>' . sprintf( __( "Si vous arrivez ici lorsque vous suivez un lien d'un autre site Web, vous pouvez %s nous contacter %s pour nous signaler cette erreur.", 'bravad' ),
				'<a href="' . esc_url( $link ) . '">',
				'</a>'
			) . '</p>';
		}
		?>

	</div><!-- .container -->
</div><!-- .block -->

<?php
get_footer();
