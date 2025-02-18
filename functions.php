<?php
/**
 * Bravad engine room
 *
 * @package Sushikiriz
 * @version 2.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Assign the bravad version to a var
 */
$theme          = wp_get_theme( 'bravad' );
$bravad_version = '2.4.4';
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

// Disable xmlrpc
function remove_xmlrpc_methods( $methods ) {
  return array();
}

function add_xmlrpc_block_to_htaccess() {
    // Define the .htaccess file path
    $htaccess_file = ABSPATH . '.htaccess';
    
    // Define the rules to add
	$xmlrpc_block = "# Block WordPress xmlrpc.php requests\n";
    $xmlrpc_block .= "<Files xmlrpc.php>\n    Order Allow,Deny\n    Deny from all\n</Files>\n";
	$xmlrpc_block .= "# END xmlrpc.php block\n";

    // Check if .htaccess file is writable
    if (is_writable($htaccess_file)) {
        // Read the existing contents of the .htaccess file
        $htaccess_contents = file_get_contents($htaccess_file);

        // Check if the rules already exist
        if (strpos($htaccess_contents, $xmlrpc_block) === false) {
            // Append the rules to the .htaccess file
            file_put_contents($htaccess_file, $xmlrpc_block, FILE_APPEND | LOCK_EX);
        }
    } else {
        // If .htaccess is not writable, you can display an admin notice (optional)
        add_action('admin_notices', function() {
            echo '<div class="notice notice-error"><p>The .htaccess file is not writable. Please update the file permissions.</p></div>';
        });
    }
}

// Hook the function to an appropriate action
add_action('admin_init', 'add_xmlrpc_block_to_htaccess');

// Disable REST API for non-authenticated users
add_filter('rest_enabled', '__return_false');
add_filter('rest_jsonp_enabled', '__return_false');
add_filter('rest_authentication_errors', function( $result ) {
    if ( ! empty( $result ) ) {
        return $result;
    }
    if ( ! is_user_logged_in() ) {
        return new WP_Error( 'rest_not_logged_in', 'You are not currently logged in.', array( 'status' => 401 ) );
    }
    return $result;
});

