<?php
/** Home (ported from routes/index.tsx). */
if (!defined('ABSPATH')) exit;
get_header();
$img = get_template_directory_uri() . '/assets/images/';
$posts = get_posts(['post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => -1, 'orderby' => 'menu_order date', 'order' => 'ASC', 'no_found_rows' => true]);
$cov = function ($p) use ($img) { $t = $p ? get_the_post_thumbnail_url($p, 'large') : ''; return $t ?: $img . 'blog-1.jpg'; };
$cat = function ($p) { return get_post_meta($p->ID, '_mc_category', true) ?: 'Editorial'; };
$trending = array_slice($posts, 0, 3);
$picks    = array_slice($posts, 3, 4);
$latest   = array_slice($posts, 0, 4);
$feature  = $posts[0] ?? null;
?>
<!-- HERO -->
<section class="relative h-[620px] md:h-[740px] lg:h-[820px] -mt-16 md:-mt-20 flex items-center md:items-end overflow-hidden">
  <img src="<?php echo esc_url($img . 'home-hero.jpg'); ?>" alt="Modern architectural living room with travertine surfaces" class="absolute inset-0 w-full h-full object-cover" width="1920" height="1280">
  <div class="absolute inset-0 bg-black/50"></div>
  <div class="container-editorial relative z-10 pb-16 md:pb-24 text-white">
    <p class="eyebrow text-accent">Issue 04 — Spring 2026</p>
    <h1 class="display text-5xl md:text-7xl lg:text-8xl max-w-5xl mt-6 text-white">The new architecture of surface.</h1>
    <div class="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <p class="max-w-xl text-base md:text-lg text-white/85 leading-relaxed">An editorial publication on ceramic, stone and the materials that quietly define the way contemporary homes feel. New stories every week.</p>
      <?php if ($feature): ?><a href="<?php echo esc_url(get_permalink($feature)); ?>" class="group inline-flex items-center gap-3 text-sm uppercase tracking-widest border-b border-white pb-2 hover:border-accent hover:text-accent transition-colors w-fit">Read this week's feature →</a><?php endif; ?>
    </div>
  </div>
</section>

<!-- TRENDING -->
<section class="container-editorial mt-24 md:mt-32">
  <div class="flex items-end justify-between mb-12 border-b border-border pb-6">
    <div><p class="eyebrow">Trending now</p><h2 class="display text-3xl md:text-5xl mt-3">Design stories of the week</h2></div>
    <a href="<?php echo esc_url(home_url('/blog/')); ?>" class="hidden md:inline text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">All stories</a>
  </div>
  <div class="grid md:grid-cols-3 gap-10">
    <?php foreach ($trending as $p): ?>
      <article class="group"><a href="<?php echo esc_url(get_permalink($p)); ?>" class="block">
        <div class="img-zoom aspect-[4/5] mb-5 bg-secondary"><img src="<?php echo esc_url($cov($p)); ?>" alt="<?php echo esc_attr(get_the_title($p)); ?>" loading="lazy" class="w-full h-full object-cover"></div>
        <p class="eyebrow mb-3"><?php echo esc_html($cat($p)); ?></p>
        <h3 class="font-serif text-2xl leading-tight group-hover:text-accent transition-colors"><?php echo esc_html(get_the_title($p)); ?></h3>
        <p class="mt-3 text-sm text-muted-foreground line-clamp-2"><?php echo esc_html(get_the_excerpt($p)); ?></p>
      </a></article>
    <?php endforeach; ?>
  </div>
</section>

<!-- SURFACE HIGHLIGHTS -->
<section class="container-editorial mt-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
  <div class="grid grid-cols-2 gap-4">
    <div class="img-zoom aspect-[3/4]"><img src="<?php echo esc_url($img . 'surface-1.jpg'); ?>" alt="Cream ceramic texture" loading="lazy" class="w-full h-full object-cover"></div>
    <div class="img-zoom aspect-[3/4] mt-12"><img src="<?php echo esc_url($img . 'surface-2.jpg'); ?>" alt="Green marble texture" loading="lazy" class="w-full h-full object-cover"></div>
  </div>
  <div>
    <p class="eyebrow">Surface design</p>
    <h2 class="display text-4xl md:text-5xl mt-4">The material is the message.</h2>
    <p class="mt-6 text-base text-muted-foreground leading-relaxed">From hand-glazed zellige to bookmatched calacatta, the surfaces shaping the year are quieter, more tactile, and more architectural than ever.</p>
    <a href="<?php echo esc_url(home_url('/surfaces/')); ?>" class="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-80">Enter the Surfaces archive ↗</a>
  </div>
</section>

<!-- ARCHITECTURE HIGHLIGHTS -->
<section class="container-editorial mt-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
  <div class="md:order-2 grid grid-cols-1 gap-6">
    <div class="img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'arch-1.jpg'); ?>" alt="Modern villa at dusk" loading="lazy" class="w-full h-full object-cover"></div>
    <div class="img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'arch-2.jpg'); ?>" alt="Open plan double height" loading="lazy" class="w-full h-full object-cover"></div>
  </div>
  <div class="md:order-1">
    <p class="eyebrow">Architecture</p>
    <h2 class="display text-4xl md:text-5xl mt-4">Spaces designed to be lived in slowly.</h2>
    <p class="mt-6 text-base text-muted-foreground leading-relaxed">We follow the architects building homes that age beautifully — the volumes, the light, the considered restraint. Modernism without the chill.</p>
    <a href="<?php echo esc_url(home_url('/architecture/')); ?>" class="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-80">Enter the Architecture archive ↗</a>
  </div>
</section>

<!-- QUOTE -->
<section class="container-editorial mt-32">
  <div class="max-w-5xl mx-auto text-center px-4">
    <p class="eyebrow">Editor's note</p>
    <blockquote class="display text-3xl md:text-5xl lg:text-6xl mt-8 italic font-light leading-tight">"A great room begins with a great floor. Everything else simply earns its place on top of it."</blockquote>
    <p class="mt-8 text-sm text-muted-foreground tracking-widest uppercase">Elena Marchetti — Editor in Chief</p>
  </div>
</section>

<!-- TRANSFORMATIONS -->
<section class="container-editorial mt-32">
  <div class="border-b border-border pb-6 mb-12"><p class="eyebrow">Featured transformations</p><h2 class="display text-3xl md:text-5xl mt-3">Before, after, and entirely else.</h2></div>
  <div class="grid md:grid-cols-2 gap-10">
    <?php foreach ([['transform-1.jpg', 'A Brooklyn wet-room finds its calm', 'Bathrooms'], ['transform-2.jpg', 'A Spanish dining room rebuilt from terracotta up', 'Architecture']] as $x): ?>
      <article class="group hover-lift"><div class="img-zoom aspect-[16/10] mb-6"><img src="<?php echo esc_url($img . $x[0]); ?>" alt="<?php echo esc_attr($x[1]); ?>" loading="lazy" class="w-full h-full object-cover"></div>
        <p class="eyebrow mb-3"><?php echo esc_html($x[2]); ?></p><h3 class="font-serif text-2xl md:text-3xl leading-tight group-hover:text-accent transition-colors"><?php echo esc_html($x[1]); ?></h3></article>
    <?php endforeach; ?>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="container-editorial mt-32">
  <div class="bg-foreground text-background rounded-none p-10 md:p-16 text-center">
    <p class="eyebrow text-accent">The Marino Dispatch</p>
    <h2 class="display text-3xl md:text-5xl mt-4 text-background">One considered letter each week.</h2>
    <form class="mt-8 flex max-w-md mx-auto items-center gap-2 border-b border-background/40 pb-2" action="<?php echo esc_url(home_url('/contact/')); ?>" method="get">
      <input type="email" name="email" required placeholder="your@email.com" class="flex-1 bg-transparent text-sm py-2 outline-none text-background placeholder:text-background/50">
      <button class="text-xs uppercase tracking-widest text-accent" type="submit">Subscribe</button>
    </form>
  </div>
</section>

<!-- EDITORIAL PICKS -->
<?php if ($picks): ?>
<section class="container-editorial mt-32">
  <div class="border-b border-border pb-6 mb-12"><p class="eyebrow">Editor's picks</p><h2 class="display text-3xl md:text-5xl mt-3">From this season's archive</h2></div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <?php foreach ($picks as $p) mc_article_card($p, 'sm'); ?>
  </div>
</section>
<?php endif; ?>

<!-- LATEST -->
<section class="container-editorial mt-32">
  <div class="border-b border-border pb-6 mb-12 flex items-end justify-between"><div><p class="eyebrow">Latest from the blog</p><h2 class="display text-3xl md:text-5xl mt-3">Recent dispatches</h2></div><a href="<?php echo esc_url(home_url('/blog/')); ?>" class="hidden md:inline text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">View all</a></div>
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10"><?php foreach ($latest as $p) mc_article_card($p, 'sm'); ?></div>
</section>

<!-- MATERIAL SHOWCASE -->
<section class="mt-32 bg-foreground text-background py-24">
  <div class="container-editorial grid md:grid-cols-2 gap-12 items-center">
    <div><p class="eyebrow text-accent">Material library</p><h2 class="display text-4xl md:text-6xl mt-4 text-background">Five surfaces. Endless rooms.</h2>
      <p class="mt-6 text-base text-background/80 leading-relaxed max-w-md">A curated palette of ceramics, stones and engineered surfaces our editors have been specifying this year.</p>
      <a href="<?php echo esc_url(home_url('/surfaces/')); ?>" class="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1">Browse materials →</a></div>
    <div class="img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'material-showcase.jpg'); ?>" alt="Tile material samples" loading="lazy" class="w-full h-full object-cover"></div>
  </div>
</section>

<!-- GALLERY -->
<section class="container-editorial mt-32">
  <div class="border-b border-border pb-6 mb-12"><p class="eyebrow">Inspiration</p><h2 class="display text-3xl md:text-5xl mt-3">A visual notebook</h2></div>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    <?php foreach (['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg'] as $i => $g): ?>
      <div class="img-zoom <?php echo $i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[3/4] md:mt-12'; ?>"><img src="<?php echo esc_url($img . $g); ?>" alt="Gallery <?php echo $i + 1; ?>" loading="lazy" class="w-full h-full object-cover"></div>
    <?php endforeach; ?>
  </div>
</section>
<?php get_footer();
