<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class('bg-background text-foreground'); ?>>
<?php wp_body_open(); ?>
<header class="sticky top-0 z-50 border-b border-white/10 bg-[#1C1712]/95 backdrop-blur-md">
  <div class="container-editorial flex items-center justify-between h-16 md:h-20">
    <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="Marino Ceramic Tile — Home"><?php echo mc_logo(32, '#F5EFE7', '#C07650'); ?></a>
    <nav class="hidden md:flex items-center gap-9">
      <?php foreach (mc_primary_nav() as $l): ?>
        <a href="<?php echo esc_url(home_url($l[0])); ?>" class="text-[13px] tracking-wide uppercase text-white/80 hover:text-white transition-colors"><?php echo esc_html($l[1]); ?></a>
      <?php endforeach; ?>
    </nav>
    <button class="md:hidden p-2 -mr-2 text-white/80 hover:text-white" aria-label="Open navigation menu" aria-expanded="false" data-mc-toggle>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
  <nav class="md:hidden border-t border-white/10 bg-[#1C1712] px-6 py-4 space-y-1" data-mc-mobile hidden>
    <?php foreach (mc_primary_nav() as $l): ?>
      <a href="<?php echo esc_url(home_url($l[0])); ?>" class="block py-2 text-sm uppercase tracking-wide text-white/80 hover:text-white"><?php echo esc_html($l[1]); ?></a>
    <?php endforeach; ?>
  </nav>
</header>
<main>
