<?php
/**
 * Bravad engine room
 *
 * @package Sushikiriz
 * @version 2.2.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Assign the bravad version to a var
 */
$theme          = wp_get_theme( 'bravad' );
$bravad_version = '2.2.1';
$bravad_theme   = 'Sushikiriz';

$bravad = (object) array(
	'version' => $bravad_version,

	/**
	 * Initialize all the things
	 */
	'main' => require 'inc/class-bravad.php'
);

require 'inc/bravad-functions.php';
require 'inc/bravad-template-functions.php';
require 'inc/bravad-template-hooks.php';
require 'inc/bravad-blocks.php';
require 'inc/class-bravad-customize.php';
require 'inc/class-bravad-meta-boxes.php';
require 'inc/class-bravad-portfolio.php';
require 'inc/class-bravad-points-sale.php';
require 'inc/class-bravad-comment.php';
require 'inc/class-bravad-team.php';
require 'inc/class-bravad-image.php';
require 'inc/class-bravad-search.php';
require 'inc/class-bravad-shortcodes.php';
require 'inc/class-bravad-remove.php';

if ( bravad_is_woocommerce_activated() ) {
	$bravad->woocommerce = require 'inc/woocommerce/class-woocommerce.php';

	require 'inc/woocommerce/woocommerce-template-functions.php';
	require 'inc/woocommerce/woocommerce-template-hooks.php';
}
