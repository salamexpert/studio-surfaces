<?php
if (!defined('ABSPATH')) exit;
get_header(); ?>
<section class="container-editorial max-w-2xl py-32 text-center">
  <p class="eyebrow text-accent">404</p>
  <h1 class="display text-5xl md:text-6xl mt-4 italic">Page not found.</h1>
  <p class="mt-6 text-muted-foreground">The page you were looking for has moved or never existed.</p>
  <a href="<?php echo esc_url(home_url('/blog/')); ?>" class="mt-8 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-widest hover:text-accent hover:border-accent">Back to the archive →</a>
</section>
<?php get_footer();
