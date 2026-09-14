<?php
/**
 * Marino Ceramic Tile content seeder.
 *   wp eval-file wp-content/themes/marino-ceramic-native/tools/import-marino.php --url=cms.americancarshipping.com/marinoceramic
 * Idempotent: upserts pages/posts by slug, sideloads featured images once (local + remote), assigns
 * categories, sets front page. Reads tools/posts.json + tools/legal.json.
 */
if (!defined('WP_CLI') || !WP_CLI) { fwrite(STDERR, "Run via: wp eval-file <this-file> --url=<subsite>\n"); exit(1); }

require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

$THEME_DIR = get_stylesheet_directory();
$IMG_DIR   = $THEME_DIR . '/assets/images/';

function mc_sideload_local(string $filename, string $dir, int $parent = 0): int {
    $filename = basename($filename);
    $ex = get_posts(['post_type' => 'attachment', 'post_status' => 'inherit', 'meta_key' => '_mc_src', 'meta_value' => $filename, 'numberposts' => 1, 'fields' => 'ids']);
    if ($ex) return (int) $ex[0];
    $src = $dir . $filename;
    if (!file_exists($src)) { WP_CLI::warning("missing local image: $filename"); return 0; }
    $tmp = wp_tempnam($filename); copy($src, $tmp);
    $id = media_handle_sideload(['name' => $filename, 'tmp_name' => $tmp], $parent);
    if (is_wp_error($id)) { @unlink($tmp); WP_CLI::warning("sideload failed: $filename — " . $id->get_error_message()); return 0; }
    update_post_meta($id, '_mc_src', $filename);
    return (int) $id;
}

function mc_sideload_remote(string $url, int $parent = 0): int {
    $key = 'u_' . md5($url);
    $ex = get_posts(['post_type' => 'attachment', 'post_status' => 'inherit', 'meta_key' => '_mc_src', 'meta_value' => $key, 'numberposts' => 1, 'fields' => 'ids']);
    if ($ex) return (int) $ex[0];
    $tmp = download_url($url, 60);
    if (is_wp_error($tmp)) { WP_CLI::warning("download failed: $url — " . $tmp->get_error_message()); return 0; }
    $att = media_handle_sideload(['name' => 'cover-' . substr(md5($url), 0, 12) . '.jpg', 'tmp_name' => $tmp], $parent);
    if (is_wp_error($att)) { @unlink($tmp); WP_CLI::warning("remote sideload failed: $url — " . $att->get_error_message()); return 0; }
    update_post_meta((int) $att, '_mc_src', $key);
    return (int) $att;
}

function mc_upsert(array $args): int {
    $existing = get_page_by_path($args['post_name'], OBJECT, $args['post_type']);
    if ($existing) $args['ID'] = $existing->ID;
    $id = wp_insert_post($args, true);
    if (is_wp_error($id)) WP_CLI::error('upsert failed for ' . $args['post_name'] . ': ' . $id->get_error_message());
    return (int) $id;
}

function mc_seo(int $id, string $title, string $desc, bool $noindex = false): void {
    update_post_meta($id, 'rank_math_title', $title);
    update_post_meta($id, 'rank_math_description', $desc);
    update_post_meta($id, 'rank_math_robots', $noindex ? ['noindex'] : ['index']);
}

/* ---------------- PAGES ---------------- */
$about = <<<'HTML'
<p>Marino Ceramic Tile is an independent editorial publication on ceramic surfaces, modern architecture and the materials shaping contemporary residential design.</p>
<h2>What we do</h2>
<p>We write long-form, considered editorial about the surfaces and spaces shaping contemporary residential design. We do not sell tile. We do not represent manufacturers. Our only loyalty is to the rooms we admire and to the readers who share that loyalty.</p>
<h2>How we work</h2>
<p>Each week we publish a featured essay, a material study and a short architectural notebook entry. Our writers visit every project in person where possible. Our material recommendations come from working specifications used by practising architects and interior designers — not from press releases.</p>
<h2>Who we are</h2>
<p>A small editorial team based across Milan, Brooklyn and Lisbon. Our editor in chief, Elena Marchetti, is a former practising architect. Our writers come from architecture, interior design and editorial backgrounds.</p>
HTML;

$advertise = <<<'HTML'
<p>Marino Ceramic Tile accepts a small number of editorial partners each season. Sponsored content, when it appears, is clearly labelled and editorially independent.</p>
<h2>Our readers</h2>
<p>Practising architects, interior designers, specifiers, developers, gallery owners and homeowners actively renovating in the premium and luxury segments. Concentrated in Europe, North America and the Asia-Pacific.</p>
<h2>Our standards</h2>
<p>We accept a small number of partners each season. All sponsored content is editorially independent and visibly disclosed. We do not run banner advertising.</p>
<h2>Get in touch</h2>
<p>For partnership enquiries, write to <a href="mailto:partnerships@marinoceramictile.com">partnerships@marinoceramictile.com</a>, or use our <a href="/contact/">contact page</a>.</p>
HTML;

$contact = <<<'HTML'
<p>Story tips, corrections, image rights and partnership enquiries alike — write to the Marino editorial desk using the form below.</p>
<form action="https://api.web3forms.com/submit" method="POST" class="mt-8 space-y-6">
<input type="hidden" name="access_key" value="08a169c8-ade7-4981-b8c2-55beed9e2d27">
<input type="hidden" name="subject" value="[marinoceramictile.com] Contact Form">
<input type="hidden" name="from_name" value="Marino Ceramic Tile Website">
<input type="checkbox" name="botcheck" style="display:none" aria-hidden="true">
<div class="grid gap-6 md:grid-cols-2">
<label class="block"><span class="eyebrow">Name</span><input type="text" name="name" required class="mt-2 w-full border-b border-border bg-transparent pb-2 outline-none focus:border-accent"></label>
<label class="block"><span class="eyebrow">Email</span><input type="email" name="email" required class="mt-2 w-full border-b border-border bg-transparent pb-2 outline-none focus:border-accent"></label>
</div>
<label class="block"><span class="eyebrow">Message</span><textarea name="message" required rows="6" class="mt-2 w-full border-b border-border bg-transparent pb-2 outline-none focus:border-accent"></textarea></label>
<button type="submit" class="border border-foreground px-6 py-3 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">Send message</button>
</form>
<p class="mt-8 text-sm text-muted-foreground">Or write to editors@marinoceramictile.com.</p>
HTML;

$pages = [
    ['slug' => 'home', 'title' => 'Marino Ceramic Tile', 'eyebrow' => '', 'noindex' => false,
     'meta_title' => 'Marino Ceramic Tile — Modern Architecture & Surface Design',
     'meta_desc' => 'An editorial publication on ceramic surfaces, modern architecture, luxury bathrooms and contemporary interior design. New stories every week.',
     'content' => '<p>An editorial publication on ceramic surfaces, modern architecture and contemporary interior design.</p>'],
    ['slug' => 'blog', 'title' => 'The Archive', 'eyebrow' => '', 'noindex' => false,
     'meta_title' => 'The Archive — Every Story | Marino Ceramic Tile',
     'meta_desc' => 'Ceramic surfaces, modern architecture, luxury bathrooms and the materials shaping contemporary interiors.',
     'content' => '<p>Every story, filed.</p>'],
    ['slug' => 'surfaces', 'title' => 'Surface design, considered.', 'eyebrow' => 'Pillar — Surfaces', 'noindex' => false,
     'meta_title' => 'Surfaces — Ceramic, Stone & Modern Tile Design | Marino',
     'meta_desc' => 'An editorial guide to ceramic tile trends, bathroom inspiration, kitchen surfaces, minimalist textures and luxury flooring shaping interior design in 2026.',
     'content' => '<p>A working library of the ceramics, stones and finishes shaping contemporary interiors.</p>'],
    ['slug' => 'architecture', 'title' => 'Architecture, slowly.', 'eyebrow' => 'Pillar — Architecture', 'noindex' => false,
     'meta_title' => 'Architecture — Modern Homes & Interior Design | Marino',
     'meta_desc' => 'Editorial coverage of modern homes, luxury bathrooms, architectural lighting, Scandinavian design and the spaces shaping how we live in 2026.',
     'content' => '<p>The houses, lofts, retreats and small studios we keep returning to.</p>'],
    ['slug' => 'about', 'title' => 'About the Publication', 'eyebrow' => 'About', 'noindex' => false,
     'meta_title' => 'About — Marino Ceramic Tile',
     'meta_desc' => 'Marino Ceramic Tile is an independent editorial publication on ceramic surfaces, modern architecture and contemporary interior design.',
     'content' => $about],
    ['slug' => 'advertise', 'title' => 'Advertise', 'eyebrow' => 'Partnerships', 'noindex' => false,
     'meta_title' => 'Advertise & Partnerships — Marino Ceramic Tile',
     'meta_desc' => 'Editorial partnership opportunities with Marino Ceramic Tile. Limited seasonal sponsorships, editorially independent and clearly disclosed.',
     'content' => $advertise],
    ['slug' => 'contact', 'title' => 'Contact', 'eyebrow' => 'Get in touch', 'noindex' => false,
     'meta_title' => 'Contact — Marino Ceramic Tile',
     'meta_desc' => 'Write to the Marino Ceramic Tile editorial desk — story tips, corrections, image rights and partnership enquiries.',
     'content' => $contact],
];

$legal = json_decode((string) file_get_contents($THEME_DIR . '/tools/legal.json'), true) ?: [];

$front_id = 0;
foreach ($pages as $pg) {
    $id = mc_upsert(['post_type' => 'page', 'post_status' => 'publish', 'post_name' => $pg['slug'], 'post_title' => $pg['title'], 'post_content' => $pg['content']]);
    mc_seo($id, $pg['meta_title'], $pg['meta_desc'], !empty($pg['noindex']));
    if (!empty($pg['eyebrow'])) update_post_meta($id, '_mc_eyebrow', $pg['eyebrow']);
    if ($pg['slug'] === 'home') $front_id = $id;
    WP_CLI::log("page: /{$pg['slug']}/  (#$id)");
}
foreach ($legal as $slug => $lp) {
    $id = mc_upsert(['post_type' => 'page', 'post_status' => 'publish', 'post_name' => $slug, 'post_title' => $lp['title'], 'post_content' => $lp['content']]);
    mc_seo($id, $lp['title'] . ' — Marino Ceramic Tile', $lp['intro'] ?: ($lp['title'] . ' for Marino Ceramic Tile.'), in_array($slug, ['privacy-policy', 'terms-of-service', 'cookies-policy'], true));
    update_post_meta($id, '_mc_eyebrow', 'Legal');
    WP_CLI::log("page: /{$slug}/  (#$id)");
}
if ($front_id) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $front_id);
    update_option('page_for_posts', 0);
}

/* ---------------- POSTS ---------------- */
$posts = json_decode((string) file_get_contents($THEME_DIR . '/tools/posts.json'), true);
if (!is_array($posts)) WP_CLI::error('could not read posts.json');
$author = get_users(['role' => 'administrator', 'number' => 1, 'fields' => 'ID']);
$author_id = $author ? (int) $author[0] : 1;

$n = 0;
foreach ($posts as $i => $p) {
    $slug = sanitize_title($p['slug']);
    $existed = get_page_by_path($slug, OBJECT, 'post') !== null;
    $args = [
        'post_type' => 'post', 'post_status' => 'publish', 'post_name' => $slug,
        'post_title' => $p['title'], 'post_content' => (string) $p['content'],
        'post_excerpt' => $p['excerpt'] ?? '', 'post_author' => $author_id, 'menu_order' => $i,
    ];
    if (!$existed) {
        $ts = strtotime(($p['date'] ?? '') . ' 09:00:00'); $now = current_time('timestamp');
        if (!$ts || $ts > $now) $ts = $now;
        $args['post_date'] = date('Y-m-d H:i:s', $ts);
        $args['post_date_gmt'] = get_gmt_from_date($args['post_date']);
    }
    $id = mc_upsert($args);
    if (!$existed) {
        mc_seo($id, ($p['seoTitle'] ?: $p['title']) . ' — Marino Ceramic Tile', $p['excerpt'] ?? '');
        if (!empty($p['faqs'])) update_post_meta($id, '_mc_faq', wp_json_encode($p['faqs']));
    }
    update_post_meta($id, '_mc_category', $p['category'] ?? '');
    update_post_meta($id, '_mc_author', $p['author'] ?? 'Marino Ceramic Tile');
    if (!empty($p['category'])) {
        $term = term_exists($p['category'], 'category') ?: wp_insert_term($p['category'], 'category');
        if (!is_wp_error($term)) wp_set_post_terms($id, [(int) (is_array($term) ? $term['term_id'] : $term)], 'category');
    }
    if (!get_post_thumbnail_id($id) && !empty($p['cover'])) {
        $att = preg_match('#^https?://#', $p['cover']) ? mc_sideload_remote($p['cover'], $id) : mc_sideload_local($p['cover'], $IMG_DIR, $id);
        if ($att) set_post_thumbnail($id, $att);
    }
    $n++;
}

WP_CLI::success("Imported " . (count($pages) + count($legal)) . " pages + $n posts. Front page #$front_id.");
WP_CLI::log("Now run: wp eval 'flush_rewrite_rules(true);'");
