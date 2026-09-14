<?php
if (!defined('ABSPATH')) exit;
get_header(); ?>
<section class="container-editorial pt-10">
  <h1 class="display text-4xl md:text-5xl mb-12"><?php echo is_search() ? esc_html('Results for “' . get_search_query() . '”') : 'The Archive'; ?></h1>
  <?php if (have_posts()): ?>
    <div class="grid md:grid-cols-3 gap-x-8 gap-y-14"><?php while (have_posts()): the_post(); mc_article_card(get_post(), 'md'); endwhile; ?></div>
    <div class="mt-16 flex justify-center gap-2 text-xs uppercase tracking-widest"><?php echo paginate_links(['prev_text' => '← Prev', 'next_text' => 'Next →']); ?></div>
  <?php else: ?><p class="text-muted-foreground">Nothing found.</p><?php endif; ?>
</section>
<?php get_footer();
