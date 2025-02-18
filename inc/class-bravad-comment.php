<?php
/**
 * Bravad Comment Class
 *
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Bravad_Comment' ) ) :

	/**
	 * Bravad_Comment class
	 */
	class Bravad_Comment {

		public function __construct() {
			add_action( 'ft_success', array( $this, 'add_comment' ), 10, 2 );
			add_filter( 'ft_value', array( $this, 'value' ), 10, 2 );
		}

		/**
		 * Get comments
		 */
		public static function get_comments() {
			$post_id = get_the_ID();
			$user_id = get_current_user_id();

			$args = array(
				'post_id' => $post_id,
				'orderby' => 'date',
				'order'   => 'asc',
				'parent'  => 0,
				'status'  => 'approve'
			);

			if ( ! empty( $user_id ) ) {
				$args['include_unapproved'] = array( $user_id );
			}

			$loop     = new WP_Comment_Query;
			$comments = $loop->query( $args );

			echo '<div class="comments-list">';
			echo '<div class="row">';

			if ( $comments ) {
			    foreach ( $comments as $item ) {
			    	echo sprintf( '<div class="col-12"><div id="comment-%s" class="comment media%s" data-parent="%2$s" data-name="%s">',
			    		$item->comment_ID,
			    		$item->comment_approved ? '' : ' comment-unapproved',
			    		$item->comment_author
			    	);

			    	echo self::get_comment( $item );

			    	$sub_args = array(
						'post_id' => get_the_ID(),
						'orderby' => 'date',
						'order'   => 'asc',
						'parent'  => $item->comment_ID,
						'status'  => 'approve'
			    	);

			    	if ( ! empty( $user_id ) ) {
			    		$sub_args['include_unapproved'] = array( $user_id );
			    	}

			    	$sub_loop     = new WP_Comment_Query;
			    	$sub_comments = $sub_loop->query( $sub_args );

			    	if ( $sub_comments ) {
			    	    foreach ( $sub_comments as $sub_item ) {
			    	    	echo self::get_comment( $sub_item, true );
			    	    }
			    	}

			    	echo '</div></div></div>';
			    }

			} else {
			    echo sprintf( '<div class="col-12"><p class="no-comment">%s</p></div>',
			    	__( 'Aucun commentaire pour le moment', 'bravad' )
			    );
			}

			echo '</div>';

			echo sprintf( '<div class="comment-reply js-comment-reply" data-reply="%s"><h3 class="h5">%s</h3>%s</div>',
				__( 'Répondre à', 'bravad' ),
				__( 'Laisser un commentaire', 'bravad' ),
				do_shortcode( '[formtastic id="532"]' )
			);

			echo '</div>';
		}

		/**
		 * Get comment
		 */
		public static function get_comment( $comment, $child = false ) {
			$user_id    = $comment->user_id;
			$author     = $comment->comment_author;
			$comment_id = $comment->comment_ID;
			$content    = $comment->comment_content;

			$show = get_option( 'show_avatars' );

			if ( $show == '1' ) {
				$avatar = sprintf( '<img src="%s" alt="avatar" />',
					get_avatar_url( $user_id, array( 'size' => '64' ) )
				);
			}

			$status = $comment->comment_approved ? '' : ' sub-comment-unapproved';

			$output = sprintf( '%s%s<div class="media-body"><span class="comment-author">%s</span> <small class="comment-time">%s</small>%s<br /><p>%s</p>%s%s',
				$child ? '<div id="comment-' . $comment_id . '" class="sub-comment media' . $status . '">' : '',
				isset( $avatar ) ? $avatar : '',
				$author,
				human_time_diff( get_comment_date( 'U', $comment_id ), current_time( 'timestamp' ) ),
				$comment->comment_approved ? '' : ' <small class="text-danger">' . __( 'En attente de modération', 'bravad' ) . '</small>',
				$content,
				! $child && $comment->comment_approved ? '<a href="#" class="js-reply">' . __( 'Répondre', 'bravad' ) . '</a>' : '',
				$child ? '</div></div>' : ''
			);

			return $output;
		}

		/**
		 * Add comment
		 */
		public function add_comment( $form_id, $keys ) {
			if ( $form_id !== '532' ) {
			    return; 
			}

			if ( isset( $keys['ft_5f8db5d30e767'] ) ) {
				$post_id = $keys['ft_5f8db5d30e767'];

			} else {
				return;
			}

			if ( isset( $keys['ft_5f8db588d602f'] ) ) {
				$name = $keys['ft_5f8db588d602f'];

			} else {
				return;
			}

			if ( isset( $keys['ft_5f8db5910aecc'] ) ) {
				$email = $keys['ft_5f8db5910aecc'];

			} else {
				return;
			}

			if ( isset( $keys['ft_5f8db59938fe4'] ) ) {
				$comment = $keys['ft_5f8db59938fe4'];

			} else {
				return;
			}

			$parent  = isset( $keys['ft_5f8db5e4917c5'] ) && ! empty( $keys['ft_5f8db5e4917c5'] ) ? $keys['ft_5f8db5e4917c5'] : '0';
			$user_id = isset( $keys['ft_5f8db5f326735'] ) && ! empty( $keys['ft_5f8db5f326735'] ) ? $keys['ft_5f8db5f326735'] : '';

			if ( ! empty( $user_id ) ) {
				$user  = get_user_by( 'ID', $user_id );
				$name  = get_user_meta( $user_id, 'nickname', true );
				$email = $user->user_email;
			}

			$commentdata = array(
				'user_id'              => $user_id,
				'comment_author'       => $name,
				'comment_author_email' => $email,
				'comment_author_url'   => '',
				'comment_content'      => $comment,
				'comment_parent'       => $parent,
				'comment_post_ID'      => $post_id,
				'comment_approved'	   => 0
			);

			$comment_id = wp_insert_comment( $commentdata );
		}

		/**
		 * Value
		 */
		public function value( $value, $id ) { 
			if ( $id == 'ft_5f8db5d30e767' ) { // Post ID
				$value = get_the_ID();
			}

			if ( $id == 'ft_5f8db5f326735' ) { // User ID
				$value = get_current_user_ID();
			}

			if ( is_user_logged_in() ) {
				$user_id = get_current_user_id();
				$user    = get_user_by( 'ID', $user_id );

				if ( $id == 'ft_5f8db588d602f' ) { // Name
					$value = get_user_meta( $user_id, 'nickname', true );
				}

				if ( $id == 'ft_5f8db5910aecc' ) { // Email
					$value = $user->user_email;
				}
			}

			return $value; 
		} 

	}

endif;

return new Bravad_Comment();
