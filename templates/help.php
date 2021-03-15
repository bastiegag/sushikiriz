<?php
/**
 * Help template
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

    <title><?php echo get_bloginfo( 'name' ) . ' - ' . __( 'Aide', 'bravad' ); ?></title>

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

    function video( $name ) {
        echo sprintf( '<br /><p><a href="%s" title="%s" class="btn btn-primary btn-sm" data-fancybox>%2$s</a></p>',
            'https://bravad.ca/aide/' . $name . '.mp4',
            'Voir la vidéo'
        );
    }
    ?>

    <div id="site" class="site js-site is-shown">

		<main id="page" class="page">
            <div class="container">

                <div class="help-page py-5">

                    <p class="h6">Général</p>

                    <div class="faq-list">

                        <div class="faq-item">
                            <?php section( 'Ajouter une <strong>page</strong>', 1 ); ?>
                            <div class="faq-answer">
                                <ol>
                                    <li>Dans l'onglet à gauche, cliquez sur -> <strong>Pages</strong> puis -> <strong>Ajouter</strong></li>
                                    <li>Inscrivez un titre de page</li>
                                    <li>Pour finaliser, cliquez sur -> <strong>Publier</strong> en haut à droite</li>
                                </ol>

                                <?php video( 'page' ); ?>
                            </div>
                        </div><!-- page -->

                        <div class="faq-item">
                            <?php section( 'Ajouter un <strong>article de blogue</strong>', 2 ); ?>
                            <div class="faq-answer">
                                <ol>
                                    <li>Dans l'onglet à gauche, cliquez sur -> <strong>Articles</strong> puis -> <strong>Ajouter</strong></li>
                                    <li>Inscrivez un titre d'article</li>
                                    <li>Choisissez une catégorie à droite</li>
                                    <li>En dessous, cliquez sur -> <strong>Définir l'image mise en avant</strong> pour choisir une image d'article</li>
                                    <li>Pour finaliser, cliquez sur -> <strong>Publier</strong> en haut à droite</li>
                                </ol>

                                <?php video( 'post' ); ?>
                            </div>
                        </div><!-- page -->

                        <div class="faq-item">
                            <?php section( 'Ajouter une catégorie/étiquette', 3 ); ?>
                            <div class="faq-answer">
                                <ol>
                                    <li>Dans l'onglet à gauche, cliquez sur -> <strong>Articles</strong> puis -> <strong>Catégories / Étiquettes</strong></li>
                                    <li>Inscrivez un nom de catégorie / étiquette</li>
                                    <li>Pour finaliser, cliquez sur -> <strong>Ajouter</strong> en bas</li>
                                </ol>

                                <?php video( 'category' ); ?>
                            </div>
                        </div><!-- page -->

                        <div class="faq-item">
                            <?php section( 'Entête de page', 4 ); ?>
                            <div class="faq-answer">
                                <ol>
                                    <li>Dans l'onglet à gauche, cliquez sur -> <strong>Page</strong> puis sélectionnez une page</li>
                                    <li>Dans l'onglet <strong>Entête</strong> de la page, vous pouvez définir un titre, un sous-titre et un lien</li>
                                    <li>Si vous voulez mettre un logo à la place du titre sur la page, choisissez une image dans le champs <strong>Logo</strong></li>
                                    <li>Cochez <strong>Plein écran</strong> si vous voulez que l'entête de la page prenne toute la hauteur</li>
                                    <li>Pour finaliser, cliquez sur -> <strong>Ajouter</strong> en bas</li>
                                </ol>

                                <?php video( 'header' ); ?>
                            </div>
                        </div><!-- page -->

                    </div>

                </div><!-- .help-page -->
                
            </div><!-- .container -->
		</main><!-- .page -->

	</div><!-- .site -->

    <?php wp_footer(); ?>
</body>
</html>
