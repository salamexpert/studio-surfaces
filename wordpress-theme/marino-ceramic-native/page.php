<?php
/** Generic page. */
if (!defined('ABSPATH')) exit;
get_header();
the_post();
$hero = get_post_meta(get_the_ID(), '_mc_hero', true);
$eyebrow = get_post_meta(get_the_ID(), '_mc_eyebrow', true) ?: '';
?>
<?php mc_breadcrumbs([['Home', home_url('/')], [get_the_title(), null]]); ?>
<section class="container-editorial pt-8 md:pt-12 max-w-4xl">
  <?php if ($eyebrow): ?><p class="eyebrow text-accent"><?php echo esc_html($eyebrow); ?></p><?php endif; ?>
  <h1 class="display text-4xl md:text-6xl mt-3 leading-[1.05]"><?php the_title(); ?></h1>
</section>
<div class="container-editorial max-w-3xl mt-10 prose-editorial"><?php the_content(); ?></div>
<?php get_footer();
