<?php
/**
 * Footer template
 * 
 * @package Sushikiriz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>	
				</div><!-- .page-content -->

				<?php 
				/**
				 * bravad_after_main_content hook
				 *
				 * @hooked bravad_post_comments - 10
				 * @hooked bravad_page_footer - 20
				 */
				do_action( 'bravad_after_main_content' ); 
				?>

			</main><!-- .page -->

			<?php 
			/**
			 * bravad_after_site hook
			 *
			 * @hooked bravad_site_footer - 10
			 */
			do_action( 'bravad_after_site' ); 
			?>
			
		</div><!-- .site-scroll -->
	</div><!-- .site -->

    <?php wp_footer(); ?>
</body>
</html>
