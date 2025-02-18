<?php
/**
 * Jobs template part
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
$autocomplete = get_sub_field('autocomplete');
$field = get_sub_field( 'field-id' );
$form = get_sub_field( 'form-id' );
?>

<section <?php echo bravad_block_options( $type ); ?> <?php echo bravad_block_animation(); ?>>
	<?php echo bravad_background( 'block' ); ?>

		<div class="container<?php echo $width ? '-fluid' : ''; ?>">

			<?php 
			echo bravad_block_title( $type );
			?>

            <div id="accordion">
            <?php
            if (have_rows('jobs')) :

                $id = 0;
                while (have_rows('jobs')) : the_row();
            ?>
                <div class="job">
                    <a class="job-header" id="heading<?echo $id?>" data-toggle="collapse" data-target="#collapse<?echo $id?>" aria-expanded="false" aria-controls="collapseOne">
                        <h3><?the_sub_field('job-name');?></h3>
                        <div class="job-arrow"></div>
                    </a>

                    <div id="collapse<?echo $id?>" class="collapse" aria-labelledby="heading<?echo $id?>" data-parent="#accordion">
                        <div class="job-body">
                            <div class="job-text"><?the_sub_field('description');?></div>
                            <? if(!$autocomplete) :?>
                                <? if(!empty(get_sub_field('link'))) :?>
                                <a href="<?echo get_sub_field('link')['url'];?>" class="btn btn-primary btn-apply"><?echo get_sub_field('link')['title'];?></a>
                                <? endif; ?>
                            <? else : ?>
                                <? if(!empty(get_sub_field('btn-text'))) :?>
                                <a href="#<? echo $form;?>" class="btn btn-primary btn-apply" onclick="ChangeFieldText('<?echo $field;?>', '<?the_sub_field('job-name');?>');"><?the_sub_field('btn-text');?></a>
                                <? endif; ?>
                            <? endif; ?>
                        </div>
                        
                    </div>
                </div>
            <?php
                    $id++;
                endwhile;
            endif;
            ?>
            </div>
			
		</div><!-- .container -->

	</div><!-- .block-background -->

    <script>
        function ChangeFieldText(field, text) {
            var input = document.getElementById(field);
            input.value = text;
        }
    </script>
</section>
