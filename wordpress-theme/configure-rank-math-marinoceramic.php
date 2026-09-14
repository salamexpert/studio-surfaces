<?php
/** One-time WP-CLI Rank Math config. TOKENS: Marino Ceramic Tile Modern Architecture & Surface Design marinoceramictile.com marino-ceramic-native
 *  Run: wp eval-file configure-rank-math-marinoceramic.php --url=cms.americancarshipping.com/marinoceramic */
use RankMath\Helper;
if (!defined('WP_CLI') || !WP_CLI) { fwrite(STDERR, "WP-CLI required.\n"); exit(1); }
if (!class_exists('RankMath\\Helper')) WP_CLI::error('Rank Math is not active.');

update_option('blogname', 'Marino Ceramic Tile');
update_option('blogdescription', 'Modern Architecture & Surface Design');

Helper::update_modules([
    'sitemap'=>'off', 'rich-snippet'=>'on', 'redirections'=>'on', '404-monitor'=>'on',
    'link-counter'=>'on', 'seo-analysis'=>'on', 'analytics'=>'off', 'woocommerce'=>'off',
    'buddypress'=>'off', 'bbpress'=>'off', 'acf'=>'off', 'web-stories'=>'off',
    'content-ai'=>'off', 'instant-indexing'=>'off', 'ai-visibility'=>'off', 'local-seo'=>'off',
]);

$logo = 'https://marinoceramictile.com/wp-content/themes/marino-ceramic-native/assets/icons/favicon-512x512.png';
$og   = 'https://marinoceramictile.com/wp-content/themes/marino-ceramic-native/assets/images/home-hero.jpg';

$all = rank_math()->settings->all_raw();
$general = array_merge($all['general'] ?? [], [
    'attachment_redirect_urls'=>'on', 'nofollow_external_links'=>'off', 'new_window_external_links'=>'off',
    'strip_category_base'=>'off', 'breadcrumbs'=>'off', '404_monitor_mode'=>'simple', 'redirections_debug'=>'off',
]);
$titles = array_merge($all['titles'] ?? [], [
    'separator_character'=>'-', 'website_name'=>'Marino Ceramic Tile', 'website_alternate_name'=>'Marino Ceramic Tile',
    'knowledgegraph_type'=>'organization', 'knowledgegraph_name'=>'Marino Ceramic Tile', 'knowledgegraph_logo'=>$logo,
    'open_graph_image'=>$og, 'homepage_title'=>'Marino Ceramic Tile %sep% Modern Architecture & Surface Design',
    'pt_post_title'=>'%title% %sep% %sitename%', 'pt_post_description'=>'%excerpt%', 'pt_post_add_meta_box'=>'on',
    'pt_page_title'=>'%title% %sep% %sitename%', 'pt_page_description'=>'%excerpt%', 'pt_page_add_meta_box'=>'on',
    'author_archive'=>'off', 'date_archive'=>'off', 'noindex_empty_taxonomies'=>'on',
]);
$sitemap = array_merge($all['sitemap'] ?? [], ['items_per_page'=>1000, 'include_images'=>'on', 'include_featured_image'=>'on']);
Helper::update_all_settings($general, $titles, $sitemap);
update_option('rank_math_registration_skip', '1');
delete_transient('rank_math_sitemap_cache');
flush_rewrite_rules(true);
WP_CLI::success('Rank Math configured for Marino Ceramic Tile.');
