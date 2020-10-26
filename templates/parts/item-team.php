<?php
/**
 * Team template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$img_id = get_post_thumbnail_id();
$ratio  = 'portrait';
$job    = bravad_field( 'job' );
$email  = bravad_field( 'email' );
$phone  = bravad_field( 'phone' );
?>

<div class="team-item">
	<?php
	/**
	 * Get post thumbnail
	 */
	if ( ! empty( $img_id ) ) {
		echo sprintf( '<div class="image image-%s image-link"><a href="%s" title="%s" data-fancybox><img src="%s" alt="%s" /></a></div><br />',
			$ratio,
			bravad_img( $img_id, 'large' )['url'],
			get_the_title(),
			bravad_img( $img_id, 'large' )['url'],
			bravad_img( $img_id, 'large' )['alt']
		);
	}

	/**
	 * Get member info
	 */
	echo sprintf( '<h3 class="h5">%s</h3><p>%s%s%s</p>',
		get_the_title(),
		! empty( $job ) ? $job : '',
		! empty( $email ) ? '<br />' . do_shortcode( '[email]' . $email . '[/email]' ) : '',
		! empty( $phone ) ? '<br />' . do_shortcode( '[tel]' . $phone . '[/tel]' ) : ''
	);
	?>
</div><!-- .portfolio-item -->
