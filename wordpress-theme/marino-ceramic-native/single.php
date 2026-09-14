<?php
/** Blog post (ported from routes/blog.$slug.tsx). */
if (!defined('ABSPATH')) exit;
get_header();
the_post();
$id = get_the_ID();
$img = get_template_directory_uri() . '/assets/images/';
$faq = mc_post_faq($id);
$cat = get_post_meta($id, '_mc_category', true) ?: 'Editorial';
$author = get_post_meta($id, '_mc_author', true) ?: 'Marino Ceramic Tile';
$cover = get_the_post_thumbnail_url($id, 'full') ?: $img . 'blog-1.jpg';
$related = get_posts(['post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'post__not_in' => [$id], 'orderby' => 'rand', 'no_found_rows' => true]);
$fb = function ($p) use ($img) { $t = get_the_post_thumbnail_url($p, 'large'); return $t ?: $img . 'blog-1.jpg'; };
?>
<?php mc_breadcrumbs([['Home', home_url('/')], ['Blog', home_url('/blog/')], [$cat, mc_category_url($cat)]]); ?>
<article>
  <header class="container-editorial max-w-4xl pt-8 md:pt-12">
    <p class="eyebrow text-accent"><?php echo esc_html($cat); ?></p>
    <h1 class="display text-4xl md:text-6xl mt-4 leading-[1.05]"><?php the_title(); ?></h1>
    <p class="mt-6 text-lg text-muted-foreground leading-relaxed"><?php echo esc_html(get_the_excerpt()); ?></p>
    <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
      <span>By <span class="text-foreground"><?php echo esc_html($author); ?></span></span><span>·</span>
      <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('F j, Y')); ?></time><span>·</span>
      <span><?php echo esc_html(mc_reading_time($id)); ?></span>
    </div>
  </header>
  <div class="container-editorial max-w-5xl mt-10">
    <div class="img-zoom aspect-[16/9] bg-secondary"><img src="<?php echo esc_url($cover); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" class="w-full h-full object-cover"></div>
  </div>
  <div class="container-editorial max-w-3xl mt-12 prose-editorial"><?php the_content(); ?></div>
  <div class="container-editorial max-w-3xl"><?php mc_faq_render($faq); ?></div>
</article>

<?php if ($related): ?>
<section class="container-editorial mt-24">
  <div class="border-b border-border pb-6 mb-12 flex items-end justify-between"><h2 class="display text-3xl md:text-4xl">Continue reading</h2><a href="<?php echo esc_url(home_url('/blog/')); ?>" class="hidden md:inline text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">All stories</a></div>
  <div class="grid md:grid-cols-3 gap-10"><?php foreach ($related as $r) mc_article_card($r, 'sm'); ?></div>
</section>
<?php endif; ?>
<?php get_footer();
