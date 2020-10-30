<?php
/**
 * Header template
 * 
 * @package Sushikiriz
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
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="loading-screen"></div>
    <div id="site" class="site js-site">

        <?php
        /**
         * bravad_before_site hook
         *
         * @hooked bravad_site_header - 10
         */
        do_action( 'bravad_before_site' ); 
        ?>

        <div class="site-scroll">
            <main id="page" class="page">

                <?php 
                /**
                 * bravad_before_main_content hook
                 *
                 * @hooked bravad_page_hero - 10
                 */
                do_action( 'bravad_before_main_content' );
                ?>

                <div id="content" class="page-content">
