<?php
/**
 * Portfolio template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$img_id = get_post_thumbnail_id();
$ratio  = 'wide';
?>

<div class="portfolio-item">
	<?php
	/**
	 * Get post thumbnail
	 */
	if ( ! empty( $img_id ) ) {
		echo sprintf( '<div class="image image-%s image-down image-link"><a href="%s" title="%s"><img src="%s" alt="%s" /></a></div>',
			$ratio,
			get_permalink(),
			get_the_title(),
			bravad_img( $img_id, 'large' )['url'],
			bravad_img( $img_id, 'large' )['alt']
		);
	}

	/**
	 * Get post title
	 */
	echo sprintf( '<a href="%s" title="%s" class="title">%2$s %s</a>',
		get_permalink(),
		get_the_title(),
		bravad_icon( 'chevron-right', 'xs' )
	);
	?>
</div><!-- .portfolio-item -->
