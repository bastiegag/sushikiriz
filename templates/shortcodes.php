<?php
/**
 * Shortcodes template
 * 
 * @package Sushikiriz
 * @version 2.2.0
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

    <title><?php echo get_bloginfo( 'name' ) . ' - ' . __( 'Shortcodes', 'bravad' ); ?></title>

    <link rel="shortcut icon" href="<?php echo esc_url( get_field( 'favicon', 'option' ) ); ?>" />
    <link rel="apple-touch-icon" href="<?php echo esc_url( get_field( 'apple', 'option' ) ); ?>" />

    <?php wp_head(); ?>
</head>
<body>

    <?php
    function section( $title, $i ) {
        echo sprintf( '<a href="#" class="faq-question js-faq">%s. %s %s</a>',
            $i,
            $title,
            bravad_icon( 'chevron-down' )
        );
    }

    function shortcode( $code ) {
        echo sprintf( '<p>%s</p>',
            do_shortcode( $code )
        );
    }
    ?>

    <div id="site" class="site js-site is-shown">

		<main id="page" class="page">
            <div class="container">

                <div class="help-page py-5">

                    <div class="faq-list">

                        <div class="faq-item">
                            <?php section( 'Courriel', 1 ); ?>
                            <div class="faq-answer">
                                <p>Convertit les caractères des adresses courriel en entités HTML pour bloquer les robots.</p>
                                <pre class="p-2">[email]<p>info@bravad.ca</p>[/email]</pre>
                                <?php shortcode( '[email]info@bravad.ca[/email]' ); ?>
                                <pre class="p-2">[email <span>to="info@bravad.ca"</span>]<p>Information</p>[/email]</pre>
                                <?php shortcode( '[email to="info@bravad.ca"]Information[/email]' ); ?>
                            </div>
                        </div><!-- faq-item -->

                        <div class="faq-item">
                            <?php section( 'Téléphone', 2 ); ?>
                            <div class="faq-answer">
                                <p>Convertit les numéros de téléphone en lien cliquable sur les téléphones mobiles.</p>
                                <pre class="p-2">[tel]<p>(819) 555-5555</p>[/tel]</pre>
                                <?php shortcode( '[tel](819) 555-5555[/tel]' ); ?>
                            </div>
                        </div><!-- faq-item -->

                        <div class="faq-item">
                            <?php section( 'Bouton', 3 ); ?>
                            <div class="faq-answer">
                                <p>Crée lien avec l'apparence d'un bouton.</p>
                                <pre class="p-2">[button <span>url="https://bravad.ca"</span>]<p>En savoir plus</p>[/button]</pre>
                                <?php shortcode( '[button url="https://bravad.ca"]En savoir plus[/button]' ); ?>
                                <pre class="p-2">[button <span>url="https://bravad.ca" bg="secondary" color="white" target="_blank"</span>]<p>En savoir plus</p>[/button]</pre>
                                <?php shortcode( '[button url="https://bravad.ca" bg="secondary" color="white" target="_blank"]En savoir plus[/button]' ); ?>
                            </div>
                        </div><!-- faq-item -->

                        <div class="faq-item">
                            <?php section( 'Icône', 4 ); ?>
                            <div class="faq-answer">
                                <p>Génère une icône svg.</p>
                                <pre class="p-2">[icon i="star"]</pre>
                                <?php shortcode( '[icon i="star"]' ); ?>
                                <pre class="p-2">[icon i="heart" size="xl"]</pre>
                                <?php shortcode( '[icon i="heart" size="xl"]' ); ?>
                            </div>
                        </div><!-- faq-item -->

                        <div class="faq-item">
                            <?php section( 'Caractéristique', 5 ); ?>
                            <div class="faq-answer">
                                <p>Génère une icône avec un titre et un lien.</p>
                                <pre class="p-2">[feature icon="fish" title="Pas de sushi, on est là!" link="https://bravad.ca"]</pre>
                                <?php shortcode( '[feature icon="fish" title="Pas de sushi, on est là!" link="https://bravad.ca"]' ); ?>
                            </div>
                        </div><!-- faq-item -->

                        <div class="faq-item">
                            <?php section( 'Faq', 6 ); ?>
                            <div class="faq-answer">
                                <p>Génère une question/réponse.</p>
                                <pre class="p-2">[faq question="Lorem ipsum dolor sit amet?"]Cras consectetur tempus libero viverra lacinia.[/faq]</pre>
                                <?php shortcode( '[faq question="Lorem ipsum dolor sit amet?"]Cras consectetur tempus libero viverra lacinia.[/faq]' ); ?>
                            </div>
                        </div><!-- faq-item -->

                    </div><!-- .faq-list -->

                </div><!-- .help-page -->
                
            </div><!-- .container -->
		</main><!-- .page -->

	</div><!-- .site -->

    <?php wp_footer(); ?>
</body>
</html>
