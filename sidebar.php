 <?php
/**
 * Sidebar template
 *
 * @package Sushikiriz
 */
if ( ! isset( $args['id'] ) ) {
	return;
}

if ( ! is_active_sidebar( $args['id'] ) ) {
	return;
}

$toggle = ! empty( $args['toggle'] ) ? $args['toggle'] : __( 'Sidebar', 'bravad' );

echo sprintf( '<a href="#" class="btn btn-block btn-icon-right btn-gray sidebar-toggle js-toggle d-md-none">%s %s</a>',
	$toggle,
	bravad_icon( 'arrow-down', 'sm' )
);
?>

<div class="widget-area sidebar" role="complementary">
	<?php dynamic_sidebar( $args['id'] ); ?>
</div>
