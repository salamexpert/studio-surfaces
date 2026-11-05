# Marino WordPress deployment

Production is WordPress, using the block theme in `wordpress-theme/marino-ceramic-fse`.
Edit content in WordPress. Original React source is historical reference only.

Deployment is manual through Actions > Deploy WordPress theme only. It requires an existing authorized VPS SSH key in repository secrets; this migration does not replace keys. The script validates the host, domain and active theme, stages only theme files, retains the previous theme, and rolls back if health checks fail. It never imports content or replaces routing, configuration, uploads or plugins.

Do not deploy `dist` into the WordPress root. The scheduled React article generator is retired. WordPress editor changes remain in the database and are not overwritten by theme-only deployment.
