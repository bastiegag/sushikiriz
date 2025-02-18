<?php
/**
 * Advantages template part
 *
 * @package Sushikiriz
 * @version 2.2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$bg    = get_sub_field( 'background' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			?>

            <!-- Swiper -->
    <div class="swiper swiper-advantages">
      <div class="swiper-wrapper">
        <?php
        if (have_rows('advantages')) :

            while (have_rows('advantages')) : the_row();
        ?>
            <div class="swiper-slide swiper-slide-advantages">
                <div class="container-advantages">
                    <?if(!empty(get_sub_field('icon'))){
                        echo bravad_icon( get_sub_field('icon'), 'xl' );
                    }?>
                    <h3><?the_sub_field('title');?></h3>
                    <div class="advantages-text"><?the_sub_field('text');?></div>

                </div>
            </div>
        <?php
            endwhile;
        endif;
        ?>
      </div>
      <div class="swiper-button-next swiper-button-next-advantages"></div>
      <div class="swiper-button-prev swiper-button-prev-advantages"></div>
      <div class="swiper-pagination swiper-pagination-advantages"></div>
    </div>
			
		</div><!-- .container -->

	</div><!-- .block-background -->

    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

    <!-- Initialize Swiper -->
    <script>
      var swiper = new Swiper(".swiper-advantages", {
        effect: "flip",
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination-advantages",
        },
        navigation: {
          nextEl: ".swiper-button-next-advantages",
          prevEl: ".swiper-button-prev-advantages",
        },
      });
    </script>
</section>
