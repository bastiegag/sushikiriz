<?php
/**
 * Testimonials template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$text  = get_sub_field( 'text' );
$link  = get_sub_field( 'link' );
$bg    = get_sub_field( 'background' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			?>

                    <!-- Swiper -->
            <div class="swiper swiper-testimonials">
                <div class="swiper-wrapper">


                    <?php
                    if (have_rows('temoignages')) :
    
                        while (have_rows('temoignages')) : the_row();
                    ?>
                        <div class="swiper-slide">
                            <div class="testimony-container">
                                <div class="testimony-left">
                                    <img src="<?the_sub_field('img');?>" alt="">
                                    <h3><?the_sub_field('name');?></h3>
                                    <div class="testimony-line"></div>
                                    <p><?the_sub_field('relation');?></p>
                                </div>
                                <div class="testimony-right">
                                    <div class="testimony-text"><?the_sub_field('text');?></div>
                                </div>
                            </div>
                        </div>
                    <?php
                        endwhile;
                    endif;
                    ?>

                </div>
                <div class="swiper-pagination swiper-pagination-testimonials"></div>
            </div>
			
		</div><!-- .container -->

	</div><!-- .block-background -->

    <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
    <script>
      var swiper = new Swiper(".swiper-testimonials", {
        pagination: {
          el: ".swiper-pagination-testimonials",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
      });
    </script>

</section>
