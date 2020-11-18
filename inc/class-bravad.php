<?php
/**
 * Bravad Class
 *
 * @package Sushikiriz
 * @version 2.0.3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad' ) ) :

	/**
	 * The main bravad class
	 */
	class Bravad {

		/**
		 * Setup class
		 */
		public function __construct() {
			add_action( 'after_setup_theme', array( $this, 'setup' ), 10 );
			add_action( 'wp_enqueue_scripts', array( $this, 'scripts_styles' ), 10 );
			add_action( 'admin_enqueue_scripts', array( $this, 'scripts_styles_admin' ) );
			add_action( 'widgets_init', array( $this, 'widgets_init' ) );

			add_filter( 'body_class', array( $this, 'body_classes' ) );

			add_action( 'admin_head', array( $this, 'favicon_admin' ) );
			add_action( 'login_enqueue_scripts', array( $this, 'login_logo' ) );
			add_filter( 'login_headerurl', array( $this, 'login_url' ) );
			add_filter( 'login_headertext', array( $this, 'login_title' ) );
			add_filter( 'admin_footer_text', array( $this, 'footer_text' ) );

			add_action( 'acf/init', array( $this, 'google_api_key' ) );
			add_filter( 'upload_mimes', array( $this, 'add_file_types' ) );

			add_action( 'template_include', array( $this, 'maintenance' ), 99 );
			add_action( 'template_include', array( $this, 'icons' ), 99 );

			add_action( 'admin_bar_menu', array( $this, 'icons_link' ), 999 );
			// add_action( 'wp_print_scripts', array( $this, 'get_enqueued_scripts' ) );
		}

		/**
		 * Sets up theme defaults and registers support for various WordPress features
		 */
		public function setup() {
			/*
			 * Disable Gutenburg
			 */
			add_filter( 'use_block_editor_for_post', '__return_false' );

			/*
			 * Disable REST API link tag
			 */
			remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );

			/*
			 * Disable oEmbed Discovery Links
			 */
			remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );

			/*
			 * Disable REST API link in HTTP headers
			 */
			remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );

			/*
			 * Load theme text
			 */
			load_theme_textdomain( 'bravad', esc_url( get_template_directory() . '/languages' ) );

			/**
			 * Add default posts and comments RSS feed links to head
			 */
			add_theme_support( 'automatic-feed-links' );

			/*
			 * Enable support for Post Thumbnails on posts and pages
			 */
			add_theme_support( 'post-thumbnails' );

			/*
			 * This theme uses wp_nav_menu() in two locations
			 */ 
			register_nav_menus( array(
				'primary'   => __( 'Menu principal', 'bravad' ),
				'secondary' => __( 'Menu secondaire', 'bravad' )
			) );

			if ( bravad_is( 'footer', false ) ) {
				register_nav_menus( array(
					'footer' => __( 'Menu bas de page', 'bravad' )
				) );
			}

			/*
			 * Switch default core markup for search form, comment form, comments, galleries, captions and widgets 
			 * to output valid HTML5
			 */
			add_theme_support( 'html5', array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'widgets',
			) );

			/* 
			 * Enable support for Post Formats
			 */
			add_theme_support( 'post-formats', array(
				'aside', 
				'image', 
				'video', 
				'quote', 
				'link', 
				'gallery', 
				'status', 
				'audio', 
				'chat',
			) );

			/* 
			 * Image size
			 */
			remove_image_size( 'medium_large' );
        	remove_image_size( '1536x1536' );
        	remove_image_size( '2048x2048' );
			// update_option( 'thumbnail_size_w', 150 );
			// update_option( 'thumbnail_size_h', 150 );
			// update_option( 'medium_size_w', 300 );
			// update_option( 'medium_size_h', 300 );
			// update_option( 'medium_large_size_w', 0 );
			// update_option( 'medium_large_size_h', 0 );
			// update_option( 'large_size_w', 1024 );
			// update_option( 'large_size_h', 1024 );

			/*
			 * Declare support for title theme feature
			 */
			add_theme_support( 'title-tag' );

			/* 
			 * Declare support for selective refreshing of widgets
			 */
			add_theme_support( 'customize-selective-refresh-widgets' );

			/*
			 * Remove admin bar
			 */
			add_filter( 'show_admin_bar', '__return_false' );

			/*
			 * Enabled shortcode in text widget
			 */
			add_filter( 'widget_text', 'do_shortcode' );

			/**
			 * Add theme support for selective refresh for widgets
			 */
			add_theme_support( 'customize-selective-refresh-widgets' );
			
			/*
			 * Remove crap from head
			 */ 
			remove_action( 'wp_head', 'rsd_link' );
			remove_action( 'wp_head', 'wp_generator' );
			remove_action( 'wp_head', 'feed_links', 2 );
			remove_action( 'wp_head', 'index_rel_link' );
			remove_action( 'wp_head', 'wlwmanifest_link' );
			remove_action( 'wp_head', 'feed_links_extra', 3 );
			remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
			remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
			remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 );
			remove_action( 'wp_head', 'rel_canonical' );

			/*
			 * WPML
			 */
			// if ( bravad_is_wpml_activated() ) {
			// 	define( 'ICL_DONT_LOAD_NAVIGATION_CSS', true );
			// 	define( 'ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true );
			// 	define( 'ICL_DONT_LOAD_LANGUAGES_JS', true );
			// }

			/*
			 * ACF Options page
			 */
			if ( function_exists( 'acf_add_options_page' ) ) {
				acf_add_options_page( array(
					'icon_url'   => 'dashicons-screenoptions',
					'menu_title' => __( 'Blocs', 'bravad' ),
					'page_title' => __( 'Blocs réutilisables', 'bravad' ),
					'redirect'   => true,
					'menu_slug'  => 'reusable_blocks'
				));

				acf_add_options_sub_page( array(
					'menu_title'  => __( 'Options du site', 'bravad' ),
					'page_title'  => __( 'Options du site', 'bravad' ),
					'parent_slug' => 'tools.php',
					'menu_slug'   => 'site_options'
				));

				if ( current_user_can( 'manage_options' ) ) {
					acf_add_options_sub_page( array(
						'menu_title'  => __( 'Réglages du site', 'bravad' ),
						'page_title'  => __( 'Réglages du site', 'bravad' ),
						'parent_slug' => 'options-general.php',
						'menu_slug'   => 'site_settings'
					));
				}
			}
		}

		/**
		 * Enqueue scripts and styles
		 */
		public function scripts_styles() {
			global $bravad_version;

			$google_key     = bravad_option( 'google-maps' );
			$google_version = '3.41';

			/**
			 * Styles
			 */
			wp_enqueue_style( 'theme', get_template_directory_uri() . '/style.css', array(), $bravad_version );
			wp_enqueue_style( 'swiper', 'https://unpkg.com/swiper/swiper-bundle' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.css', array(), '6.3.2' );
			wp_enqueue_style( 'fancybox', 'https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.css', array(), '3.5.7' );
			wp_enqueue_style( 'bravad', get_template_directory_uri() . '/assets/css/style' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.css', array(), $bravad_version );

			/**
			 * Fonts
			 */
			$font = bravad_option( 'font' );
			$font = ! empty( $font ) ? str_replace( ' ', '+', $font ) : 'Inter:wght@100;300;600';

			$font_name = explode( ':', $font )[0];
			$font_name = str_replace( '+', ' ', $font_name );

			$query_args = array(
				'family'  => $font,
				'display' => 'swap'
			);

			$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css2' );

			wp_enqueue_style( 'bravad-fonts', esc_url( $fonts_url ), array(), null );
			wp_add_inline_style( 'bravad-fonts', "body { font-family: '" . $font_name . "', sans-serif; }" );
			
			/**
			 * Scripts
			 */
			wp_enqueue_script( 'modernizr', get_theme_file_uri( '/assets/js/modernizr.js' ), array( 'jquery' ), '3.6.0', false );
			wp_enqueue_script( 'bravad-google-maps', 'https://maps.googleapis.com/maps/api/js?v=' . $google_version . '&libraries=geometry,places&key=' . $google_key, array( 'jquery' ), $google_version, true );
			wp_enqueue_script( 'imagesloaded', 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.js', array( 'jquery' ), '4.1.4', true );
			wp_enqueue_script( 'swiper', 'https://unpkg.com/swiper/swiper-bundle' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.js', array( 'jquery' ), '6.3.2', true );
			wp_enqueue_script( 'fancybox', 'https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.js', array( 'jquery' ), '3.5.7', true );
			wp_enqueue_script( 'bravad', get_theme_file_uri( '/assets/js/scripts' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.js' ), array( 'jquery' ), $bravad_version, true );

			/**
			 * Php vars
			 */
			$vars = array(
				'ajax_url'     => admin_url( 'admin-ajax.php' ),
				'lang_code'	   => bravad_language_code(),
				'post_id'      => get_the_ID(),
				'site_title'   => get_bloginfo( 'name' ),
				'site_url'     => home_url(),
				'template_url' => get_template_directory_uri(),
			);

			wp_localize_script( 'bravad', 'bravad', $vars );
		}

		/**
		 * Enqueue scripts and styles on the admin
		 */
		public function scripts_styles_admin() {
			global $bravad_version;

			/**
			 * Styles
			 */
			wp_enqueue_style( 'bravad-style-admin', get_template_directory_uri() . '/assets/css/admin' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.css', array(), $bravad_version );

			/**
			 * Scripts
			 */
			wp_enqueue_script( 'bravad-scripts-admin', get_template_directory_uri() . '/assets/js/admin' . ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' ) . '.js', array(), $bravad_version, true );
			
			/**
			 * Php vars
			 */
			$vars = array(
				'ajax_url'     => admin_url( 'admin-ajax.php' ),
				'lang_code'	   => bravad_language_code(),
				'post_id'      => get_the_ID(),
				'site_title'   => get_bloginfo( 'name' ),
				'site_url'     => home_url(),
				'template_url' => get_template_directory_uri(),
			);

			wp_localize_script( 'bravad-scripts-admin', 'bravad', $vars );
		}

		/**
		 * Register widget area
		 */
		public function widgets_init() {
			if ( bravad_is( 'post', false ) ) {
				register_sidebar( array(
					'name'          => __( 'Blogue', 'bravad' ),
					'id'            => 'sidebar-post',
					'description'   => '',
					'before_widget' => '<aside id="%1$s" class="widget %2$s">',
					'after_widget'  => '</aside>',
					'before_title'  => '<h3 class="widget-title h6">',
					'after_title'   => '</h3>',
				) );
			}

			if ( bravad_is_woocommerce_activated() ) {
				register_sidebar( array(
					'name'          => __( 'Boutique', 'bravad' ),
					'id'            => 'sidebar-shop',
					'description'   => '',
					'before_widget' => '<aside id="%1$s" class="widget %2$s">',
					'after_widget'  => '</aside>',
					'before_title'  => '<h3 class="widget-title h6">',
					'after_title'   => '</h3>',
				) );
			}

			if ( bravad_is( 'footer', false ) ) {
				register_sidebar( array(
					'name'          => __( 'Bas de page', 'bravad' ),
					'id'            => 'sidebar-footer',
					'description'   => '',
					'before_widget' => '<aside id="%1$s" class="col %2$s">',
					'after_widget'  => '</aside>',
					'before_title'  => '<h3 class="widget-title h6">',
					'after_title'   => '</h3>',
				) );
			}
		}

		/**
		 * Add custom classes to the array of body classes
		 */
		public function body_classes( $classes ) {
			$banner   = bravad_option( 'banner', false );
			$parallax = bravad_option( 'parallax', false );

			if ( $banner && is_front_page() ) {
				$classes[] = 'has-banner';
			}

			if ( $parallax ) {
				$classes[] = 'has-parallax';
			}

			if ( bravad_is_woocommerce_activated() ) {
				$classes[] = 'has-woocommerce';
			}

			if ( has_nav_menu( 'secondary' ) || bravad_has_social() ) {
				$classes[] = 'has-secondary-nav';
			}

			if ( bravad_is( 'search', false ) ) {
				$classes[] = 'has-search';
			}

			return $classes;
		}

		/**
		 * Add favicon to admin
		 */
		public function favicon_admin() {
			echo sprintf( '<link rel="shortcut icon" href="%s" />',
				esc_url( get_template_directory_uri() . '/assets/img/bravad.ico' )
			);
		}

		/**
		 * Change WP logo on the admin
		 */
		public function login_logo() {
			$logo = bravad_option( 'logo-alt' );

			if ( isset( $logo ) ) {
				?>
			    <style type="text/css">
			        .login h1 a {
			            background-image: url('<?php echo esc_url( bravad_img( $logo )['url'] ); ?>') !important;
			            background-size: auto 100% !important;
			            padding-bottom: 0 !important;
			            width: 320px !important;
			            height: 120px !important;
			        }
			    </style>
				<?php
			}
		}

		/**
		 * Change WP link on the admin
		 */
		public function login_url() {
		    return esc_url( home_url( '/' ) );
		}

		/**
		 * Change WP title on the admin
		 */
		public function login_title() {
		    return esc_html( get_bloginfo( 'name' ) );
		}

		/**
		 * Change footer text on the admin
		 */
		public static function footer_text() {
			global $bravad_theme, $bravad_version;

			echo sprintf( '<span id="footer-thankyou">%s %s | %s <a href="%s" target="_blank">Bravad</a> | %s <a href="%s" target="_blank">WordPress</a></span>',
				$bravad_theme,
				$bravad_version,
				__( 'Développé par', 'bravad' ),
				'http://bravad.ca',
				__( 'Propulsé par', 'bravad' ),
				'http://www.wordpress.org'
			);
		}

		/**
		 * ACF Google map
		 */
		public function google_api_key() {
			if ( bravad_is( 'google-maps', false ) ) {
				acf_update_setting( 'google_api_key', bravad_option( 'google-maps', false ) );
			}
		}

		/**
		 * Add file types to uploads
		 */
		public function add_file_types( $types ) {
			if ( current_user_can( 'manage_options' ) ) {
				$arr        = array();
				$arr['svg'] = 'image/svg+xml';
				
				$types = array_merge( $types, $arr );
			}

			return $types;
		}

		/**
		 * Maintenance mode
		 */
		public function maintenance( $template ) {
			if ( ! current_user_can( 'manage_options' ) && bravad_is( 'maintenance', false ) ) {
				$maintenance = locate_template( array( '/templates/maintenance.php' ) );

				if ( ! empty( $maintenance ) ) {
					return $maintenance;

				} else {
					return $template;
				}
				
			} else {
				return $template;
			}
		}

		/**
		 * Icons template
		 */
		public function icons( $template ) {
			if ( is_user_logged_in() && isset( $_GET['bravad'] ) && $_GET['bravad'] == 'icons' ) {
				$icons = locate_template( array( '/templates/icons.php' ) );

				if ( ! empty( $icons ) ) {
					return $icons;

				} else {
					return $template;
				}
				
			} else {
				return $template;
			}
		}

		/**
		 * Icons link
		 */
		public function icons_link( $wp_admin_bar ) {
			$links = array(
				array(
					'id'     => 'bravad-icons',
					'title'  => __( 'Icônes', 'bravad' ),
					'href'   => esc_url( home_url( '/' ) ) . '?bravad=icons',
					'parent' => false,
					'meta'   => array( 
						'title'  => __( 'Voir les différentes icônes disponibles', 'bravad' ),
						'target' => '_blank'
					)
				)
			);

			if ( isset( $links ) ) {
				foreach ( $links as $link ) {
					$wp_admin_bar->add_node( $link );
				}	
			}
		}

		/**
		 * Get enqueued scripts name
		 */
		public function get_enqueued_scripts() {
			if ( is_admin() ) {
				return;
			}

		    global $wp_scripts;

		    bravad_dump( $wp_scripts->queue, true );
		    exit;
		}

	}
	
endif;

return new Bravad();
