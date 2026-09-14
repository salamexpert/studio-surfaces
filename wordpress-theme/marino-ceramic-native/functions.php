<?php
/**
 * Marino Ceramic Tile Native — theme setup.
 * Converted from the original Vite/React (Lovable) build; reuses its compiled Tailwind CSS.
 */
if (!defined('ABSPATH')) exit;

const MC_VERSION       = '1.0.0';
const MC_PUBLIC_ORIGIN = 'https://marinoceramictile.com';

add_action('after_setup_theme', function (): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus(['primary' => 'Primary navigation', 'footer' => 'Footer navigation']);
});

remove_filter('the_content', 'wpautop');

add_action('wp_enqueue_scripts', function (): void {
    $css = get_template_directory() . '/assets/app.css';
    $js  = get_template_directory() . '/assets/site.js';
    wp_enqueue_style('mc-fonts', 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap', [], null);
    wp_enqueue_style('mc-app', get_template_directory_uri() . '/assets/app.css', ['mc-fonts'], is_file($css) ? (string) filemtime($css) : MC_VERSION);
    wp_enqueue_script('mc-site', get_template_directory_uri() . '/assets/site.js', [], is_file($js) ? (string) filemtime($js) : MC_VERSION, true);
});

add_action('wp_head', function (): void {
    echo '<meta name="google-site-verification" content="gISS_qYVRJMpxcM_LKmbD7dEik1nUr1_96roFD1RVVM" />' . "\n";
    echo '<meta name="google-site-verification" content="vF0kf1zZOvRoHI3-0ZiMAXtyZGo_Ow9OaiaHrckbj6c" />' . "\n";
    $icons = get_template_directory_uri() . '/assets/icons/';
    echo '<link rel="icon" href="' . esc_url($icons . 'favicon.ico') . '" sizes="any">' . "\n";
    echo '<link rel="icon" type="image/svg+xml" href="' . esc_url($icons . 'favicon.svg') . '">' . "\n";
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . esc_url($icons . 'favicon-32x32.png') . '">' . "\n";
    echo '<link rel="icon" type="image/png" sizes="16x16" href="' . esc_url($icons . 'favicon-16x16.png') . '">' . "\n";
    echo '<link rel="apple-touch-icon" href="' . esc_url($icons . 'apple-touch-icon.png') . '">' . "\n";
    echo '<link rel="manifest" href="' . esc_url($icons . 'site.webmanifest') . '">' . "\n";
    echo '<meta name="theme-color" content="#9B5434">' . "\n";
    echo '<meta name="msapplication-TileColor" content="#9B5434">' . "\n";
}, 1);

add_action('init', function (): void {
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
});

add_filter('post_link', function (string $url, WP_Post $post): string {
    return $post->post_type === 'post' ? home_url('/blog/' . $post->post_name . '/') : $url;
}, 10, 2);
add_action('init', function (): void {
    add_rewrite_rule('^blog/([^/]+)/?$', 'index.php?name=$matches[1]', 'top');
});
add_action('after_switch_theme', 'flush_rewrite_rules');

add_action('init', function (): void {
    $auth = fn($a, $k, $id) => current_user_can('edit_post', (int) $id);
    foreach (['rank_math_title', 'rank_math_description', 'rank_math_canonical_url', 'rank_math_facebook_image', 'rank_math_twitter_image'] as $k) {
        register_post_meta('post', $k, ['single' => true, 'type' => 'string', 'show_in_rest' => true, 'sanitize_callback' => 'sanitize_text_field', 'auth_callback' => $auth]);
    }
    register_post_meta('post', '_mc_faq', ['single' => true, 'type' => 'string', 'show_in_rest' => true, 'auth_callback' => $auth]);
}, 20);

require get_template_directory() . '/inc/seo.php';
require get_template_directory() . '/inc/template-tags.php';
