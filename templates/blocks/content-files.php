<?php
/**
 * Fichiers template part
 *
 * @package Sushikiriz
 * @version 2.1.6
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$text  = get_sub_field( 'text' );
$files = get_sub_field( 'files' );
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			
			if ( ! empty( $text ) ) {
				echo sprintf( '<div class="row">%s</div>',
					bravad_multi_col( $text )
				);
			}

			if ( $files ) {
				echo '<div class="files"><div class="row align-items-center">';

				foreach ( $files as $item ) {
					echo sprintf( '<div class="col-6 col-md-4"><div class="file-item"><a href="%s" title="%s" target="_blank"></a>%s<p class="h6">%2$s</p><p>%s</p></div></div>',
						$item['file']['url'],
						$item['file']['title'],
						bravad_icon( 'file', 'xl' ),
						$item['file']['description']
					);
				}

				echo '</div></div>';
			}
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
