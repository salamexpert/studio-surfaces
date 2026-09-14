<?php
if (!defined('ABSPATH')) exit;

function mc_public_href(string $url): string {
    if (function_exists('mc_public_url')) $url = mc_public_url($url);
    return (string) preg_replace('#^(https?://[^/]+)/marinoceramic(?=/|$)#', '$1', $url);
}

function mc_rank_math_active(): bool {
    return defined('RANK_MATH_VERSION') || class_exists('RankMath');
}

function mc_canonical_url(): string {
    if (is_front_page()) return MC_PUBLIC_ORIGIN . '/';
    if (is_singular()) {
        $path = wp_parse_url(get_permalink(get_queried_object_id()), PHP_URL_PATH) ?: '/';
        $path = preg_replace('#^/marinoceramic(?=/|$)#', '', $path);
        return MC_PUBLIC_ORIGIN . trailingslashit($path);
    }
    if (is_home() || (is_post_type_archive() && get_post_type() === 'post')) return MC_PUBLIC_ORIGIN . '/blog/';
    if (is_category() || is_tax() || is_tag()) {
        $path = wp_parse_url(get_term_link(get_queried_object()), PHP_URL_PATH) ?: '/';
        $path = preg_replace('#^/marinoceramic(?=/|$)#', '', $path);
        return MC_PUBLIC_ORIGIN . trailingslashit($path);
    }
    $path = '/' . trim((string) ($GLOBALS['wp']->request ?? ''), '/') . '/';
    $path = preg_replace('#^/marinoceramic(?=/|$)#', '', $path);
    return MC_PUBLIC_ORIGIN . ($path === '//' ? '/' : $path);
}

function mc_meta_description(): string {
    $id = get_queried_object_id();
    if (is_singular()) {
        $custom = get_post_meta($id, 'rank_math_description', true);
        if ($custom) return $custom;
        $ex = get_the_excerpt($id);
        if ($ex) return $ex;
        return wp_trim_words(wp_strip_all_tags((string) get_post_field('post_content', $id)), 28, '');
    }
    if (is_category() || is_tax() || is_tag()) { $d = term_description(); if ($d) return wp_trim_words(wp_strip_all_tags($d), 30, ''); }
    return 'An editorial publication on ceramic surfaces, modern architecture, luxury bathrooms and contemporary interior design.';
}

function mc_social_image(): string {
    $id = get_queried_object_id();
    if (is_singular()) { $img = get_the_post_thumbnail_url($id, 'full'); if ($img) return mc_public_href($img); }
    return MC_PUBLIC_ORIGIN . '/wp-content/themes/marino-ceramic-native/assets/images/home-hero.jpg';
}

add_filter('rank_math/frontend/canonical', fn() => mc_canonical_url(), 99);
add_filter('rank_math/frontend/description', fn() => mc_meta_description(), 99);
add_filter('rank_math/opengraph/facebook/image', fn() => mc_social_image(), 99);
add_filter('rank_math/opengraph/twitter/image', fn() => mc_social_image(), 99);
add_filter('rank_math/json_ld', '__return_empty_array', 999);

add_action('wp_head', function (): void {
    if (mc_rank_math_active()) return;
    $d = mc_meta_description(); $c = mc_canonical_url(); $t = wp_get_document_title(); $img = mc_social_image();
    $type = is_singular('post') ? 'article' : 'website';
    echo "\n<meta name=\"description\" content=\"" . esc_attr($d) . "\">\n";
    echo '<link rel="canonical" href="' . esc_url($c) . '">' . "\n";
    if (is_404() || is_search()) echo '<meta name="robots" content="noindex,follow">' . "\n";
    foreach ([['og:type', $type], ['og:site_name', 'Marino Ceramic Tile'], ['og:title', $t], ['og:description', $d], ['og:url', $c], ['og:image', $img], ['twitter:card', 'summary_large_image'], ['twitter:title', $t], ['twitter:description', $d], ['twitter:image', $img]] as $m) {
        $attr = str_starts_with($m[0], 'og:') ? 'property' : 'name';
        echo '<meta ' . $attr . '="' . esc_attr($m[0]) . '" content="' . esc_attr($m[1]) . '">' . "\n";
    }
}, 2);

add_action('wp_head', function (): void {
    if (!mc_rank_math_active()) return;
    $img = mc_social_image();
    echo '<meta property="og:image" content="' . esc_url($img) . '"><meta name="twitter:image" content="' . esc_url($img) . '">' . "\n";
}, 3);

add_action('wp_head', function (): void {
    if (is_404() || is_search()) return;
    $origin = MC_PUBLIC_ORIGIN; $id = get_queried_object_id(); $canonical = mc_canonical_url();
    $org_id = $origin . '/#organization'; $logo = get_template_directory_uri() . '/assets/icons/favicon-512x512.png'; $image = mc_social_image();
    $graph = [];
    if (is_front_page()) {
        $graph[] = ['@type' => 'Organization', '@id' => $org_id, 'name' => 'Marino Ceramic Tile', 'url' => $origin . '/', 'description' => 'An editorial publication on ceramic surfaces, modern architecture and contemporary interior design.', 'logo' => ['@type' => 'ImageObject', '@id' => $origin . '/#logo', 'url' => $logo, 'contentUrl' => $logo, 'width' => 512, 'height' => 512, 'caption' => 'Marino Ceramic Tile'], 'image' => ['@id' => $origin . '/#logo']];
        $graph[] = ['@type' => 'WebSite', '@id' => $origin . '/#website', 'url' => $origin . '/', 'name' => 'Marino Ceramic Tile', 'publisher' => ['@id' => $org_id], 'inLanguage' => 'en-US', 'potentialAction' => ['@type' => 'SearchAction', 'target' => ['@type' => 'EntryPoint', 'urlTemplate' => $origin . '/blog/?q={search_term_string}'], 'query-input' => 'required name=search_term_string']];
    } elseif (is_singular('post')) {
        $graph[] = ['@type' => 'Article', '@id' => $canonical . '#article', 'url' => $canonical, 'headline' => get_the_title($id), 'description' => mc_meta_description(), 'image' => $image, 'datePublished' => get_post_time('c', true, $id), 'dateModified' => get_post_modified_time('c', true, $id), 'author' => ['@type' => 'Organization', 'name' => 'Marino Ceramic Tile', 'url' => $origin . '/about/'], 'publisher' => ['@type' => 'Organization', 'name' => 'Marino Ceramic Tile', 'url' => $origin . '/', 'logo' => ['@type' => 'ImageObject', 'url' => $logo, 'width' => 512, 'height' => 512]], 'mainEntityOfPage' => ['@id' => $canonical], 'inLanguage' => 'en-US'];
        $graph[] = mc_breadcrumb_graph($canonical, [['Blog', $origin . '/blog/'], [get_the_title($id), $canonical]]);
        $faq = mc_post_faq($id);
        if ($faq) $graph[] = ['@type' => 'FAQPage', '@id' => $canonical . '#faq', 'mainEntity' => array_map(fn($f) => ['@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]]], $faq)];
    } elseif (is_singular()) {
        $graph[] = ['@type' => 'WebPage', '@id' => $canonical . '#webpage', 'url' => $canonical, 'name' => get_the_title($id), 'description' => mc_meta_description(), 'isPartOf' => ['@id' => $origin . '/#website'], 'inLanguage' => 'en-US'];
        $graph[] = mc_breadcrumb_graph($canonical, [[get_the_title($id), $canonical]]);
    } elseif (is_category() || is_tax() || is_tag()) {
        $graph[] = ['@type' => 'CollectionPage', '@id' => $canonical . '#webpage', 'url' => $canonical, 'name' => single_term_title('', false), 'description' => mc_meta_description(), 'isPartOf' => ['@id' => $origin . '/#website']];
    } else {
        $graph[] = ['@type' => 'WebPage', '@id' => $canonical . '#webpage', 'url' => $canonical, 'name' => wp_get_document_title(), 'description' => mc_meta_description(), 'isPartOf' => ['@id' => $origin . '/#website']];
    }
    echo '<script type="application/ld+json">' . wp_json_encode(['@context' => 'https://schema.org', '@graph' => $graph], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}, 30);

function mc_breadcrumb_graph(string $canonical, array $trail): array {
    $items = [['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => MC_PUBLIC_ORIGIN . '/']];
    foreach ($trail as $i => $t) $items[] = ['@type' => 'ListItem', 'position' => $i + 2, 'name' => $t[0], 'item' => $t[1]];
    return ['@type' => 'BreadcrumbList', '@id' => $canonical . '#breadcrumb', 'itemListElement' => $items];
}

add_filter('robots_txt', function (string $out): string {
    return "User-agent: *\nAllow: /\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nUser-agent: GPTBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: " . MC_PUBLIC_ORIGIN . "/sitemap.xml\n";
}, 99);

add_action('template_redirect', function (): void {
    $path = (string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if (!preg_match('#/sitemap(_index)?\.xml$#', $path)) return;
    $conv = fn($u) => mc_public_href($u);
    $items = get_posts(['post_type' => ['page', 'post'], 'post_status' => 'publish', 'posts_per_page' => -1, 'orderby' => 'modified', 'order' => 'DESC', 'no_found_rows' => true]);
    $front = (int) get_option('page_on_front');
    if (!headers_sent()) { status_header(200); header('Content-Type: application/xml; charset=UTF-8'); header('X-Robots-Tag: noindex', true); }
    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    echo '<url><loc>' . esc_url($conv(home_url('/'))) . '</loc><priority>1.0</priority></url>' . "\n";
    foreach ($items as $p) {
        if ((int) $p->ID === $front) continue;
        echo '<url><loc>' . esc_url($conv(get_permalink($p))) . '</loc><lastmod>' . esc_html(get_post_modified_time('c', true, $p)) . '</lastmod><priority>' . ($p->post_type === 'post' ? '0.8' : '0.6') . '</priority></url>' . "\n";
    }
    foreach (get_categories(['hide_empty' => true]) as $cat) echo '<url><loc>' . esc_url($conv(get_term_link($cat))) . '</loc><priority>0.5</priority></url>' . "\n";
    echo '</urlset>';
    exit;
}, 0);
