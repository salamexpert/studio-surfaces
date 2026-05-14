import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Marino Ceramic Tile" },
      { name: "description", content: "Get in touch with the Marino editorial team about story ideas, project submissions or general enquiries." },
      { property: "og:title", content: "Contact — Marino Ceramic Tile" },
      { property: "og:description", content: "Reach our editorial team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the editors."
        intro="For story ideas, project submissions, partnerships or general enquiries — we read everything we receive."
      />
      <section className="container-editorial grid md:grid-cols-2 gap-16">
        <form onSubmit={(e) => { e.preventDefault(); alert("Thank you. The editors will be in touch."); }} className="space-y-6">
          {[
            { l: "Name", t: "text", n: "name" },
            { l: "Email", t: "email", n: "email" },
            { l: "Subject", t: "text", n: "subject" },
          ].map((f) => (
            <div key={f.n}>
              <label className="eyebrow block mb-2">{f.l}</label>
              <input type={f.t} required name={f.n} className="w-full bg-transparent border-b border-border py-3 text-base outline-none focus:border-accent transition-colors" />
            </div>
          ))}
          <div>
            <label className="eyebrow block mb-2">Message</label>
            <textarea required rows={5} className="w-full bg-transparent border-b border-border py-3 text-base outline-none focus:border-accent transition-colors resize-none" />
          </div>
          <button className="bg-foreground text-background px-8 py-4 text-xs uppercase tracking-widest hover:bg-accent transition-colors">
            Send message
          </button>
        </form>

        <aside className="space-y-10">
          <div>
            <p className="eyebrow mb-3">Editorial</p>
            <p className="font-serif text-2xl">editors@marinoceramictile.com</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Submissions</p>
            <p className="font-serif text-2xl">submit@marinoceramictile.com</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Partnerships & advertising</p>
            <p className="font-serif text-2xl">partnerships@marinoceramictile.com</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Studio</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Via Tortona 27<br/>20144 Milano, Italy
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
