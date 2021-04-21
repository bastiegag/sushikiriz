<?php
/**
 * Page slideshow template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div id="slideshow" class="page-slideshow hero <?php echo bravad_hero_options(); ?>">
	<?php
	$slideshow = bravad_field( 'hero-slideshow' );

	if ( $slideshow['images'] ) {
		$i = 0;

		echo '<div class="swiper-container js-content-swiper">';
		echo '<div class="swiper-wrapper">';

		foreach ( $slideshow['images'] as $slide ) {
			$img_id   = $slide['image'];
			$title    = $slide['title'];
			$subtitle = $slide['subtitle'];
			$link     = $slide['link'];

			echo '<div class="swiper-slide">';
			echo '<div class="container"><div class="hero-caption" data-swiper-parallax="-250">';

			echo sprintf( '%s%s',
				$i == 0 ? '<h1>' . $title . '</h1>' : '<h2 class="h1">' . $title . '</h2>',
				! empty( $subtitle ) ? '<p>' . $subtitle . '</p>' : ''
			);

			echo ! empty( $link ) ? sprintf( '<a href="%s" title="%s" target="%s" class="btn btn-primary">%2$s</a>',
				$link['url'],
				$link['title'],
				$link['target']
			) : '';

			echo '</div></div></div>';

			$i++;
		}

		echo '</div></div>';
	}
	?>

	<div class="hero-background js-background <?php echo $slideshow['parallax'] ? 'parallax' : 'normal'; ?>">
		<?php
		$filters = array();

		if ( $slideshow['grayscale'] !== '0' ) {
			$filters[] = 'grayscale(' . $slideshow['grayscale'] . '%)';
		}

		if ( $slideshow['blur'] !== '0' ) {
			$filters[] = 'blur(' . $slideshow['blur'] . 'px)';
		}

		echo sprintf( '<a href="#" class="swiper-direction swiper-prev js-prev">%s</a>',
			bravad_icon( 'chevron-left' )
		);

		echo sprintf( '<a href="#" class="swiper-direction swiper-next js-next">%s</a>',
			bravad_icon( 'chevron-right' )
		);

		if ( $slideshow['images'] ) {
			// echo '<div class="parallax-image">';
			echo sprintf( '<div class="%s-image" style="%s%s%s">',
				$slideshow['parallax'] ? 'parallax' : 'normal',
				$slideshow['opacity'] !== '100' ? ' opacity: ' . $slideshow['opacity'] / 100 . ';' : '',
				! empty( $filters ) ? ' filter: ' . implode( ' ', $filters ) . ';' : '',
				$slideshow['blend'] !== 'normal' ? ' mix-blend-mode: ' . $slideshow['blend'] . ';' : ''
			);

			echo '<div class="swiper-container js-main-swiper">';
			echo '<div class="swiper-wrapper">';

			foreach ( $slideshow['images'] as $slide ) {
				$img_id = $slide['image'];

				echo sprintf( '<div class="swiper-slide" style="background-image: url(%s);"%s></div>',
					bravad_img( $img_id )['url'],
					! empty( $filters ) ? ' filter: ' . implode( ' ', $filters ) . ';' : '',
				);
			}

			echo'</div></div></div>';
		}
		?>
	</div><!-- .hero-background -->
</div>
