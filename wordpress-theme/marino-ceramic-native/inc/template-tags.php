<?php
if (!defined('ABSPATH')) exit;

/** Inline SVG logo — tile mark + "MARINO / CERAMIC TILE" (ported from Logo.tsx). */
function mc_logo(int $height = 36, string $textColor = '#1C1712', string $accentColor = '#9B5434'): string {
    $w = (int) round((280 / 56) * $height);
    ob_start(); ?>
<svg width="<?php echo $w; ?>" height="<?php echo $height; ?>" viewBox="0 0 280 56" xmlns="http://www.w3.org/2000/svg" aria-label="Marino Ceramic Tile" role="img">
<defs>
<linearGradient id="mc-tl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#CDBCA2"/><stop offset="100%" stop-color="#B8A284"/></linearGradient>
<linearGradient id="mc-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2E2822"/><stop offset="100%" stop-color="<?php echo esc_attr($textColor); ?>"/></linearGradient>
<linearGradient id="mc-bl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C07650"/><stop offset="100%" stop-color="<?php echo esc_attr($accentColor); ?>"/></linearGradient>
<linearGradient id="mc-br" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#CDBCA2"/><stop offset="100%" stop-color="#B8A284"/></linearGradient>
</defs>
<rect width="56" height="56" rx="3" fill="#F5EFE7"/>
<rect x="25" y="2" width="6" height="52" fill="#E2D5C5"/><rect x="2" y="25" width="52" height="6" fill="#E2D5C5"/>
<rect x="2" y="2" width="23" height="23" rx="2" fill="url(#mc-tl)"/>
<rect x="31" y="2" width="23" height="23" rx="2" fill="url(#mc-tr)"/>
<rect x="2" y="31" width="23" height="23" rx="2" fill="url(#mc-bl)"/>
<rect x="31" y="31" width="23" height="23" rx="2" fill="url(#mc-br)"/>
<text x="68" y="37" font-family="Fraunces, Georgia, serif" font-size="26" font-weight="400" fill="<?php echo esc_attr($textColor); ?>" letter-spacing="4">MARINO</text>
<circle cx="261" cy="33" r="3" fill="<?php echo esc_attr($accentColor); ?>"/>
<text x="69" y="51" font-family="Inter, Arial, sans-serif" font-size="9.5" font-weight="600" fill="<?php echo esc_attr($accentColor); ?>" letter-spacing="4.5">CERAMIC TILE</text>
</svg>
<?php return (string) ob_get_clean();
}

/** Primary nav links. */
function mc_primary_nav(): array {
    return [['/surfaces/', 'Surfaces'], ['/architecture/', 'Architecture'], ['/blog/', 'Blog'], ['/about/', 'About'], ['/contact/', 'Contact']];
}

function mc_categories(): array { return ['Surfaces', 'Architecture', 'Bathrooms', 'Kitchens']; }

/** Decode a post's FAQ meta into [[q,a],...]. */
function mc_post_faq(int $id): array {
    $raw = get_post_meta($id, '_mc_faq', true);
    $data = $raw ? json_decode($raw, true) : [];
    return is_array($data) ? $data : [];
}

/** FAQ accordion (native <details>). */
function mc_faq_render(array $items, string $title = 'Frequently Asked Questions'): void {
    if (!$items) return;
    echo '<section class="mt-16 border-t border-border pt-10"><h2 class="display text-3xl md:text-4xl">' . esc_html($title) . '</h2>';
    echo '<div class="mt-8 divide-y divide-border">';
    foreach ($items as $f) {
        echo '<details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">'
            . '<span>' . esc_html($f[0]) . '</span><span class="text-accent transition-transform group-open:rotate-45">+</span></summary>'
            . '<div class="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">' . esc_html($f[1]) . '</div></details>';
    }
    echo '</div></section>';
}

/** Breadcrumb trail (items: [[label, href|null], ...]). */
function mc_breadcrumbs(array $items): void {
    echo '<nav class="container-editorial pt-8" aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">';
    foreach ($items as $i => $it) {
        echo '<li class="flex items-center gap-2">';
        if ($i > 0) echo '<span aria-hidden="true">/</span>';
        if (!empty($it[1])) echo '<a href="' . esc_url($it[1]) . '" class="hover:text-accent">' . esc_html($it[0]) . '</a>';
        else echo '<span class="text-foreground">' . esc_html($it[0]) . '</span>';
        echo '</li>';
    }
    echo '</ol></nav>';
}

function mc_reading_time(int $id): string {
    $mins = max(1, (int) ceil(str_word_count(wp_strip_all_tags((string) get_post_field('post_content', $id))) / 220));
    return $mins . ' min read';
}

function mc_category_url(string $name): string {
    return home_url('/category/' . strtolower($name) . '/');
}

/** Article card (ported from ArticleCard.tsx). */
function mc_article_card(WP_Post $p, string $size = 'md'): void {
    $img = get_the_post_thumbnail_url($p, 'large') ?: get_template_directory_uri() . '/assets/images/blog-1.jpg';
    $cat = get_post_meta($p->ID, '_mc_category', true) ?: 'Editorial';
    $ht = $size === 'sm' ? 'text-lg' : 'text-2xl';
    echo '<article class="group"><a href="' . esc_url(get_permalink($p)) . '" class="block">'
        . '<div class="img-zoom aspect-[4/5] mb-5 bg-secondary"><img src="' . esc_url($img) . '" alt="' . esc_attr(get_the_title($p)) . '" loading="lazy" class="w-full h-full object-cover"></div>'
        . '<p class="eyebrow mb-3">' . esc_html($cat) . '</p>'
        . '<h3 class="font-serif ' . $ht . ' leading-tight group-hover:text-accent transition-colors">' . esc_html(get_the_title($p)) . '</h3>'
        . '<p class="mt-3 text-sm text-muted-foreground line-clamp-2">' . esc_html(get_the_excerpt($p)) . '</p>'
        . '</a></article>';
}
