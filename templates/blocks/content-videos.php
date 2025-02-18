<?php
/**
 * Videos template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$text  = get_sub_field( 'text' );
$width = get_sub_field( 'full-width' );
$bg    = get_sub_field( 'background' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );

            if ( ! empty( $text ) ) {
				echo sprintf( '<div class="row">%s</div>',
					bravad_multi_col( $text )
				);
			}
            ?>
            <div class="videos">
            <?
            if (have_rows('videos')) :
    
                while (have_rows('videos')) : the_row();
                ?>
                <div class="video <?the_sub_field('video-width');?>">
                    <div class="video-container">
                <?

                    //If it's a file
                    if (get_sub_field('type') == false) :
			?>
                
                        <iframe class="video-player" src="<? the_sub_field('file'); ?>" title="File video player" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>

            <?php
                    //If it's a Youtube link
                    else :
            ?>
                        <iframe class="video-player" src="<? the_sub_field('yt-link'); ?>" title="YouTube video player" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>

            <?php
                    endif;
            ?>
                    </div><!-- video -->
                </div><!-- video-container -->
            <?
                endwhile; 
            endif;
            ?>


            </div><!-- .videos -->

		</div><!-- .container -->

	</div><!-- .block-background -->
</section>
