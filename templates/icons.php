<?php
/**
 * Icon template
 * 
 * @package Sushikiriz
 */
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

    <title><?php echo get_bloginfo( 'name' ) . ' - ' . __( 'Icônes', 'bravad' ); ?></title>

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
<body>
    <div id="site" class="site js-site is-shown">

		<main id="page" class="page">
            <div class="container">

                <div class="icons-page">
                    <div class="row">
                        <?php
                        $cats = array(
                            's' => __( 'Réseaux sociaux', 'bravad' )
                        );

                        $dir   = dirname( __FILE__, 2 ) . '/src/svg/';
                        $type  = '*.svg';
                        $paths = glob( $dir . $type );

                        $icons = array();


                        foreach ( $paths as $path ) {
                            $icon = str_replace( $dir, '', $path );
                            $icon = str_replace( '.svg', '', $icon );

                            echo sprintf( '<div class="col-12 col-md-6 col-lg-4 col-xl-3 icon-col"><span>%s</span>%s</div>',
                                bravad_icon( $icon, 'sm' ),
                                $icon
                            );
                        }
                        ?>
                    </div><!-- .row -->
                </div><!-- .icons-page -->
                
            </div><!-- .container -->
		</main><!-- .page -->

	</div><!-- .site -->

</body>
</html>
