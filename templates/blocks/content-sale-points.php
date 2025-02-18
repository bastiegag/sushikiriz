<?php
/**
 * Sale points template part
 *
 * @package Sushikiriz
 * @version 2.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$type  = str_replace( 'content-', '', basename( __FILE__, '.php' ) );
$width = get_sub_field( 'full-width' );
$text  = get_sub_field( 'text' );
?>

<section class="block block-<?php echo $type; ?>" <?php echo bravad_block_animation(); ?>>
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

	</div><!-- .container -->

	<div class="container py-4">
		<div class="row justify-content-center">
			<div class="col-12 col-md-10 col-lg-8">
				
				<form class="search-points js-search-points">
					<div class="input-group">
						<input type="text" class="form-control js-address" placeholder="<?php _e( 'Adresse, ville, code postal...', 'bravad' ); ?>">
						<select class="form-control js-rayon" id="rayon">
							<option value="1">1 km</option>
							<option value="5">5 km</option>
							<option value="10" selected="selected">10 km</option>
							<option value="25">25 km</option>
							<option value="50">50 km</option>
						</select>
						<div class="input-group-append">
							<button class="btn btn-primary js-find" type="submit" title="<?php _e( 'Rechercher', 'bravad' ); ?>"><?php echo bravad_icon( 'zoom', 'sm' ); ?></button>
							<button class="btn btn-dark js-geo" type="button" title="<?php _e( 'Ma position', 'bravad' ); ?>"><?php echo bravad_icon( 'target', 'sm' ); ?></button>
						</div>
					</div>

					<?php
					$terms = get_terms( 'points_cat' );

					if ( $terms ) {
						echo sprintf( '<br /><div class="map-filters js-filters"><small>%s</small>',
							__( 'Filtre(s):', 'bravad' )
						);

						echo sprintf( '<a href="#" class="badge badge-you js-map-filter is-active" data-cat="you">%s</a>',
							__( 'Vous', 'bravad' )
						);

						foreach ( $terms as $term ) {
							echo sprintf( '<a href="#" class="badge badge-%s js-map-filter is-active" data-cat="%1$s">%s</a>',
								$term->slug,
								$term->name
							);
						}

						echo '</div>';
					}
					?>
				</form>

			</div><!-- .col -->
		</div><!-- .row -->
		
		<div class="map-error js-map-sale-error"></div>
	</div><!-- .container -->

	<div class="map-holder">
		<div class="map-loader js-map-sale-loader"></div>
		<div class="map js-map-sale"></div>
	</div><!-- .map-holder -->
</section>
