<?php
/** Architecture pillar landing (ported from routes/architecture.tsx). Page slug "architecture". */
if (!defined('ABSPATH')) exit;
get_header();
the_post();
$img = get_template_directory_uri() . '/assets/images/';
$topics = ['Modern Homes', 'Luxury Bathrooms', 'Architectural Lighting', 'Open Space Concepts', 'Scandinavian Design', 'Minimalist Architecture', 'Interior Flow Concepts', 'Material Harmony', 'Sustainable Surface Design', 'Spatial Design Trends', 'Premium Interior Inspiration', 'Architectural Styling'];
$related = get_posts(['post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 6, 'orderby' => 'date', 'order' => 'DESC', 'no_found_rows' => true, 'meta_query' => [['key' => '_mc_category', 'value' => ['Architecture', 'Bathrooms', 'Surfaces'], 'compare' => 'IN']]]);
$fb = function ($p) use ($img) { $t = get_the_post_thumbnail_url($p, 'large'); return $t ?: $img . 'blog-1.jpg'; };
?>
<?php mc_breadcrumbs([['Home', home_url('/')], ['Architecture', null]]); ?>
<section class="relative mt-8 h-[420px] md:h-[520px] overflow-hidden flex items-end">
  <img src="<?php echo esc_url($img . 'architecture-hero.jpg'); ?>" alt="Architecture" class="absolute inset-0 w-full h-full object-cover" loading="eager">
  <div class="absolute inset-0 bg-black/45"></div>
  <div class="container-editorial relative z-10 pb-12 text-white">
    <p class="eyebrow text-accent">Pillar — Architecture</p>
    <h1 class="display text-5xl md:text-7xl mt-4 text-white">Architecture, slowly.</h1>
    <p class="mt-6 max-w-2xl text-lg text-white/85 leading-relaxed">The houses, lofts, retreats and small studios that we keep returning to — and what makes them quietly extraordinary. Long-form architectural writing, published continuously.</p>
  </div>
</section>

<section class="container-editorial"><div class="flex flex-wrap gap-2 border-y border-border py-6">
  <?php foreach ($topics as $t): ?><span class="text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2"><?php echo esc_html($t); ?></span><?php endforeach; ?>
</div></section>

<section class="container-editorial mt-20 grid md:grid-cols-12 gap-12">
  <div class="md:col-span-7 prose-editorial">
    <h2>The end of architectural noise</h2>
    <p>The most quietly compelling residential architecture being built today shares a common posture: it is at ease with itself. Volumes are confident without shouting; materials repeat with discipline; the light is allowed to do most of the work.</p>
    <p>This page is our running notebook on that correction. We follow the architects whose work resists trend, the projects that age into themselves, and the spatial moves that turn out — over years of being lived in — to have been right.</p>
    <h3>What we cover under "Architecture"</h3>
    <p>Modern single-family homes, considered renovations, the architecture of the bathroom and kitchen as primary rooms, lighting as architecture, and the increasingly important question of how a building meets its landscape.</p>
  </div>
  <aside class="md:col-span-5 space-y-6">
    <div class="img-zoom aspect-[4/5]"><img src="<?php echo esc_url($img . 'blog-9.jpg'); ?>" alt="Spa-inspired bathroom with modern tile" class="w-full h-full object-cover" loading="lazy"></div>
    <div class="img-zoom aspect-[4/5] md:ml-12"><img src="<?php echo esc_url($img . 'blog-10.jpg'); ?>" alt="Stone texture and modern ceramic surfaces" class="w-full h-full object-cover" loading="lazy"></div>
  </aside>
</section>

<section class="container-editorial mt-24">
  <p class="eyebrow">Architectural insights</p>
  <h2 class="display text-3xl md:text-5xl mt-4 mb-8">Three moves that quietly transform a home</h2>
  <div class="overflow-x-auto border-y border-border"><table class="w-full text-sm">
    <thead><tr class="text-left"><th class="py-4 pr-6 eyebrow">Move</th><th class="py-4 pr-6 eyebrow">What it does</th><th class="py-4 eyebrow">Where to deploy</th></tr></thead>
    <tbody class="divide-y divide-border">
      <?php foreach ([['Continuous floor', 'Reads as one room rather than several', 'Public living zones'], ['Concealed light', 'Architecture without lighting fixtures', 'Coves, skirting, ceiling slots'], ['Single material gesture', 'A focal volume that anchors the room', 'One feature wall, never two']] as $r): ?>
        <tr><td class="py-4 pr-6 font-medium"><?php echo esc_html($r[0]); ?></td><td class="py-4 pr-6 text-muted-foreground"><?php echo esc_html($r[1]); ?></td><td class="py-4 text-muted-foreground"><?php echo esc_html($r[2]); ?></td></tr>
      <?php endforeach; ?>
    </tbody>
  </table></div>
</section>

<section class="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
  <div class="img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'arch-mini-1.jpg'); ?>" alt="Architectural lighting design" class="w-full h-full object-cover" loading="lazy"></div>
  <div><p class="eyebrow">Mini editorial · Lighting</p><h2 class="display text-3xl md:text-4xl mt-4">Light as architecture, not decoration</h2>
    <p class="mt-6 text-muted-foreground leading-relaxed">The most architecturally satisfying interiors of 2026 share an invisible discipline: their lighting is rarely seen as objects. Coves wash ceilings, slots graze textured walls, and downlights pool gently in carefully chosen places.</p>
    <p class="mt-4 text-muted-foreground leading-relaxed">Architectural lighting is a coordination problem solved at design stage — not a finish-stage purchase. The payoff is a home that looks beautiful at every hour.</p></div>
</section>

<section class="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
  <div class="md:order-2 img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'arch-mini-2.jpg'); ?>" alt="Scandinavian living room with natural materials" class="w-full h-full object-cover" loading="lazy"></div>
  <div class="md:order-1"><p class="eyebrow">Mini editorial · Scandinavian</p><h2 class="display text-3xl md:text-4xl mt-4">Why Scandinavian design keeps winning</h2>
    <p class="mt-6 text-muted-foreground leading-relaxed">Scandinavian residential architecture has been the most consistently exported aesthetic of the last fifty years for one simple reason: it is built around how light behaves in real rooms, not how surfaces look in photographs.</p>
    <p class="mt-4 text-muted-foreground leading-relaxed">The 2026 iteration has loosened: warmer whites, darker oaks, hand-glazed ceramics on shelves and walls. The bones are unchanged.</p></div>
</section>

<section class="container-editorial mt-24">
  <p class="eyebrow">Featured rooms</p>
  <h2 class="display text-3xl md:text-5xl mt-4 mb-10">Three rooms we keep returning to</h2>
  <div class="grid md:grid-cols-3 gap-8">
    <?php foreach ([['The Mountain House', 'A concrete villa carved into a Mediterranean hillside.', 'blog-7.jpg'], ['The Reading Loft', 'A small intervention that transformed an attic into a sanctuary.', 'blog-6.jpg'], ['The Limewash Bedroom', 'Plaster, linen, taupe — and almost nothing else.', 'blog-8.jpg']] as $x): ?>
      <article class="hover-lift"><div class="img-zoom aspect-[4/5] mb-4"><img src="<?php echo esc_url($img . $x[2]); ?>" alt="<?php echo esc_attr($x[0]); ?>" loading="lazy" class="w-full h-full object-cover"></div>
        <h3 class="font-serif text-2xl"><?php echo esc_html($x[0]); ?></h3><p class="mt-2 text-sm text-muted-foreground"><?php echo esc_html($x[1]); ?></p></article>
    <?php endforeach; ?>
  </div>
</section>

<?php if ($related): ?>
<section class="container-editorial mt-24 border-t border-border pt-12">
  <p class="eyebrow mb-8">From the journal</p>
  <div class="grid md:grid-cols-3 gap-10">
    <?php foreach ($related as $p): ?>
      <a href="<?php echo esc_url(get_permalink($p)); ?>" class="group"><div class="img-zoom aspect-[5/4] mb-4"><img src="<?php echo esc_url($fb($p)); ?>" alt="<?php echo esc_attr(get_the_title($p)); ?>" loading="lazy" class="w-full h-full object-cover"></div>
        <p class="eyebrow mb-2"><?php echo esc_html(get_post_meta($p->ID, '_mc_category', true) ?: 'Editorial'); ?></p><h3 class="font-serif text-xl group-hover:text-accent transition-colors"><?php echo esc_html(get_the_title($p)); ?></h3></a>
    <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>
<?php get_footer();
