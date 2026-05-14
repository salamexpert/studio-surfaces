export function Newsletter() {
  return (
    <section className="container-editorial my-24">
      <div className="bg-foreground text-background px-8 md:px-16 py-16 md:py-24 text-center">
        <p className="eyebrow text-accent">The Marino Dispatch</p>
        <h2 className="display text-4xl md:text-6xl mt-5 max-w-3xl mx-auto text-background">
          The week's most considered surfaces, delivered Sunday morning.
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 bg-transparent border border-background/30 px-5 py-4 text-sm text-background placeholder:text-background/50 outline-none focus:border-accent transition-colors"
          />
          <button className="bg-accent text-accent-foreground px-8 py-4 text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-xs text-background/60">Free. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
