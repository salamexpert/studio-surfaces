<?php
/** Blog listing (ported from routes/blog.index.tsx). Page slug "blog". */
if (!defined('ABSPATH')) exit;
get_header();
$img = get_template_directory_uri() . '/assets/images/';
$paged = max(1, (int) get_query_var('paged'), (int) get_query_var('page'));
$q = new WP_Query(['post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 24, 'paged' => $paged, 'orderby' => 'date', 'order' => 'DESC']);
?>
<?php mc_breadcrumbs([['Home', home_url('/')], ['Blog', null]]); ?>
<section class="container-editorial pt-8 md:pt-12">
  <p class="eyebrow">The archive</p>
  <h1 class="display text-5xl md:text-7xl mt-3">Every story, filed.</h1>
  <p class="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">Ceramic surfaces, modern architecture, luxury bathrooms and the materials shaping contemporary interiors.</p>
</section>
<section class="container-editorial mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
  <?php while ($q->have_posts()): $q->the_post(); mc_article_card(get_post(), 'md'); endwhile; wp_reset_postdata(); ?>
</section>
<?php if ($q->max_num_pages > 1): ?>
  <div class="container-editorial mt-16 flex justify-center gap-2 text-xs uppercase tracking-widest"><?php echo paginate_links(['total' => $q->max_num_pages, 'current' => $paged, 'prev_text' => '← Prev', 'next_text' => 'Next →']); ?></div>
<?php endif; get_footer();
