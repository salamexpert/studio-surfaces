import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/PageHero";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function DmcaPage() {
  return (
    <>
      <SEO
        title="DMCA Disclaimer — Copyright Policy | Marino Ceramic Tile"
        description="DMCA copyright infringement notice procedure for Marino Ceramic Tile. How to file a takedown notice or counter-notice for content on our editorial publication."
        canonical="/dmca-disclaimer"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "DMCA Disclaimer", item: `${BASE_URL}/dmca-disclaimer` },
        ]}
      />

      <PageHero eyebrow="Legal" title="DMCA Disclaimer" intro="Procedure for copyright infringement notices." />

      <section className="container-editorial max-w-3xl prose-editorial">

        <p>Marino Ceramic Tile respects the intellectual property rights of others and asks our readers to do the same.</p>

        <h2>Filing a notice</h2>
        <p>If you believe content on our site infringes your copyright, please send a written notice to editors@marinoceramictile.com containing:</p>
        <ul>
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The URL of the infringing material on our site</li>
          <li>Your contact information</li>
          <li>A statement that you have a good-faith belief that the use is unauthorised</li>
          <li>A statement, made under penalty of perjury, that the above is accurate and that you are the rights holder or authorised to act on their behalf</li>
        </ul>

        <h2>Counter notice</h2>
        <p>If you believe content of yours was removed in error, you may file a counter notice using the same address. We will review counter notices in good faith.</p>

        <hr />

        <h2>DMCA / IP Complaint Section</h2>

        <h3>Intellectual Property Complaints:</h3>

        <p>
          If you believe that any content on this website violates your copyright, trademark, or
          other intellectual property rights, please send a detailed notice to:
        </p>

        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:legal@marinoceramictile.com" className="text-accent hover:opacity-80 transition-opacity">
            legal@marinoceramictile.com
          </a>
        </p>

        <p>Your notice should include:</p>

        <ul>
          <li>Your full name and contact information</li>
          <li>Proof of ownership or authorization</li>
          <li>Exact URL(s) of the allegedly infringing material</li>
          <li>A statement made in good faith regarding your claim</li>
        </ul>

        <p>
          We will investigate all legitimate complaints and take appropriate action promptly.
        </p>

        <p>
          You may also reach us directly through our{" "}
          <Link to="/contact" className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity">
            contact page
          </Link>
          .
        </p>

      </section>
    </>
  );
}
