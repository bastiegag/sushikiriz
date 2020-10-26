<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header(); ?>

	<div class="product-block block">
		<div class="container">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php
				do_action( 'woocommerce_before_single_product' );

				global $product;

				$img_id    = $product->get_image_id();
				$thumb_ids = $product->get_gallery_image_ids();
				?>

				<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>
					<div class="row">

						<?php if ( $img_id ) { ?>
							<div class="col-md-4">
								<div class="product-images">
									
									<?php if ( $thumb_ids ) { ?>
									
										<div class="product-image">
											<div class="swiper-container js-gallery-swiper">
												<div class="swiper-wrapper">
													
													<?php
													echo sprintf( '<div class="swiper-slide" style="background-image: url(%s);"><a href="%s" title="%s" data-fancybox></a></div>',
														bravad_img( $img_id, 'large' )['url'],
														bravad_img( $img_id )['url'],
														bravad_img( $img_id )['title']
													);

													if ( $thumb_ids ) {
														foreach ( $thumb_ids as $thumb_id ) {
															echo sprintf( '<div class="swiper-slide" style="background-image: url(%s);"><a href="%s" title="%s" data-fancybox></a></div>',
																bravad_img( $thumb_id, 'large' )['url'],
																bravad_img( $thumb_id )['url'],
																bravad_img( $thumb_id )['title']
															);
														}
													}
													?>

												</div><!-- .swiper-wrapper -->
											</div><!-- .swiper-conainer -->
										</div><!-- .product-image -->

										<div class="product-thumbnails">
											<div class="swiper-container js-thumbnail-swiper">
												<div class="swiper-wrapper">

													<?php
													echo sprintf( '<div class="swiper-slide" style="background-image: url(%s);"></div>',
														bravad_img( $img_id, 'medium' )['url']
													);

													foreach ( $thumb_ids as $thumb_id ) {
														echo sprintf( '<div class="swiper-slide" style="background-image: url(%s);"></div>',
															bravad_img( $thumb_id, 'medium' )['url']
														);
													}
													?>

												</div><!-- .swiper-wrapper -->
											</div><!-- .swiper-conainer -->
										</div><!-- .product-thumbnail -->
									
									<?php } else { ?>

										<?php
										echo sprintf( '<div class="image image-square"><a href="%s" title="%s" data-fancybox><img src="%s" alt="%s" /></a></div>',
											bravad_img( $img_id )['url'],
											bravad_img( $img_id )['title'],
											bravad_img( $img_id, 'large' )['url'],
											bravad_img( $img_id )['alt']
										);
										?>

									<?php } ?>

								</div><!-- .product-images -->
							</div><!-- .col -->

							<div class="col-md-8">

						<?php } else { ?>
							<div class="col-12">
						<?php } ?>

							<div class="summary entry-summary">
								<?php
								the_title( '<p class="h4">', '</p>' );

								/**
								 * Hook: woocommerce_single_product_summary.
								 *
								 * @hooked woocommerce_template_single_title - 5
								 * @hooked woocommerce_template_single_rating - 10
								 * @hooked woocommerce_template_single_price - 10
								 * @hooked woocommerce_template_single_excerpt - 20
								 * @hooked woocommerce_template_single_add_to_cart - 30
								 * @hooked woocommerce_template_single_meta - 40
								 * @hooked woocommerce_template_single_sharing - 50
								 * @hooked WC_Structured_Data::generate_product_data() - 60
								 */
								do_action( 'woocommerce_single_product_summary' );
								?>
							</div>
						</div><!-- .col -->
					</div><!-- .row -->
				</div>

			<?php endwhile; // end of the loop. ?>

		</div><!-- .container -->
	</div><!-- .block -->

	<?php
	/**
	 * bravad_main_content hook
	 *
	 * @hooked bravad_posts_content - 10
	 * @hooked bravad_woocommerce_content - 15
	 * @hooked bravad_blocks_content - 20
	 */
	do_action( 'bravad_main_content' );

get_footer();
