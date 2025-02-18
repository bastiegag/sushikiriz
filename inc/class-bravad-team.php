<?php
/**
 * Bravad Team Class
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'Bravad_Team' ) ) :

	/**
	 * Bravad_Team class
	 */
	class Bravad_Team {

		public function __construct() {
			if ( ! bravad_is( 'team', false ) ) {
				return;
			}

			add_action( 'init', array( $this, 'register_post_types' ), 5 );
			add_action( 'init', array( $this, 'register_taxonomies' ), 5 );

			add_action( 'admin_head', array( $this, 'columns_style' ) );
			add_filter( 'manage_team_posts_columns', array( $this, 'columns' ) );
			add_action( 'manage_team_posts_custom_column', array( $this, 'columns_content' ), 10, 2 );
		}

		/**
		 * Register post types
		 */
		public function register_post_types() {
			if ( ! post_type_exists( 'team' ) ) {
				register_post_type( 'team',
					array(
						'labels'              => array(
							'add_new'            => __( 'Ajouter un membre', 'bravad' ),
							'add_new_item'       => __( 'Ajouter un nouveau membre', 'bravad' ),
							'all_items'          => __( 'Tous les membres', 'bravad' ),
							'edit_item'          => __( 'Modifier le membre', 'bravad' ),
							'menu_name'          => _x( 'Équipe', 'Post type name in menu', 'bravad' ),
							'name'               => _x( 'Équipe', 'Post type name', 'bravad' ),
							'name_admin_bar'     => _x( 'Équipe', 'Post type name on top bar', 'bravad' ),
							'new_item'           => __( 'Nouveau membre', 'bravad' ),
							'not_found'          => __( 'Aucun membre trouvé', 'bravad' ),
							'not_found_in_trash' => __( 'Aucun membre trouvé dans la corbeille', 'bravad' ),
							'parent_item_colon'  => __( 'Membre parent', 'bravad' ),
							'search_items'       => __( 'Rechercher un membre', 'bravad' ),
							'singular_name'      => _x( 'Équipe', 'Singular post type name', 'bravad' ),
							'view_item'          => __( 'Voir le membre', 'bravad' ),
						),
						'capability_type'     => 'post',
						'exclude_from_search' => true,
						'has_archive'         => true,
						'hierarchical'        => false,
						'menu_icon'           => 'dashicons-nametag',
						'menu_position'       => 100,
						'public'              => true,
						'publicly_queryable'  => true,
						'query_var'           => true,
						'rewrite'             => array( 'slug' => 'equipe', 'with_front' => true ),
						'show_in_admin_bar'   => true,
						'show_in_menu'        => true,
						'show_in_nav_menus'   => false,
						'show_ui'             => true,
						'supports'            => array( 'title', 'thumbnail' ),
					)
				);
			}
		}

		/**
		 * Register taxonomies
		 */
		public function register_taxonomies() {
			if ( ! taxonomy_exists( 'team_cat' ) ) {
				register_taxonomy( 'team_cat', 
					array( 
						'team',
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
		 * Add columns
		 */
		public function columns( $columns ) {
		    $custom_cols = [];

		    foreach ( $columns as $key => $title ) {
		        if ( $key == 'title' ) {
		            $custom_cols['thumb'] = '<span class="dashicons dashicons-format-image"></span>';
		        }

		        $custom_cols[ $key ] = $title;
		    }
		    
		    return $custom_cols;
		}
		
		/**
		 * Columns content
		 */
		public function columns_content( $column_name, $post_id ) {
		    if ( $column_name == 'thumb' ) {
		    	$img = get_post_thumbnail_id( $post_id );
		    	
		    	if ( ! empty( $img ) ) {
		    		echo '<img src="' . bravad_img( $img, 'thumbnail' )['url'] . '" alt="" width="40" height="40" />';
		    	}
		    }
		}

		/**
		 * Columns style
		 */
		public function columns_style() {
			if ( 'team' == get_post_type() ) :
		    ?>

		    <style type="text/css">
		    	.column-thumb { 
		    		text-align: center !important; 
		    		width: 52px; 
		    	}
		    	.column-thumb .dashicons {
		    		font-size: 16px;
		    	}
		    </style>

		    <?php
		    endif;
		}

	}

endif;

return new Bravad_Team();
