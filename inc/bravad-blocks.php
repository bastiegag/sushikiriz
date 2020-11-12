<?php
/**
 * Bravad blocks
 *
 * @package Sushikiriz
 * @version 2.0.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/init', 'bravad_acf_add_local_field_groups' );

function bravad_acf_add_local_field_groups() {
	$blocks = array();

	$args = array(
	    'posts_per_page' => -1,
	    'orderby'        => 'title',
	    'order'          => 'asc',
	    'post_type'      => 'acf-field-group',
	    'post_status'    => 'acf-disabled',
	    'fields'         => 'ids'
	);

	$posts = get_posts( $args );

	$i = 0;
	foreach ( $posts as $post_id ) {
		$p    = get_post( $post_id );
		$type = strtolower( unserialize( $p->post_content )['description'] );
	    
	    if ( $type == 'block' ) {
	    	$slug  = bravad_get_slug( $post_id );
	    	$label = get_the_title( $post_id );

			$options = array(
				'portfolio'  => 'portfolio',
				'equipe'     => 'team',
				'post'       => 'post',
				'google-map' => 'google-maps'
			);

			if ( isset( $options[ sanitize_title( $label ) ] ) ) {
				$option = get_field( $options[ sanitize_title( $label ) ], 'option' );

				if ( isset( $option ) && ! bravad_is( $options[ sanitize_title( $label ) ] ) ) {
					continue;
				}
			}

    		$post_types = array( 'post', 'portfolio', 'team' );

    		if ( sanitize_title( $label ) == 'publications' && ! bravad_is( $post_types, true, false ) ) {
    			continue;
    		}

    		if ( sanitize_title( $label ) == 'formulaire' && ! bravad_is_formtastic() ) {
    			continue;
    		}

    		if ( sanitize_title( $label ) == 'bloc-reutilisable' && isset( $_GET['page'] ) && $_GET['page'] == 'reusable_blocks' ) {
    			continue;
    		}

			$blocks['bravad_block_' . $i] = array(
				'key'        => 'bravad_block_' . $i,
				'name'       => sanitize_title( $label ),
				'label'      => __( $label, 'bravad' ),
				'display'    => 'row',
				'sub_fields' => array(
					array(
						'key'               => 'bravad_block_' . $i . '_field',
						'label'             => __( $label, 'bravad' ),
						'name'              => sanitize_title( $label ),
						'type'              => 'clone',
						'instructions'      => '',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'clone' => array(
							0 => $slug,
						),
						'display'      => 'seamless',
						'layout'       => 'block',
						'prefix_label' => 0,
						'prefix_name'  => 0,
					),
				),
				'min' => '',
				'max' => '',
			);
			
			$i++;
	    }
	}

	if ( ! empty( $blocks ) ) {
		acf_add_local_field_group(array(
			'key'    => 'group_5c194904515d0',
			'title'  => __( 'Blocs', 'bravad' ),
			'fields' => array(
				array(
					'key'               => 'field_5c19491e83353',
					'label'             => __( 'Blocs', 'bravad' ),
					'name'              => 'blocks',
					'type'              => 'flexible_content',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'layouts'      => $blocks,
					'button_label' => __( 'Ajouter', 'bravad' ),
					'min'          => '',
					'max'          => '',
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'page',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => 0,
			'description'           => '',
		));

	} else {
		acf_add_local_field_group(array(
			'key'    => 'group_5c194904515d0',
			'title'  => __( 'Blocs', 'bravad' ),
			'fields' => array(
				array(
					'key'               => 'field_5c24daf1a5ed5',
					'label'             => __( 'Blocs', 'bravad' ),
					'name'              => '',
					'type'              => 'message',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'message'   => __( 'Il n\'y a pas de blocs disponibles', 'bravad' ),
					'new_lines' => 'wpautop',
					'esc_html'  => 0,
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'post',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => 1,
			'description'           => '',
		));
	}

}
