<?php
/**
 * FAQ template part
 *
 * @package Sushikiriz
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
					echo sprintf( '<div class="col-12"><div class="faq-item"><a href="#" class="faq-question js-faq">%s %s</a><div class="faq-answer"><p>%s</p></div></div></div>',
						$item['question'],
						bravad_icon( 'arrow-down' ),
						$item['answer']
					);
				}

				echo '</div>';
				echo '</div>';
			}
			?>
			
		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
