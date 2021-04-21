<?php
/**
 * FAQ template part
 *
 * @package Sushikiriz
 * @version 2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$faq   = get_sub_field( 'questions' );
?>

<section <?php echo bravad_block_options( $type ); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			
			if ( ! empty( $faq ) ) {
				echo '<div class="faq-list">';
				echo '<div class="row">';

				foreach ( $faq as $item ) {
					echo sprintf( '<div class="col-12"><div class="faq-item"><a href="#" class="faq-question js-faq">%s %s</a><div class="faq-answer">%s%s</div></div></div>',
						$item['question'],
						bravad_icon( 'chevron-down' ),
						$item['answer'],
						! empty( $item['link'] ) ? sprintf( '<div class="mt-3"><a href="%s" title="%s" class="btn btn-primary"%s>%2$s</a></div>',
							$item['link']['url'],
							$item['link']['title'],
							! empty( $item['link']['target'] ) ? ' target="_blank"' : ''
						) : ''
					);
				}

				echo '</div>';
				echo '</div>';
			}
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
