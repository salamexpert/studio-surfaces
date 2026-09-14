<?php
/** Surfaces pillar landing (ported from routes/surfaces.tsx). Page slug "surfaces". */
if (!defined('ABSPATH')) exit;
get_header();
the_post();
$img = get_template_directory_uri() . '/assets/images/';
$topics = ['Ceramic Tile Trends', 'Bathroom Tile Inspiration', 'Kitchen Surface Concepts', 'Minimalist Textures', 'Stone-Inspired Finishes', 'Matte vs Glossy Finishes', 'Luxury Flooring', 'Wall Tile Design', 'Contemporary Interior Surfaces', 'Modern Color Palettes', 'Surface Material Guides', 'Texture Compositions'];
$related = get_posts(['post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 6, 'orderby' => 'date', 'order' => 'DESC', 'no_found_rows' => true, 'meta_query' => [['key' => '_mc_category', 'value' => ['Surfaces', 'Bathrooms', 'Kitchens'], 'compare' => 'IN']]]);
$fb = function ($p) use ($img) { $t = get_the_post_thumbnail_url($p, 'large'); return $t ?: $img . 'blog-1.jpg'; };
?>
<?php mc_breadcrumbs([['Home', home_url('/')], ['Surfaces', null]]); ?>
<section class="relative mt-8 h-[420px] md:h-[520px] overflow-hidden flex items-end">
  <img src="<?php echo esc_url($img . 'surfaces-hero.jpg'); ?>" alt="Surface design" class="absolute inset-0 w-full h-full object-cover" loading="eager">
  <div class="absolute inset-0 bg-black/45"></div>
  <div class="container-editorial relative z-10 pb-12 text-white">
    <p class="eyebrow text-accent">Pillar — Surfaces</p>
    <h1 class="display text-5xl md:text-7xl mt-4 text-white">Surface design, considered.</h1>
    <p class="mt-6 max-w-2xl text-lg text-white/85 leading-relaxed">A working library of the ceramics, stones and finishes shaping contemporary interiors. Long-form essays, comparisons and material guides — published continuously.</p>
  </div>
</section>

<section class="container-editorial"><div class="flex flex-wrap gap-2 border-y border-border py-6">
  <?php foreach ($topics as $t): ?><span class="text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2"><?php echo esc_html($t); ?></span><?php endforeach; ?>
</div></section>

<section class="container-editorial mt-20 grid md:grid-cols-12 gap-12">
  <div class="md:col-span-7 prose-editorial">
    <h2>The slow return of the considered surface</h2>
    <p>For decades, surfaces were an afterthought in residential design — chosen toward the end of a project, often from a sample board. That has reversed. The contemporary specifier begins with the surface, and the rest of the room negotiates around it.</p>
    <p>The reasons are largely technical. Slab-format porcelains have made it possible to wrap a kitchen island in a single continuous material; matte glazes have given ceramics the depth that only stone used to offer; digital printing has made it impossible to tell, from across a room, whether you are looking at travertine or its convincing engineered cousin.</p>
    <h3>What we cover under "Surfaces"</h3>
    <p>Our Surfaces editorial spans every material that meets the eye in a finished interior — ceramic, porcelain, natural stone, microcement, plaster, terrazzo, engineered slabs and the increasingly tactile world of three-dimensional wall finishes.</p>
  </div>
  <aside class="md:col-span-5 space-y-6">
    <div class="img-zoom aspect-[4/5]"><img src="<?php echo esc_url($img . 'blog-3.jpg'); ?>" alt="Minimalist ceramic surface design" class="w-full h-full object-cover" loading="lazy"></div>
    <div class="img-zoom aspect-[4/5] md:ml-12"><img src="<?php echo esc_url($img . 'blog-5.jpg'); ?>" alt="Premium kitchen surface with porcelain worktop" class="w-full h-full object-cover" loading="lazy"></div>
  </aside>
</section>

<section class="container-editorial mt-24">
  <p class="eyebrow">Material comparison</p>
  <h2 class="display text-3xl md:text-5xl mt-4 mb-8">Matte versus glossy, briefly.</h2>
  <div class="overflow-x-auto border-y border-border"><table class="w-full text-sm">
    <thead><tr class="text-left"><th class="py-4 pr-6 eyebrow">Property</th><th class="py-4 pr-6 eyebrow">Matte ceramic</th><th class="py-4 eyebrow">Glossy ceramic</th></tr></thead>
    <tbody class="divide-y divide-border">
      <?php foreach ([['Reads as', 'Architectural, calm', 'Reflective, energetic'], ['Light behaviour', 'Absorbs and softens', 'Bounces and amplifies'], ['Best for', 'Living, bedrooms, primary baths', 'Backsplashes, accent walls'], ['Maintenance', 'Forgiving of marks', 'Shows everything']] as $r): ?>
        <tr><td class="py-4 pr-6 font-medium"><?php echo esc_html($r[0]); ?></td><td class="py-4 pr-6 text-muted-foreground"><?php echo esc_html($r[1]); ?></td><td class="py-4 text-muted-foreground"><?php echo esc_html($r[2]); ?></td></tr>
      <?php endforeach; ?>
    </tbody>
  </table></div>
</section>

<section class="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
  <div class="img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'surface-mini-1.jpg'); ?>" alt="Fluted ceramic wall surface" class="w-full h-full object-cover" loading="lazy"></div>
  <div><p class="eyebrow">Mini editorial · Wall design</p><h2 class="display text-3xl md:text-4xl mt-4">Why fluted surfaces keep returning</h2>
    <p class="mt-6 text-muted-foreground leading-relaxed">Vertical fluted ceramics have moved from showroom novelty to specification standard. Under raking light, the same wall reads three different ways across a single day.</p>
    <p class="mt-4 text-muted-foreground leading-relaxed">The discipline is restraint. One fluted volume per room, paired with a quiet flat companion, almost always outperforms a space that tries to texture every surface.</p></div>
</section>

<section class="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
  <div class="md:order-2 img-zoom aspect-[16/10]"><img src="<?php echo esc_url($img . 'surface-mini-2.jpg'); ?>" alt="Contemporary kitchen island with waterfall edge porcelain" class="w-full h-full object-cover" loading="lazy"></div>
  <div class="md:order-1"><p class="eyebrow">Mini editorial · Kitchen surfaces</p><h2 class="display text-3xl md:text-4xl mt-4">The waterfall island, refined</h2>
    <p class="mt-6 text-muted-foreground leading-relaxed">The waterfall edge has become a defining detail of the premium contemporary kitchen — but the version winning awards in 2026 is more disciplined than its predecessors.</p></div>
</section>

<section class="container-editorial mt-24">
  <p class="eyebrow">Editor's recommendations</p>
  <h2 class="display text-3xl md:text-5xl mt-4 mb-10">If you specify only one thing this season</h2>
  <div class="grid md:grid-cols-3 gap-10">
    <?php foreach ([['A monolithic floor', 'Choose one large-format porcelain and carry it through every public room.'], ['A textured feature volume', 'One fluted, ribbed or hand-pressed wall. Used sparingly, it carries the entire room.'], ['A warm, restrained palette', 'Two stones at most. One quiet metal. Earth tones that age like the rooms they sit in.']] as $x): ?>
      <div class="border-t border-border pt-6"><h3 class="font-serif text-2xl"><?php echo esc_html($x[0]); ?></h3><p class="mt-3 text-muted-foreground leading-relaxed"><?php echo esc_html($x[1]); ?></p></div>
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
