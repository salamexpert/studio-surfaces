<?php if (!defined('ABSPATH')) exit; ?>
</main>
<footer class="mt-32 border-t border-border bg-secondary/40">
  <div class="container-editorial py-16 grid gap-12 md:grid-cols-4">
    <div class="md:col-span-2">
      <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="Marino Ceramic Tile — Home"><?php echo mc_logo(34); ?></a>
      <p class="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">An independent editorial publication exploring the surfaces, materials and architecture shaping the way we live. Published from a small studio that still believes a great room begins with a great floor.</p>
      <form class="mt-6 flex w-full max-w-sm items-center gap-2 border-b border-border pb-2" action="<?php echo esc_url(home_url('/contact/')); ?>" method="get">
        <input type="email" name="email" required placeholder="your@email.com" class="flex-1 bg-transparent text-sm py-2 outline-none placeholder:text-muted-foreground">
        <button class="text-xs uppercase tracking-widest text-accent hover:opacity-70" type="submit">Subscribe</button>
      </form>
    </div>
    <div>
      <h4 class="eyebrow mb-4">Sections</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="<?php echo esc_url(home_url('/surfaces/')); ?>" class="hover:text-accent">Surfaces</a></li>
        <li><a href="<?php echo esc_url(home_url('/architecture/')); ?>" class="hover:text-accent">Architecture</a></li>
        <li><a href="<?php echo esc_url(home_url('/blog/')); ?>" class="hover:text-accent">Blog</a></li>
        <li><a href="<?php echo esc_url(home_url('/about/')); ?>" class="hover:text-accent">About</a></li>
        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="hover:text-accent">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4 class="eyebrow mb-4">Legal</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>" class="hover:text-accent">Privacy Policy</a></li>
        <li><a href="<?php echo esc_url(home_url('/terms-of-service/')); ?>" class="hover:text-accent">Terms of Service</a></li>
        <li><a href="<?php echo esc_url(home_url('/editorial-policy/')); ?>" class="hover:text-accent">Editorial Policy</a></li>
        <li><a href="<?php echo esc_url(home_url('/dmca-disclaimer/')); ?>" class="hover:text-accent">DMCA Disclaimer</a></li>
        <li><a href="<?php echo esc_url(home_url('/legal-disclaimer/')); ?>" class="hover:text-accent">Legal Disclaimer</a></li>
        <li><a href="<?php echo esc_url(home_url('/cookies-policy/')); ?>" class="hover:text-accent">Cookies Policy</a></li>
        <li><a href="<?php echo esc_url(home_url('/advertise/')); ?>" class="hover:text-accent">Advertise</a></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-border">
    <div class="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
      <p>© <?php echo esc_html(date('Y')); ?> Marino Ceramic Tile. An editorial publication.</p>
      <div class="flex gap-4">
        <a href="https://instagram.com/marinoceramictile" target="_blank" rel="noopener noreferrer" class="hover:text-accent">Instagram</a>
        <a href="https://twitter.com/marinoceramictile" target="_blank" rel="noopener noreferrer" class="hover:text-accent">Twitter</a>
        <a href="https://facebook.com/marinoceramictile" target="_blank" rel="noopener noreferrer" class="hover:text-accent">Facebook</a>
      </div>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
