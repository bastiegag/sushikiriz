<?php
/**
 * Post template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$img_id = get_post_thumbnail_id();
$ratio  = 'wide';

$is_block = isset( $args['block'] ) && $args['block'] ? true : false;
?>

<div class="post-item">
	<?php
	/**
	 * Get post date
	 */
	if ( $is_block ) {
		$date = sprintf( '<div class="post-date"><span>%s</span><span>%s</span></div>',
			get_the_time( 'j' ),
			get_the_time( 'M Y' )
		);
	}

	/**
	 * Get post thumbnail
	 */
	if ( ! empty( $img_id ) ) {
		echo sprintf( '<div class="image image-%s image-link"><a href="%s" title="%s"><img src="%s" alt="%s" /></a>%s</div>',
			$ratio,
			get_permalink(),
			get_the_title(),
			bravad_img( $img_id, 'large' )['url'],
			bravad_img( $img_id, 'large' )['alt'],
			isset( $date ) ? $date : ''
		);
	}

	/**
	 * Get post title
	 */
	if ( ! $is_block ) {
		echo sprintf( '<h2 class="h3"><a href="%s" title="%s">%2$s</a></h2>',
			get_permalink(),
			get_the_title()
		);

	} else {
		echo sprintf( '<br /><p><a href="%s" title="%s">%2$s</a></p>',
			get_permalink(),
			get_the_title()
		);
	}

	/**
	 * Get post meta
	 */
	if ( ! $is_block ) {
		echo bravad_post_meta();
	}

	/**
	 * Get post excerpt
	 */
	$length = $is_block ? 10 : 30;

	echo sprintf( '<p class="post-excerpt">%s <a href="%s" title="%s">%s &raquo;</a></p>',
		bravad_excerpt( get_the_excerpt(), $length ),
		get_permalink(),
		get_the_title(),
		__( 'Lire la suite', 'bravad' )
	);
	?>
</div><!-- .post-item -->
