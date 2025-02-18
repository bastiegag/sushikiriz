<?php
/**
 * Features template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 * 
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type     = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width    = get_sub_field( 'full-width' );
$features = get_sub_field( 'features' );
$bg       = get_sub_field( 'background' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			
			if ( ! empty( $features ) ) {
				echo '<div class="features-list">';
				echo '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">';

				foreach ( $features as $item ) {
					$link = $item['link'];

					echo sprintf( '<div class="col"><div class="feature-item">%s%s<h3 class="h6">%s</h3>%s</div></div>',
						! empty( $link ) ? '<a href="' . $link['url'] . '" title="' . $link['title'] . '" target="' . $link['target'] . '"></a>' : '',
						! empty( $item['icon'] ) ? bravad_icon( $item['icon'], 'xl' ) : '',
						$item['title'],
						! empty( $item['subtitle'] ) ? '<p>' . $item['subtitle'] . '</p>' : ''
					);
				}

				echo '</div>';
				echo '</div>';
			}

			$link = get_sub_field( 'link' );

			echo ! empty( $link ) ? sprintf( '<div class="mt-4 text-center"><a href="%s" title="%s" class="btn btn-%s"%s>%2$s</a></div>',
				$link['url'],
				$link['title'],
				$bg['color'] == 'primary' ? 'white' : 'primary',
				! empty( $link['target'] ) ? ' target="_blank"' : ''
			) : '';
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
