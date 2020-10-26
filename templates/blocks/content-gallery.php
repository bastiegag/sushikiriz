<?php
/**
 * Gallery template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type    = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width   = get_sub_field( 'full-width' );
$photos  = get_sub_field( 'photos' );
$columns = get_sub_field( 'columns' );
$size    = get_sub_field( 'size' );
$ratio   = get_sub_field( 'ratio' );
$order   = get_sub_field( 'order' );
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );

			if ( $photos ) {
			    $ids = implode( ',', $photos );

			    $gallery = sprintf( 'gallery columns="%s" size="%s" ratio="%s" ids="%s"%s',
			    	$columns,
			    	$size,
			    	$ratio,
			    	$ids,
			    	isset( $order ) && $order ? ' orderby="rand"' : ''
			    );

			    echo do_shortcode( '[' . $gallery . ']' );
			}
			?>
			
		</div><!-- .container -->
		
	</div><!-- .block-background -->
</section>
