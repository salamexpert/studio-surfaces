import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";
const WEB3FORMS_KEY = "08a169c8-ade7-4981-b8c2-55beed9e2d27";

type Status = "idle" | "sending" | "success" | "error";

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("access_key", WEB3FORMS_KEY);
    data.set("subject", "[Marino Ceramic Tile] Contact Form");
    data.set("from_name", (data.get("name") as string) ?? "Website Visitor");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <SEO
        title="Contact — Reach the Marino Editorial Team"
        description="Get in touch with the Marino Ceramic Tile editorial team about story ideas, project submissions, partnerships or general enquiries. We read everything we receive."
        canonical="/contact"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Contact", item: `${BASE_URL}/contact` },
        ]}
        webPageType="ContactPage"
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

      <PageHero
        eyebrow="Contact"
        title="Write to the editors."
        intro="For story ideas, project submissions, partnerships or general enquiries — we read everything we receive."
      />

      <section className="container-editorial grid md:grid-cols-2 gap-16">
        {status === "success" ? (
          <div className="py-16 space-y-4">
            <p className="eyebrow text-accent">Message received</p>
            <h2 className="display text-3xl">Thank you.</h2>
            <p className="text-muted-foreground leading-relaxed">
              The editors will be in touch. We reply within five working days.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { l: "Name", t: "text", n: "name" },
              { l: "Email", t: "email", n: "email" },
              { l: "Subject", t: "text", n: "subject_field" },
            ].map((f) => (
              <div key={f.n}>
                <label className="eyebrow block mb-2">{f.l}</label>
                <input
                  type={f.t}
                  required
                  name={f.n}
                  disabled={status === "sending"}
                  className="w-full bg-transparent border-b border-border py-3 text-base outline-none focus:border-accent transition-colors disabled:opacity-50"
                />
              </div>
            ))}
            <div>
              <label className="eyebrow block mb-2">Message</label>
              <textarea
                required
                name="message"
                rows={5}
                disabled={status === "sending"}
                className="w-full bg-transparent border-b border-border py-3 text-base outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-destructive">
                Something went wrong — please try again or email us directly at editors@marinoceramictile.com.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-foreground text-background px-8 py-4 text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}

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
              Via Tortona 27<br />20144 Milano, Italy
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
