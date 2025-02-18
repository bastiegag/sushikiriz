<?php
/**
 * Bravad Sale Class
 *
 * @package Sushikiriz
 * @version 2.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'Bravad_Sale' ) ) :

	/**
	 * Bravad_Sale class
	 */
	class Bravad_Sale {

		public function __construct() {
			if ( ! bravad_is( 'sale-points', false ) ) {
				return;
			}

			add_action( 'init', array( $this, 'register_post_types' ), 5 );
			add_action( 'init', array( $this, 'register_taxonomies' ), 5 );

			add_action( 'wp_ajax_nopriv_get_points', array( $this, 'get_points' ) );
			add_action( 'wp_ajax_get_points', array( $this, 'get_points' ) );

			add_filter( 'manage_points_posts_columns', array( $this, 'columns' ) );
			add_action( 'manage_points_posts_custom_column', array( $this, 'columns_content' ), 10, 2 );
		}

		/**
		 * Register post types
		 */
		public function register_post_types() {
			if ( ! post_type_exists( 'points' ) ) {
				register_post_type( 'points',
					array(
						'labels'              => array(
							'add_new'            => __( 'Ajouter un point de vente', 'bravad' ),
							'add_new_item'       => __( 'Ajouter un nouveau point de vente', 'bravad' ),
							'all_items'          => __( 'Tous les points de vente', 'bravad' ),
							'edit_item'          => __( 'Modifier le point de vente', 'bravad' ),
							'menu_name'          => _x( 'Points de vente', 'Post type name in menu', 'bravad' ),
							'name'               => _x( 'Points de vente', 'Post type name', 'bravad' ),
							'name_admin_bar'     => _x( 'Points de vente', 'Post type name on top bar', 'bravad' ),
							'new_item'           => __( 'Nouveau point de vente', 'bravad' ),
							'not_found'          => __( 'Aucun point de vente trouvé', 'bravad' ),
							'not_found_in_trash' => __( 'Aucun point de vente trouvé dans la corbeille', 'bravad' ),
							'parent_item_colon'  => __( 'Point de vente parent', 'bravad' ),
							'search_items'       => __( 'Rechercher un point de vente', 'bravad' ),
							'singular_name'      => _x( 'Point de vente', 'Singular post type name', 'bravad' ),
							'view_item'          => __( 'Voir le point de vente', 'bravad' ),
						),
						'capability_type'     => 'post',
						'exclude_from_search' => true,
						'has_archive'         => true,
						'hierarchical'        => false,
						'menu_icon'           => 'dashicons-location',
						'menu_position'       => 100,
						'public'              => true,
						'publicly_queryable'  => true,
						'query_var'           => true,
						'rewrite'             => array( 'slug' => 'points', 'with_front' => true ),
						'show_in_admin_bar'   => true,
						'show_in_menu'        => true,
						'show_in_nav_menus'   => false,
						'show_ui'             => true,
						'supports'            => array( 'title' ),
					)
				);
			}
		}

		/**
		 * Register taxonomies
		 */
		public function register_taxonomies() {
			if ( ! taxonomy_exists( 'points_cat' ) ) {
				register_taxonomy( 'points_cat', 
					array( 
						'points',
					),
					array(
						'labels'            => array(
							'add_new_item'      => __( 'Ajouter une catégorie', 'bravad' ),
							'all_items'         => __( 'Toutes les catégories', 'bravad' ),
							'edit_item'         => __( 'Modifier la catégorie', 'bravad' ),
							'menu_name'         => __( 'Catégories', 'bravad' ),
							'name'              => __( 'Catégories', 'bravad' ),
							'new_item_name'     => __( 'Nom de la nouvelle catégorie', 'bravad' ),
							'parent_item'       => __( 'Catégorie parente', 'bravad' ),
							'parent_item_colon' => __( 'Catégorie parente', 'bravad' ),
							'search_items'      => __( 'Rechercher une catégorie', 'bravad' ),
							'singular_name'     => __( 'Catégorie équipe', 'bravad' ),
							'update_item'       => __( 'Mettre à jour la catégorie', 'bravad' ),
						),
						'hierarchical'       => true,
						'publicly_queryable' => false,
						'query_var'          => true,
						'show_admin_column'  => true,
						'show_in_nav_menus'  => false,
						'show_ui'            => true,
					)
				);
			}
		}

		/**
		 * Get points
		 */
		public function get_points() {
			$markers = [];

			$args = array(
				'order'          => 'asc',
				'orderby'        => 'menu_order',
				'post_status'    => 'publish',
				'post_type'      => 'points',
				'posts_per_page' => -1
			);

			$loop = new WP_Query( $args );

			if ( $loop->have_posts() ) :
				while( $loop->have_posts() ) : $loop->the_post();

					$marker = get_field( 'marker' );
					$terms  = get_the_terms( get_the_ID(), 'points_cat' );

					$markers[] = array(
						'lat'     => $marker['lat'],
						'lng'     => $marker['lng'],
						'cat'     => $terms[0]->slug,
						'title'   => get_the_title(),
						'address' => $marker['address']
					);

				endwhile;

				wp_send_json_success( 
					array(
						'markers' => $markers
					)
				);

				wp_die();

			else :
				
				wp_send_json_error();

				wp_die();

			endif;
			wp_reset_postdata();
		}

		/**
		 * Add columns
		 */
		public function columns( $columns ) {
		    $custom_cols = [];

		    foreach ( $columns as $key => $title ) {
		        if ( $key == 'date' ) {
		            $custom_cols['address'] = __( 'Adresse', 'bravad' );
		        }

		        $custom_cols[ $key ] = $title;
		    }
		    
		    return $custom_cols;
		}
		
		/**
		 * Columns content
		 */
		public function columns_content( $column_name, $post_id ) {
		    if ( $column_name == 'address' ) {
		    	$marker = get_field( 'marker', $post_id );
		    	
		    	if ( ! empty( $marker ) ) {
		    		echo $marker['address'];
		    	}
		    }
		}

	}

endif;

return new Bravad_Sale();
