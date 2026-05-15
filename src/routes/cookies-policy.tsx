import { PageHero } from "@/components/site/PageHero";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function CookiesPolicyPage() {
  return (
    <>
      <SEO
        title="Cookies Policy — Marino Ceramic Tile"
        description="How Marino Ceramic Tile uses cookies and similar tracking technologies when you visit our editorial publication."
        canonical="/cookies-policy"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Cookies Policy", item: `${BASE_URL}/cookies-policy` },
        ]}
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Cookies Policy" }]} />

      <PageHero eyebrow="Legal" title="Cookies Policy" intro="Last updated April 02, 2026." />

      <section className="container-editorial max-w-3xl prose-editorial">
        <h2>What are cookies?</h2>
        <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve efficiency, and to provide information to the website owner.</p>

        <h2>How we use cookies</h2>
        <p>Marino Ceramic Tile uses a minimal set of cookies solely to operate and improve the publication. We do not use advertising or tracking cookies.</p>

        <h3>Essential cookies</h3>
        <p>These cookies are necessary for the website to function and cannot be switched off. They are typically set in response to actions you take — such as setting your privacy preferences or filling in forms. They do not store any personally identifiable information.</p>

        <h3>Analytics cookies</h3>
        <p>We use first-party analytics cookies to understand how visitors interact with our publication — which articles are read, which sections are popular, and how readers navigate between pages. This data is aggregated and anonymous. No individual user is identified.</p>

        <h2>Cookies we do not use</h2>
        <ul>
          <li>Advertising or retargeting cookies</li>
          <li>Third-party social media tracking cookies</li>
          <li>Cross-site tracking or fingerprinting technologies</li>
        </ul>

        <h2>Managing cookies</h2>
        <p>You can control and delete cookies through your browser settings at any time. Disabling cookies will not prevent you from reading our content. Instructions for managing cookies vary by browser — refer to your browser's help documentation for details.</p>

        <h2>Changes to this policy</h2>
        <p>We may update this cookies policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the website after any change constitutes acceptance of the updated policy.</p>

        <h2>Contact</h2>
        <p>If you have any questions about our use of cookies, please write to us at <a href="mailto:editors@marinoceramictile.com" className="text-accent hover:opacity-80 transition-opacity">editors@marinoceramictile.com</a>.</p>
      </section>
    </>
  );
}
