<?php
/**
 * Template name: Icons
 * 
 * @since Bravad 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" />
    <meta name="theme-color" content="#000000" />
    <meta name="format-detection" content="telephone=no">

    <title><?php echo get_bloginfo( 'name' ) . ' - ' . __( 'Site en maintenance', 'bravad' ); ?></title>

    <link rel="shortcut icon" href="<?php echo esc_url( get_field( 'favicon', 'option' ) ); ?>" />
    <link rel="apple-touch-icon" href="<?php echo esc_url( get_field( 'apple', 'option' ) ); ?>" />

    <style>
        <?php
            $style = get_template_directory_uri() . '/assets/css/style.min.css';

            $args = array(
                'ssl' => array(
                    'verify_peer'      => false,
                    'verify_peer_name' => false
                )
            );

            echo file_get_contents( $style, false, stream_context_create( $args ) );
        ?>
    </style>
</head>
<body class="is-maintenance">
    <div id="site" class="site js-site is-shown">

		<main id="page" class="page">
            <div class="maintenance">
                <?php
                    $logo = get_field( 'logo-alt', 'option' );

                    echo sprintf( '<div class="maintenance-logo"><img src="%s" alt="%s" /></div>',
                        bravad_img( $logo )['url'],
                        get_bloginfo( 'name' )
                    );

                    echo sprintf( '<header><h1 class="h4 text-darker">%s</h1></header>',
                        __( 'Site en maintenance', 'bravad' )
                    );

                    echo sprintf( '<p>%s</p><p>%s</p>',
                        __( 'Nous travaillons actuellement à améliorer <br />votre expérience sur notre site web.', 'bravad' ),
                        __( 'Nous nous excusons pour le dérangement.<br />Notre site sera bientôt de nouveau en ligne.', 'bravad' )
                    );
                ?>
            </div><!-- .maintenance -->
		</main><!-- .page -->

	</div><!-- .site -->
</body>
</html>
