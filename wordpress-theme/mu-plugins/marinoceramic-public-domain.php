<?php
/**
 * Plugin Name: Marino Ceramic Tile Public Domain Routing
 * Description: Maps cms.americancarshipping.com/marinoceramic (blog_id 13) to the public origin
 *   https://marinoceramictile.com behind the Apache reverse proxy — rewrites every asset/permalink/Rank Math/REST/
 *   sitemap URL, serves canonical sitemap + robots, and 301-canonicalises host/HTTPS. Scoped via header.
 *
 * TOKENS: marinoceramic marinoceramictile.com mc 13
 * Add React <Navigate> redirects to the $legacy map in the last block (e.g. '/truheart' => '/blog/...').
 */
if (!defined('ABSPATH')) exit;

function mc_is_public_domain_request(): bool {
    return ($_SERVER['HTTP_X_REVIVEWP_PUBLIC'] ?? '') === 'marinoceramic';
}

function mc_public_url(string $url): string {
    $url = str_replace(
        ['https://cms.americancarshipping.com/marinoceramic', '//cms.americancarshipping.com/marinoceramic'],
        ['https://marinoceramictile.com', '//marinoceramictile.com'],
        $url
    );
    return str_replace(
        ['https://marinoceramictile.com/marinoceramic/wp-content', '//marinoceramictile.com/marinoceramic/wp-content', '/marinoceramic/wp-content'],
        ['https://marinoceramictile.com/wp-content', '//marinoceramictile.com/wp-content', '/wp-content'],
        $url
    );
}

if (mc_is_public_domain_request()) {
    foreach (['content_url','plugins_url','theme_file_uri','stylesheet_directory_uri','template_directory_uri','wp_get_attachment_url','site_url','admin_url','rest_url','includes_url'] as $f) {
        add_filter($f, 'mc_public_url', 99);
    }
    add_filter('the_content', 'mc_public_url', 99);
    foreach (['script_loader_src','style_loader_src'] as $f) add_filter($f, 'mc_public_url', 99);
    add_filter('rank_math/404_monitor/hook', fn (string $h): string => 'wp', 1);
    foreach (['rank_math/frontend/canonical','rank_math/opengraph/url','rank_math/opengraph/facebook/og_url','rank_math/json_ld/search_url'] as $f) {
        add_filter($f, 'mc_public_url', 99);
    }
    add_filter('rank_math/json_ld', function (array $d): array { array_walk_recursive($d, function (&$v) { if (is_string($v)) $v = mc_public_url($v); }); return $d; }, 99);
    add_filter('rank_math/sitemap/enable_caching', '__return_false');
    foreach (['rank_math/sitemap/index/entry','rank_math/sitemap/entry'] as $f) {
        add_filter($f, function (array $e): array { array_walk_recursive($e, function (&$v) { if (is_string($v)) $v = mc_public_url($v); }); return $e; }, 99);
    }
    foreach (['1','post','page','category','author'] as $t) add_filter("rank_math/sitemap/{$t}_stylesheet_url", 'mc_public_url', 99);
    foreach (['post','page'] as $rt) {
        add_filter("rest_prepare_{$rt}", function ($r) { if (is_object($r) && method_exists($r,'get_data')) { $d=$r->get_data(); if (!empty($d['link'])) { $d['link']=mc_public_url($d['link']); $r->set_data($d);} } return $r; }, 99);
    }
}

// Canonical robots.txt + sitemap.xml on the public origin.
add_action('template_redirect', function (): void {
    if (!mc_is_public_domain_request()) return;
    $p = (string) (parse_url((string) ($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH) ?: '/');
    $p = (string) preg_replace('#^/marinoceramic(?=/|$)#', '', $p);
    if ($p === '/robots.txt') { status_header(200); header('Content-Type: text/plain; charset=UTF-8'); echo "User-agent: *\nAllow: /\n\nSitemap: https://marinoceramictile.com/sitemap.xml\n"; exit; }
    if ($p === '/sitemap.xml') {
        status_header(200); header('Content-Type: application/xml; charset=UTF-8');
        $items = get_posts(['post_type'=>['page','post'],'post_status'=>'publish','posts_per_page'=>-1,'orderby'=>'modified','order'=>'DESC']);
        echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
        foreach ($items as $it) {
            $loc = (int) get_option('page_on_front') === $it->ID ? 'https://marinoceramictile.com/' : mc_public_url(get_permalink($it));
            echo '<url><loc>'.esc_url($loc).'</loc><lastmod>'.esc_html(get_post_modified_time('c', true, $it)).'</lastmod>';
            $img = get_the_post_thumbnail_url($it, 'full'); if ($img) echo '<image:image><image:loc>'.esc_url(mc_public_url($img)).'</image:loc></image:image>';
            echo '</url>';
        }
        echo '</urlset>'; exit;
    }
}, -100);

// Whole-response rewrite + canonical host/HTTPS 301 (+ React <Navigate> redirects).
add_action('template_redirect', function (): void {
    if (is_admin() || wp_doing_cron() || (defined('WP_CLI') && WP_CLI)) return;
    $is_public = mc_is_public_domain_request();
    if ($is_public) {
        ob_start('mc_public_url');
        if (!str_contains($_SERVER['REQUEST_URI'] ?? '', 'sitemap')) {
            add_filter('home_url', function (string $u, string $path = '', ?string $s = null, ?int $b = null): string { $base='https://marinoceramictile.com'; return $path===''?$base:$base.'/'.ltrim($path,'/'); }, 1, 4);
        }
    }
    $host = strtolower((string)($_SERVER['HTTP_HOST'] ?? ''));
    $uri = (string)($_SERVER['REQUEST_URI'] ?? '/');
    $path = (string)(parse_url($uri, PHP_URL_PATH) ?: '/');
    if ($is_public) { $path = (string) preg_replace('#^/marinoceramic(?=/|$)#', '', $path); if ($path==='') $path='/'; }
    $query = (string)(parse_url($uri, PHP_URL_QUERY) ?: '');
    $legacy = [
        // '/truheart' => '/blog/what-is-bpc-157-and-how-does-it-work/',   // add React <Navigate> paths here
    ];
    $lookup = rtrim($path,'/') ?: '/';
    $target = $legacy[$lookup] ?? $path;
    $is_file = (bool) preg_match('#/[^/]+\.[a-z0-9]{2,5}$#i',$target);
    if (!$is_file && $target !== '/' && !str_ends_with($target,'/')) $target .= '/';
    $canonical = 'https://marinoceramictile.com'.$target.($query && !isset($legacy[$lookup]) ? '?'.$query : '');
    $scheme = is_ssl() ? 'https' : 'http';
    $current = $is_public ? 'https://marinoceramictile.com'.$path.($query?'?'.$query:'') : $scheme.'://'.$host.$uri;
    if (($is_public || in_array($host,['marinoceramictile.com','www.marinoceramictile.com'],true)) && $current !== $canonical) { wp_redirect($canonical,301,'Marino Ceramic Tile canonical routing'); exit; }
}, 0);

add_filter('wp_robots', function (array $r): array { if (is_404() || is_search()) { $r['noindex']=true; $r['follow']=true; } return $r; });
