<?php
/**
 * Bravad Remove Class
 *
 * @package Sushikiriz
 * @version 2.1.5
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_Remove' ) ) :

	/**
	 * Bravad_Remove class
	 */
	class Bravad_Remove {

		public function __construct() {
			add_action( 'admin_menu', array( $this, 'menu_items' ), 999 );
			add_action( 'wp_before_admin_bar_render', array( $this, 'admin_bar_items' ) );
			add_action( 'wp_dashboard_setup', array( $this, 'dashboard_widgets' ) );
			add_action( 'widgets_init', array( $this, 'widgets' ), 99 );
			add_action( 'admin_head', array( $this, 'metaboxes' ), 99 );

			add_filter( 'manage_edit-post_columns', array( $this, 'post_columns' ) );
			add_filter( 'manage_edit-page_columns', array( $this, 'page_columns' ) );

			add_filter( 'wpseo_metabox_prio', function() { return 'low'; } );

			add_filter( 'wp_default_scripts', array( $this, 'remove_jquery_migrate' ) );
		}

		/**
		 * Menu items
		 */
		public function menu_items() {
			global $submenu;

			/**
			 * Dashboard
			 */
			// remove_menu_page( 'index.php' );
			// 	unset( $submenu['index.php'][0] ); //  = Home
			// 	unset( $submenu['index.php'][10] ); // = Update

			/**
			 * Posts
			 */
			if ( ! bravad_is( 'post', false ) ) {
				remove_menu_page( 'edit.php' );
					unset( $submenu['edit.php'][5] ); //  = All posts 
					unset( $submenu['edit.php'][10] ); // = Add new 
					unset( $submenu['edit.php'][15] ); // = Categories 
					unset( $submenu['edit.php'][16] ); // = Tags
			}

			/**
			 * Media
			 */
			// remove_menu_page( 'upload.php' );
			// 	unset( $submenu['upload.php'][5] ); //  = Library 
			// 	unset( $submenu['upload.php'][10] ); // = Add new 
			
			/**
			 * Pages
			 */
			// remove_menu_page( 'edit.php?post_type=page' );
			// 	unset( $submenu['edit.php?post_type=page'][5] ); //  = All 
			// 	unset( $submenu['edit.php?post_type=page'][10] ); // = Add new
			
			/**
			 * Comments
			 */
			if ( ! bravad_is( array( 'post', 'comments' ), false ) ) {
				remove_menu_page( 'edit-comments.php' );
			}

			/**
			 * Appearance
			 */
			// remove_menu_page( 'themes.php' );
				// unset( $submenu['themes.php'][5] ); //  = Themes
				unset( $submenu['themes.php'][6] ); //     = Customize
				// unset( $submenu['themes.php'][7] ); //  = Widgets
				// unset( $submenu['themes.php'][10] ); // = Menu
				unset( $submenu['themes.php'][11] ); //    = Editor

			/**
			 * Plugins
			 */
			// remove_menu_page( 'plugins.php' );
			// 	unset( $submenu['plugins.php'][5] ); //  = Installed plugins
			// 	unset( $submenu['plugins.php'][10] ); // = Add new
				unset( $submenu['plugins.php'][15] ); // = Editor

			/**
			 * Users
			 */
			// remove_menu_page( 'users.php' );
			// 	unset( $submenu['users.php'][5] ); //  = All users
			// 	unset( $submenu['users.php'][10] ); // = Add new
			// 	unset( $submenu['users.php'][15] ); // = Your profile

			/**
			 * Tools
			 */
			// remove_menu_page( 'tools.php' );
			if ( ! current_user_can( 'manage_options' ) ) {
				unset( $submenu['tools.php'][5] ); //  = Available tools
			}
			//	unset( $submenu['tools.php'][10] ); // = Import
			//	unset( $submenu['tools.php'][15] ); // = Export

			/**
			 * Settings
			 */
			// remove_menu_page( 'options-general.php' );
			// 	unset( $submenu['options-general.php'][10] ); // = General
			// 	unset( $submenu['options-general.php'][15] ); // = Writing
			// 	unset( $submenu['options-general.php'][20] ); // = Reading
			// 	unset( $submenu['options-general.php'][25] ); // = Discussion
			// 	unset( $submenu['options-general.php'][30] ); // = Media
			// 	unset( $submenu['options-general.php'][40] ); // = Permalinks
			// 	unset( $submenu['options-general.php'][45] ); // = Privacy

			/**
			 * SEO Yoast
			 */
			// remove_menu_page( 'wpseo_dashboard' );
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_dashboard' ); //      = Dashboard
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_titles' ); //         = Title & metas
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_social' ); //         = Social
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_xml' ); //            = XML Sitemaps
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_advanced' ); //       = Advanced
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_tools' ); //          = Tools
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_search_console' ); // = Search console
			// 	remove_submenu_page( 'wpseo_dashboard', 'wpseo_licenses' ); //       = Licenses
				
			/**
			 * WPML
			 */
			// remove_menu_page( 'sitepress-multilingual-cms/menu/languages.php' );
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][0] ); // = Languages
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][1] ); // = Translation management
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][2] ); // = Theme and plugins localization
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][3] ); // = Support
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][4] ); // = Media translation
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][5] ); // = Translations
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][6] ); // = Packages
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][7] ); // = P Menus sync
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][8] ); // = String translation
			// 	unset( $submenu['sitepress-multilingual-cms/menu/languages.php'][9] ); // = Taxonomy translation

			/**
			 * Wordfence
			 */
			// remove_menu_page( 'Wordfence' );
		}

		/**
		 * Admin bar items
		 */
		public function admin_bar_items() {
		    global $wp_admin_bar;

		    /**
		     * Wordpress logo
		     */
		    $wp_admin_bar->remove_menu( 'wp-logo' );
				$wp_admin_bar->remove_menu( 'about' ); //          = About WordPress
				$wp_admin_bar->remove_menu( 'wporg' ); //          = WordPress.org
				$wp_admin_bar->remove_menu( 'documentation' ); //  = Documentation
				$wp_admin_bar->remove_menu( 'support-forums' ); // = Support
				$wp_admin_bar->remove_menu( 'feedback' ); //       = Feedback

		    /**
		     * Site name
		     */
			// $wp_admin_bar->remove_menu( 'site-name' );
				// $wp_admin_bar->remove_menu( 'view-site' ); //   = Visit site
				// $wp_admin_bar->remove_menu( 'view-store' ); //  = Visit store
				// $wp_admin_bar->remove_menu( 'updates' ); //     = Updates
				$wp_admin_bar->remove_menu( 'new-content' ); //    = Content
				// $wp_admin_bar->remove_menu( 'wpseo-menu' ); //  = SEO Yoast
				// $wp_admin_bar->remove_menu( 'WPML_ALS' ); //    = WPML
				
				if ( ! bravad_is( array( 'post', 'comments' ), false ) ) {
					$wp_admin_bar->remove_menu( 'comments' ); //       = Comments
				}

		    /**
		     * User
		     */
		    // $wp_admin_bar->remove_menu( 'my-account' );
				// $wp_admin_bar->remove_node( 'user-info' ); //    = User info
				// $wp_admin_bar->remove_node( 'edit-profile' ); // = User profile
		}

		/**
		 * Dashboard widgets
		 */
		public function dashboard_widgets() {
			global $wp_meta_boxes;
			
			// unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now'] ); // = At a glance
			// unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity'] ); //  = Activity
			// unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press'] ); // = Quick draft
			unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_primary'] ); //        = Wordpress blog
			unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health'] ); //  = Wordpress news

			// remove_meta_box( 'wpseo-dashboard-overview', 'dashboard', 'normal' ); // = SEO Yoast

			// remove_meta_box( 'wordfence_activity_report_widget', 'dashboard', 'normal' ); // = Wordfence
		}

		/**
		 * Widgets
		 */
		public function widgets() {
			// unregister_widget( 'WP_Nav_Menu_Widget' ); //        = Menus
			// unregister_widget( 'WP_Widget_Archives' ); //        = Archives
			// unregister_widget( 'WP_Widget_Calendar' ); //        = Calendar
			// unregister_widget( 'WP_Widget_Categories' ); //      = Categories
			// unregister_widget( 'WP_Widget_Links' ); //           = Links
			// unregister_widget( 'WP_Widget_Media_Audio' ); //     = Audio
			// unregister_widget( 'WP_Widget_Media_Image' ); //     = Image
			// unregister_widget( 'WP_Widget_Media_Video' ); //     = Video
			// unregister_widget( 'WP_Widget_Meta' ); //            = Meta
			// unregister_widget( 'WP_Widget_Pages' ); //           = Pages
			// unregister_widget( 'WP_Widget_Recent_Comments' ); // = Recent Comments
			// unregister_widget( 'WP_Widget_Recent_Posts' ); //    = Recent Posts
			// unregister_widget( 'WP_Widget_RSS' ); //             = RSS
			// unregister_widget( 'WP_Widget_Search' ); //          = Search
			// unregister_widget( 'WP_Widget_Tag_Cloud' ); //       = Tag Cloud
			// unregister_widget( 'WP_Widget_Text' ); //            = Text

			// unregister_widget( 'WPML_LS_Widget' );
			// unregister_widget( 'WP_Widget_Text_Icl' );
		}

		/**
		 * Metaboxes
		 */
		public function metaboxes() {
			/**
			 * Post
			 */
			remove_post_type_support( 'post', 'editor' ); // = Content editor

			// remove_meta_box( 'authordiv', 'post', 'normal' ); //        = Author
			// remove_meta_box( 'categorydiv', 'post', 'side' ); //        = Categories
			// remove_meta_box( 'commentsdiv', 'post', 'normal' ); //      = Comments
			// remove_meta_box( 'commentstatusdiv', 'post', 'normal' ); // = Discussion
			remove_meta_box( 'formatdiv', 'post', 'side' ); //             = Format
			remove_meta_box( 'postcustom', 'post', 'normal' ); //          = Custom fields
			// remove_meta_box( 'postexcerpt', 'post', 'normal' ); //      = Excerpt
			// remove_meta_box( 'postimagediv', 'post', 'side' ); //       = Featured image
			// remove_meta_box( 'slugdiv', 'post', 'normal' ); //          = Slug
			// remove_meta_box( 'submitdiv', 'post', 'side' ); //          = Publish
			remove_meta_box( 'tagsdiv-post_tag', 'post', 'side' ); //      = Tags
			remove_meta_box( 'trackbacksdiv', 'post', 'normal' ); //       = Trackback
			
			// remove_meta_box( 'icl_div', 'post', 'side' ); //          = Language
			// remove_meta_box( 'icl_div_config', 'post', 'normal' ); // = Multilingual content setup
			
			// remove_meta_box( 'wpseo_meta', 'post', 'normal' ); // SEO Yoast

			/**
			 * Page
			 */
			remove_post_type_support( 'page', 'editor' );  // = Content editor

			remove_meta_box( 'authordiv', 'page', 'normal' ); //           = Author
			remove_meta_box( 'commentsdiv', 'page', 'normal' ); //      = Comments
			remove_meta_box( 'commentstatusdiv', 'page', 'normal' ); // = Discussion
			// remove_meta_box( 'pageparentdiv', 'page', 'normal' ); //    = Parent
			// remove_meta_box( 'pageparentdiv', 'page', 'side' ); //      = Page attributes
			remove_meta_box( 'postcustom', 'page', 'normal' ); //          = Custom
			remove_meta_box( 'postimagediv', 'page', 'side' );   //        = Featured image
			remove_meta_box( 'revisionsdiv', 'page', 'normal' ); //        = Revision
			remove_meta_box( 'slugdiv', 'page', 'normal' ); //          = Slug
			// remove_meta_box( 'submitdiv', 'page', 'side' ); //          = Publish
			remove_meta_box( 'trackbacksdiv', 'page', 'normal' ); //       = Trackback

			// remove_meta_box( 'icl_div', 'page', 'side' ); //          = Language
			// remove_meta_box( 'icl_div_config', 'page', 'normal' ); // = Multilingual content setup

			// remove_meta_box( 'wpseo_meta', 'page', 'normal' ); // = SEO Yoast
			
			/**
			 * Portfolio
			 */
			remove_post_type_support( 'portfolio', 'editor' );  // = Content editor
			
			/**
			 * Product
			 */
			remove_post_type_support( 'product', 'editor' );  // = Content editor
		}

		/**
		 * Post columns
		 */
		public function post_columns( $columns ) {
			// unset( $columns['author'] );  //    = Author
			// unset( $columns['categories'] ); // = Categories
			// unset( $columns['cb'] );  //        = Checkbox
			// unset( $columns['comments'] );  //  = Comments
			// unset( $columns['date'] ); //       = Date
			// unset( $columns['tags'] ); //          = Tags
			// unset( $columns['title'] );  //     = Title
			
			unset( $columns['wpseo-focuskw'] ); //           = Focus KW
			unset( $columns['wpseo-linked'] ); //            = SEO linked
			unset( $columns['wpseo-links'] ); //             = SEO links
			unset( $columns['wpseo-metadesc'] ); //          = Meta description
			unset( $columns['wpseo-score'] ); //             = SEO
			unset( $columns['wpseo-score-readability'] ); // = SEO readability
			unset( $columns['wpseo-title'] ); //             = SEO title
			
			unset( $columns['icl_translations'] ); // = WPML

			return $columns;
		}

		/**
		 * Page columns
		 */
		public function page_columns( $columns ) {
			unset( $columns['author'] ); //   = Author
			// unset( $columns['cb'] ); //    = Checkbox
			unset( $columns['comments'] ); // = Comments
			// unset( $columns['date'] ); //  = Date
			// unset( $columns['title'] ); // = Title
			
			unset( $columns['wpseo-focuskw'] ); //           = Focus KW
			unset( $columns['wpseo-linked'] ); //            = SEO linked
			unset( $columns['wpseo-links'] ); //             = SEO links
			unset( $columns['wpseo-metadesc'] );  //         = Meta description
			unset( $columns['wpseo-score'] ); //             = SEO
			unset( $columns['wpseo-score-readability'] ); // = SEO readability
			unset( $columns['wpseo-title'] ); //             = SEO title
			
			unset( $columns['icl_translations'] ); // = WPML

			return $columns;
		}

		/**
		 * Don't load jQuery migrate on frontend
		 */
		public function remove_jquery_migrate( &$scripts ) {
			// if ( ! is_admin() ) {
				$scripts->remove( 'jquery');
				$scripts->add( 'jquery', false, array( 'jquery-core' ), '1.10.2' );
			// }
		}

	}

endif;

return new Bravad_Remove();
