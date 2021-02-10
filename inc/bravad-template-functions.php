<?php
/**
 * Bravad template functions
 *
 * @package Sushikiriz
 * @version 2.1.6
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'bravad_google_analytics' ) ) {
	/**
	 * Google analytics
	 */
	function bravad_google_analytics() {
		$google = bravad_option( 'google-analytics', false );

		if ( empty( $google ) ) {
			return;
		}

		echo $google;
	}
}

if ( ! function_exists( 'bravad_facebook_pixel' ) ) {
	/**
	 * Facebook pixel
	 */
	function bravad_facebook_pixel() {
		$facebook = bravad_option( 'facebook-pixel', false );

		if ( empty( $facebook ) ) {
			return;
		}

		echo $facebook;
	}
}

if ( ! function_exists( 'bravad_cookies' ) ) {
	/**
	 * Display the cookies disclaimer
	 */
	function bravad_cookies() {
		$display = bravad_option( 'cookies' );

		if ( ! $display ) {
			return;
		}

		$cookie  = bravad_option( 'cookies-text' );
		$post_id = get_option( 'wp_page_for_privacy_policy' );

		$output = '<div class="site-cookies js-cookies"><div class="container">';
		
		$output .= sprintf( '<p>%s &nbsp;<a href="%s">%s</a></p><a href="#" class="btn btn-primary btn-inverse">%s</a>',
			$cookie,
			get_permalink( $post_id ),
			get_the_title( $post_id ),
			__( 'Accepter', 'bravad' )
		);
		
		$output .= '</div></div>';

		echo $output;
	}
}

if ( ! function_exists( 'bravad_icon' ) ) {
	/**
	 * Display svg icon
	 * 
	 * @param string $icon icon name
	 * @param string $size icon size
	 */
	function bravad_icon( $icon, $size = '' ) {
		$output = sprintf( '<svg class="icon%s"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="%s"></use></svg>',
			! empty( $size ) ? ' icon-' . $size : '',
			get_template_directory_uri() . '/assets/img/icons.svg#' . esc_attr( $icon )
		);

		return $output;
	}
}

if ( ! function_exists( 'bravad_excerpt' ) ) {
	/**
	 * Custom excerpt
	 * 
	 * @param string $excerpt the excerpt
	 * @param int 	 $limit excerpt length
	 */
	function bravad_excerpt( $excerpt, $limit ) {
	    return wp_trim_words( strip_tags( $excerpt ), $limit );
	}
}

if ( ! function_exists( 'bravad_menu' ) ) {
	/**
	 * Display navigation menu
	 * 
	 * @param string $menu menu name
	 * @param int    $depth menu depth
	 */
	function bravad_menu( $menu, $depth = 1 ) {
		if ( ! has_nav_menu( $menu ) ) {
			return;
		}

		$nav = array(
		    'theme_location'  => $menu,
		    'depth'           => $depth,
		    'container'       => false,
		    'container_class' => '',
		    'menu_class'      => '',
		    'items_wrap'      => '%3$s'
		);

		wp_nav_menu( $nav );
	}
}

if ( ! function_exists( 'bravad_img' ) ) {
	/**
	 * Get image
	 * 
	 * @param int 	 $img_id image ID
	 * @param string $size image size
	 */
	function bravad_img( $img_id, $size = 'full' ) {
		if ( empty( $img_id ) ) {
			return;
		}

		$img = wp_get_attachment_image_src( $img_id, $size );
		$alt = esc_html( get_post_meta( $img_id, '_wp_attachment_image_alt', true ) );

		$output = array(
			'url'         => $img[0],
			'alt'         => $alt,
			'title'       => get_the_title( $img_id ),
			'description' => get_the_content( $img_id )
		);

		return $output; 
	}
}

if ( ! function_exists( 'bravad_page_title' ) ) {
	/**
	 * Get page title
	 */
	function bravad_page_title() {
		$post_id = bravad_id();
		$content = bravad_field( 'hero-content', $post_id );
		$class   = '';

		if ( is_home() && is_front_page() ) {
			$title = get_bloginfo( 'name' );
			$class = ' class="site-title"';
		}

		if ( ! empty( $content['title'] ) ) {
			$title = $content['title'];

		} else {
			if ( is_front_page() ) {
				$title = get_bloginfo( 'name' );
				$class = ' class="site-title"';

			} else {
				$title = get_the_title( $post_id );
			}
		}

		if ( is_search() ) {
			$title = __( 'Recherche', 'bravad' );
		}

		if ( is_404() ) {
			$title = __( 'Page introuvable', 'bravad' );
		}

		if ( bravad_is_woocommerce_activated() && is_woocommerce() ) {
			$title = woocommerce_page_title( false );
		}

		if ( bravad_is_woocommerce_activated() && is_product_category() ) {
			$title = get_the_title( get_option( 'woocommerce_shop_page_id' ) );
		}

		if ( bravad_is_woocommerce_activated() && is_product() ) {
			$title = get_the_title();
		}

		if ( ! empty( $content['logo'] ) ) {
			echo sprintf( '<h1 title="%s"%s><img src="%s" alt="%s" /></h1>', $title, $class, bravad_img( $content['logo'] )['url'], bravad_img( $content['logo'] )['alt'] );

		} else {
			echo sprintf( '<h1%s>%s</h1>', $class, $title );
		}
	}
}

if ( ! function_exists( 'bravad_page_subtitle' ) ) {
	/**
	 * Get page subtitle
	 */
	function bravad_page_subtitle() {
		$post_id  = bravad_id();
		$content  = bravad_field( 'hero-content', $post_id );
		$subtitle = $content['subtitle'];

		if ( is_home() && is_front_page() ) {
			$subtitle = sprintf( '<p class="site-description">%s</p>', get_bloginfo( 'description' ) );
		}

		if ( ! empty( $subtitle ) ) {
			$subtitle = sprintf( '<p>%s</p>', $subtitle );

		} else if ( is_front_page() ) {
			$subtitle = sprintf( '<p class="site-description">%s</p>', get_bloginfo( 'description' ) );
		}

		if ( is_category() ) {
			$subtitle = sprintf( '<p>%s : %s</p>',
				__( 'Catégorie', 'bravad' ),
				single_cat_title( '', false )
			);
		}

		if ( is_archive() ) {
			$subtitle = sprintf( '<p>%s</p>',
				get_the_archive_title()
			);
		}

		if ( is_single() && get_post_type() == 'post' ) {
			$subtitle = bravad_post_meta();
		}

		if ( is_search() ) {
			global $wp_query;

			$count = $wp_query->found_posts;

			if ( $count > 0 ) {
				$result = sprintf( _n( '%s résultat', '%s résultats', $count, 'bravad' ), $count );

			} else {
				$result = __( '0 résultat', 'bravad' );
			}
			
			$subtitle = sprintf( '<p>%s "%s" / %s</p>',
				__( 'Vous avez recherché', 'bravad' ),
				get_search_query(),
				$result
			);
		}

		if ( is_404() ) {
			$subtitle = sprintf( '<p>%s</p>',
				__( "La page que vous avez demandée n'a pas été trouvée", 'bravad' )
			);
		}

		if ( bravad_is_woocommerce_activated() && is_shop() ) {
			$subtitle = '';
		}

		if ( bravad_is_woocommerce_activated() && is_product() ) {
			$product = wc_get_product( get_the_ID() );

			$subtitle = sprintf( '<p>%s</p>',
				wc_get_product_category_list( get_the_ID(), ', ', '<span class="posted_in">', '</span>' )
			);
		}

		echo $subtitle;
	}
}

if ( ! function_exists( 'bravad_page_link' ) ) {
	/**
	 * Get page link
	 */
	function bravad_page_link() {
		$post_id   = bravad_id();
		$color     = bravad_field( 'background', $post_id )['color'];
		$link      = bravad_field( 'hero-content', $post_id )['link'];
		$contact   = bravad_field( '404-contact', 'option' );
		$portfolio = bravad_field( 'portfolio-page', 'option' );

		if ( is_404() ) {
			$color = bravad_option( 'background', false )['color'];
		}

		if ( ! empty( $link ) ) {
			$link = sprintf( '<a href="%s" title="%s" target="%s" class="btn btn-%s">%2$s</a>', 
				$link['url'], 
				$link['title'],
				$link['target'],
				$color == 'primary' ? 'white' : 'primary'
			);
		}

		if ( is_single() && get_post_type() == 'post' ) {
			$link = sprintf( '<a href="%s" title="%s" class="btn btn-%s btn-icon-left">%s %s</a>',
				get_permalink( get_option( 'page_for_posts' ) ),
				get_the_title( get_option( 'page_for_posts' ) ),
				$color == 'primary' ? 'white' : 'primary',
				bravad_icon( 'arrow-left', 'xs' ),
				__( 'Retour au blogue', 'bravad' )
			);
		}

		if ( is_single() && get_post_type() == 'portfolio' && ! empty( $portfolio ) ) {
			$link = sprintf( '<a href="%s" title="%s" class="btn btn-%s btn-icon-left">%s %s</a>',
				get_permalink( $portfolio ),
				get_the_title( $portfolio ),
				$color == 'primary' ? 'white' : 'primary',
				bravad_icon( 'arrow-left', 'xs' ),
				__( 'Retour au portfolio', 'bravad' )
			);
		}

		if ( is_search() ) {
			$link = '';
		}

		if ( is_404() && ! empty( $contact ) ) {
			$link = sprintf( '<a href="%s" title="%s" class="btn btn-%s">%s</a>',
				get_permalink( $contact ),
				get_the_title( $contact ),
				$color == 'primary' ? 'white' : 'primary',
				__( 'Contactez-nous', 'bravad' )
			);
		}

		echo $link;
	}
}

if ( ! function_exists( 'bravad_block_title' ) ) {
	/**
	 * Get block title
	 */
	function bravad_block_title( $type ) {
		$title   = get_sub_field( 'title' );
		$visible = get_sub_field( 'title-visible' );
		$size    = get_sub_field( 'title-size' );
		
		if ( $visible && ! empty( $title ) ) {
			return sprintf( '<h2 class="block-title %s-title %s">%s</h2>', 
				$type,
				$size,
				$title
			);

		} else {
			return false;
		}
	}
}

if ( ! function_exists( 'bravad_hero_options' ) ) {
	/**
	 * Get hero options
	 */
	function bravad_hero_options() {
		$post_id = bravad_id();

		$light = array( 
			'white', 
			'lighter', 
			'light',
			'secondary'
		);

		$background = bravad_field( 'background', $post_id );

		if ( is_404() ) {
			$background = bravad_option( 'background', false );
		}

		if ( ! isset( $background['type'] ) || $background['type'] == 'none' ) {
			$background = bravad_field( 'background', get_option( 'page_on_front' ) );
		}
		
		$content    = bravad_field( 'hero-content', $post_id );
		$fullscreen = bravad_field( 'hero-fullscreen', $post_id );
		$classes    = array();

		if ( $fullscreen ) {
			$classes[] = 'hero-fullscreen';
		}

		if ( $background['type'] !== 'none' && $background['color'] ) {
			$classes[] = 'bg-' . $background['color'];
			$classes[] = in_array( $background['color'], $light ) ? 'text-dark' : 'text-white';
		}

		if ( ! empty( $background['image'] ) ) {
			$classes[] = 'bg-image';
		}

		return sprintf( '%s',
			implode( $classes, ' ' )
		);
	}
}

if ( ! function_exists( 'bravad_block_options' ) ) {
	/**
	 * Get block options
	 */
	function bravad_block_options( $type ) {
		$light = array( 
			'white', 
			'lighter', 
			'light',
			'secondary'
		);

		$background = get_sub_field( 'background' );

		$block_id = get_sub_field( 'block-id' );
		$text     = get_sub_field( 'text-align' );
		$vertical = get_sub_field( 'vertical-align' );
		$padding  = get_sub_field( 'padding' );

		$classes = array(
			'block',
			'block-' . $type,
			'text-' . $text,
			'align-' . $vertical,
			'pad-' . $padding
		);

		if ( $background['type'] !== 'none' && $background['color'] ) {
			$classes[] = 'bg-' . $background['color'];
			$classes[] = in_array( $background['color'], $light ) ? 'text-dark' : 'text-white';
			
		} else {
			$classes[] = 'bg-none';
		}

		if ( ! empty( $background['image'] ) ) {
			$classes[] = 'bg-image';
		}

		return sprintf( '%sclass="%s"',
			! empty( $block_id ) ? 'id="' . sanitize_title( $block_id ) . '" ' : '',
			implode( ' ', $classes )
		);
	}
}

if ( ! function_exists( 'bravad_background' ) ) {
	/**
	 * Get background
	 */
	function bravad_background( $type ) {
		$post_id = bravad_id();

		if ( $type == 'hero' ) {
			$background = bravad_field( 'background', $post_id );

			if ( ! isset( $background['type'] ) || $background['type'] == 'none' ) {
				if ( bravad_is_woocommerce_activated() && is_woocommerce() ) {
					$background = bravad_field( 'background', get_option( 'woocommerce_shop_page_id' ) );

					if ( ! isset( $background['type'] ) || $background['type'] == 'none' ) {
						$background = bravad_field( 'background', get_option( 'page_on_front' ) );
					}
					
				} else {
					$background = bravad_field( 'background', get_option( 'page_on_front' ) );
				}
			}

			if ( is_404() ) {
				$background = bravad_option( 'background', false );
			}

		} else {
			$background = get_sub_field( 'background', $post_id );
		}

		$output  = '<div class="' . $type . '-background">';
		$filters = array();

		if ( $background['grayscale'] !== '0' ) {
			$filters[] = 'grayscale(' . $background['grayscale'] . '%)';
		}

		if ( $background['blur'] !== '0' ) {
			$filters[] = 'blur(' . $background['blur'] . 'px)';
		}

		switch ( $background['type'] ) {
			case 'image' :
				if ( ! empty( $background['image'] ) ) {
					$output = sprintf( '<div class="%s-background js-background %s"><div class="%2$s-image" style="background-image: url(%s);%s%s%s"></div>',
						$type,
						$background['parallax'] ? 'parallax' : 'normal',
						bravad_img( $background['image'] )['url'],
						$background['opacity'] !== '100' ? ' opacity: ' . $background['opacity'] / 100 . ';' : '',
						! empty( $filters ) ? ' filter: ' . implode( ' ', $filters ) . ';' : '',
						$background['blend'] !== 'normal' ? ' mix-blend-mode: ' . $background['blend'] . ';' : ''
					);
				}
				break;

			case 'video' :
				if ( ! empty( $background['video'] ) || ! empty( $background['video-url'] ) ) {
					$output = sprintf( '<div class="%s-background js-background pattern %s"%s><div class="%2$s-image"%s>',
						$type,
						$background['parallax'] ? 'parallax' : 'normal',
						$background['blend'] !== 'normal' ? ' style="mix-blend-mode: ' . $background['blend'] . ';"' : '',
						$background['opacity'] !== '100' ? ' style="opacity: ' . $background['opacity'] / 100 . ';"' : ''
					);
					
					if ( ! empty( $background['video'] ) ) {
						$output .= sprintf( '<video playsinline autoplay muted loop><source src="%s" type="video/mp4"></video></div>',
							$background['video']
						);

					} else if ( ! empty( $background['video-url'] ) ) {
						preg_match( '/src="(.+?)"/', $background['video-url'], $matches );
						$src = $matches[1];

						$params = array(
						    'controls'  => 0,
						    'hd'        => 1,
						    'autohide'  => 1,
						    'loop'		=> 1,
						    'autoplay'  => 1,
						    'preload'   => 'auto',
						    'mute'		=> 1,
						    'muted'		=> 1
						);

						$new_src = add_query_arg( $params, $src );
						$iframe  = str_replace( $src, $new_src, $background['video-url'] );

						$attributes = 'allow="autoplay"';
						$iframe = str_replace( '></iframe>', ' ' . $attributes . '></iframe>', $iframe );

						$output .= sprintf( '<div class="embed-background">%s</div></div>',
							$iframe
						);
					}
				}
				break;

			case 'slideshow' :
				if ( ! empty( $background['slideshow'] ) ) {
					$output = sprintf( '<div class="%s-background js-background %s"%s>',
						$type,
						$background['parallax'] ? 'parallax' : 'normal',
						$background['blend'] !== 'normal' ? ' style="mix-blend-mode: ' . $background['blend'] . ';"' : ''
					);

					$output .= sprintf( '<a href="#" class="swiper-direction swiper-prev js-prev">%s</a>',
						bravad_icon( 'chevron-left' )
					);

					$output .= sprintf( '<a href="#" class="swiper-direction swiper-next js-next">%s</a>',
						bravad_icon( 'chevron-right' )
					);

					$output .= sprintf( '<div class="%s-image">',
						$background['parallax'] ? 'parallax' : 'normal'
					);

					$output .= sprintf( '<div class="swiper-container js-background-swiper"><div class="swiper-wrapper"%s>',
						$background['opacity'] !== '100' ? ' style="opacity: ' . $background['opacity'] / 100 . ';"' : ''
					);

					foreach ( $background['slideshow'] as $img_id ) {
						$output .= sprintf( '<div class="swiper-slide" style="background-image: url(%s);"></div>',
							bravad_img( $img_id )['url']
						);
					}

					$output .= '</div></div></div>';
				}
				break;
		}

		return $output;
	}
}

if ( ! function_exists( 'bravad_shop_nav' ) ) {
	/**
	 * Display shop nav
	 */
	function bravad_shop_nav() {
		if ( ! bravad_is_woocommerce_activated() ) {
			return;
		}

		$output = '<ul class="shop-nav js-shop-nav">';

		$output .= sprintf( '<li class="account-icon"><a href="%s" title="%s">%s</a></li>',
			get_permalink( get_option( 'woocommerce_myaccount_page_id' ) ),
			is_user_logged_in() ? __( 'Mon compte', 'bravad' ) : __( 'Se connecter', 'bravad' ),
			bravad_icon( 'account' )
		);

		$count = WC()->cart->get_cart_contents_count();

		$output .= sprintf( '<li class="cart-icon"><a href="%s" title="%s">%s</a>%s</li>',
			wc_get_cart_url(),
			__( 'Panier', 'bravad' ),
			bravad_icon( 'cart' ),
			$count !== 0 ? '<span class="cart-count">' . $count . '</span>' : ''
		);

		$output .= '</ul>';

		echo $output;
	}
}

if ( ! function_exists( 'bravad_has_social' ) ) {
	/**
	 * Check if has social media
	 */
	function bravad_has_social() {
		$social = bravad_option( 'social-links' );
		$found  = false;

		if ( $social ) {
			foreach ( $social as $link ) {
				if ( ! empty( $link ) ) {
					$found = true;

					break;
				}
			}
		}
		
		return $found;
	}
}

if ( ! function_exists( 'bravad_social' ) ) {
	/**
	 * Display social media icons
	 */
	function bravad_social() {
		$social = bravad_option( 'social-links' );

		$medias = array(
			'Facebook',
			'Instagram',
			'LinkedIn',
			'Pinterest',
			'Twitter',
			'Vimeo',
			'YouTube'
		);

		$icons = '';

		foreach ( $medias as $key ) {
			if ( ! empty( $social[ strtolower( $key ) ] ) ) {
				$icons .= sprintf( '<li><a href="%s" target="_blank" title="%s" class="social-icon">%s</a></li>',
					esc_url( $social[ strtolower( $key ) ] ),
					$key,
					bravad_icon( strtolower( $key ) )
				);
			}
		}

		if ( ! empty( $icons ) ) {
			echo sprintf( '<ul class="social-medias js-social-medias">%s</ul>',
				$icons
			);
		}
	}
}

if ( ! function_exists( 'bravad_multi_col' ) ) {
	/**
	 * Get multi column content
	 */
	function bravad_multi_col( $content ) {
	    $content = apply_filters( 'the_content', $content );
	    $content = str_replace( ']]>', ']]&gt;', $content );
	 
		$columns   = preg_split( '/(<span id="more-\d+"><\/span>)|(<!--more-->)<\/p>/', $content );
		$col_count = count( $columns );
	 
	    if ( $col_count > 1 ) {
	        for ( $i = 0; $i < $col_count; $i++ ) {
	            if ( ! preg_match( '/<\/p>\s?$/', $columns[ $i ] ) ) {
	                $columns[ $i ] .= '</p>';
	            }

	            $columns[ $i ] = preg_replace( '/^\s?<\/p>/', '', $columns[ $i ] );
	            $columns[ $i ] = sprintf( '<div class="col-md%s">%s</div>',
	            	$i == 0 ? ' col-first' : '',
	            	$columns[ $i ]
	            );
	        }

	        $content = join( "\n", $columns );
	    
	    } else {
	        $content = '<div class="col-12">' . wpautop( $content ) . '</div>';
	    }

	    $content = str_replace( '<p></p>', '', $content );

	    return $content;
	}
}

if ( ! function_exists( 'bravad_posts_content' ) ) {
	/**
	 * Display posts content
	 */
	function bravad_posts_content() {
		if ( is_home() || is_category() || is_archive() ) {
			get_template_part( 'templates/parts/archive', 'post' );
		}
	}
}

if ( ! function_exists( 'bravad_post_meta' ) ) {
	/**
	 * Display post meta
	 */
	function bravad_post_meta() {
		if ( get_post_type() !== 'post' ) {
			return;
		}

		global $post;

		$terms = get_the_terms( get_the_ID(), 'category' );
		$list  = array();

		if ( $terms ) {
			foreach ( $terms as $term ) {
				$list[] = sprintf( '<a href="%s" title="%s">%2$s</a>',
					get_term_link( $term->term_id ),
					$term->name
				);
			}
		}

		$tags = get_the_tags( get_the_ID() );
		$tags_list = array();

		if ( $tags ) {
			foreach ( $tags as $tag ) {
				$tags_list[] = sprintf( '<a href="%s" title="%s" class="badge badge-light">%2$s</a>',
					get_term_link( $tag->term_id ),
					$tag->name
				);
			}
		}

		if ( bravad_is( 'comments', false ) ) {
			if ( get_comments_number() ) {
				$comments = sprintf( '<li>' . _n( '%s commentaire', '%s commentaires', get_comments_number(), 'bravad' ) . '</li>', get_comments_number() );
			
			} else {
				$comments = '<li>' . __( '0 commentaire', 'bravad' ) . '</li>';
			}
		}
		
		return sprintf( '<ul class="post-meta"><li>%s</li><li>%s %s</li><li>%s</li>%s</ul>%s',
			implode( ',', $list ),
			__( 'Par', 'bravad' ),
			get_the_author_meta( 'display_name', $post->post_author ),
			get_the_time( 'j F Y' ),
			isset( $comments ) ? $comments : '',
			! empty( $tags_list ) ? '<p class="post-tags">' . implode( ' ', $tags_list ) . '</p>' : ''
		);
	}
}

if ( ! function_exists( 'bravad_layout' ) ) {
		/**
		 * Get layout
		 */
		function bravad_layout( $layout ) {
			$names = array(
				'bloc-reutilisable' => 'reusable-block',
				'caracteristiques'  => 'features',
				'equipe'            => 'team',
				'fichiers'          => 'files',
				'formulaire'        => 'form',
				'galerie'           => 'gallery',
				'onglets'           => 'tabs',
				'publications'      => 'posts',
				'texte'             => 'text',
				'texte-et-image'    => 'text-image'
			);

			$layout = isset( $names[ $layout ] ) ? $names[ $layout ] : $layout;

			return $layout;
		}
}

if ( ! function_exists( 'bravad_blocks_content' ) ) {
	/**
	 * Display blocks content
	 */
	function bravad_blocks_content() {
		$post_id = bravad_id();

		if ( is_home() && is_front_page() ) {
			return;
		}
		
		if ( function_exists( 'get_field' ) && have_rows( 'blocks', $post_id ) ) :
			while ( have_rows( 'blocks', $post_id ) ) : the_row();

				get_template_part( 'templates/blocks/content', bravad_layout( get_row_layout() ) );

			endwhile;
		endif;
	}
}

if ( ! function_exists( 'bravad_site_header' ) ) {
	/**
	 * Get site header
	 */
	function bravad_site_header() {
		get_template_part( 'templates/parts/site', 'header' );
	}
}

if ( ! function_exists( 'bravad_page_hero' ) ) {
	/**
	 * Get page hero
	 */
	function bravad_page_hero() {
		get_template_part( 'templates/parts/page', 'hero' );
	}
}

if ( ! function_exists( 'bravad_post_comments' ) ) {
	/**
	 * Get post comments
	 */
	function bravad_post_comments() {
		if ( is_single() && comments_open( get_the_ID() ) && bravad_is( 'comments' ) ) {
			get_template_part( 'templates/parts/post', 'comments' );
		}
	}
}

if ( ! function_exists( 'bravad_woocommerce_content' ) ) {
	/**
	 * Get woocommerce content
	 */
	function bravad_woocommerce_content() {
		if ( bravad_is_woocommerce_activated() && ( is_woocommerce() || is_cart() || is_account_page() || is_checkout() ) && ! is_product() ) {
			get_template_part( 'templates/parts/page', 'woocommerce' );
		}
	}
}

if ( ! function_exists( 'bravad_page_footer' ) ) {
	/**
	 * Get page footer
	 */
	function bravad_page_footer() {
		get_template_part( 'templates/parts/page', 'footer' );
	}
}

if ( ! function_exists( 'bravad_site_footer' ) ) {
	/**
	 * Get site footer
	 */
	function bravad_site_footer() {
		get_template_part( 'templates/parts/site', 'footer' );
	}
}

if ( ! function_exists( 'bravad_option' ) ) {
	/**
	 * Get option
	 */
	function bravad_option( $option ) {
		add_filter( 'acf/settings/current_language', '__return_false' );

		$field = bravad_field( $option, 'option' );

		remove_filter( 'acf/settings/current_language', '__return_false' );

		return $field;
	}
}
