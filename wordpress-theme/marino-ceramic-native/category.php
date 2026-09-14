<?php
/** Category archive. */
if (!defined('ABSPATH')) exit;
get_header();
$name = single_term_title('', false);
?>
<?php mc_breadcrumbs([['Home', home_url('/')], ['Blog', home_url('/blog/')], [$name, null]]); ?>
<section class="container-editorial pt-8 md:pt-12">
  <p class="eyebrow">Section</p>
  <h1 class="display text-5xl md:text-7xl mt-3"><?php echo esc_html($name); ?></h1>
</section>
<?php if (have_posts()): ?>
<section class="container-editorial mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
  <?php while (have_posts()): the_post(); mc_article_card(get_post(), 'md'); endwhile; ?>
</section>
<?php if ($GLOBALS['wp_query']->max_num_pages > 1): ?>
  <div class="container-editorial mt-16 flex justify-center gap-2 text-xs uppercase tracking-widest"><?php echo paginate_links(['prev_text' => '← Prev', 'next_text' => 'Next →']); ?></div>
<?php endif; else: ?>
  <p class="container-editorial mt-16 text-muted-foreground">No stories filed under this section yet.</p>
<?php endif; get_footer();
