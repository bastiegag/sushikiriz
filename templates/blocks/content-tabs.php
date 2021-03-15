<?php
/**
 * Tabs template part
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$tabs  = get_sub_field( 'tabs' );
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			
			if ( ! empty( $tabs ) ) {
				echo '<div class="tabs js-tabs">';
				echo '<ul class="tabs-nav">';

				$i = 0;
				foreach ( $tabs as $tab ) {
					echo sprintf( '<li><a class="%s" href="#tab-%s">%s</a></li>',
						$i == 0 ? 'is-active' : '',	
						sanitize_title( $tab['title'] ),
						$tab['title']
					);

					$i++;
				}

				echo '</ul>';
				echo '<div class="tabs-content">';

				$i = 0;
				foreach ( $tabs as $tab ) {
					echo sprintf( '<div class="tabs-item%s" id="tab-%s">%s</div>',
						$i == 0 ? ' is-active' : '',
						sanitize_title( $tab['title'] ),
						! empty( $tab['text'] ) ? '<div class="row">' . bravad_multi_col( $tab['text'] ) . '</div>' : ''
					);

					$i++;
				}

				echo '</div></div>';
			}
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
