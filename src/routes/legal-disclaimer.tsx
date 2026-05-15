import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/PageHero";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function LegalDisclaimerPage() {
  return (
    <>
      <SEO
        title="Legal Disclaimer — Marino Ceramic Tile"
        description="Legal disclaimer for Marino Ceramic Tile. This website is an independent publication not affiliated with any previous owner, company, or trademark holder connected with this domain."
        canonical="/legal-disclaimer"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Legal Disclaimer", item: `${BASE_URL}/legal-disclaimer` },
        ]}
      />

      <PageHero eyebrow="Legal" title="Legal Disclaimer" intro="Please read this disclaimer carefully before using this website." />

      <section className="container-editorial max-w-3xl prose-editorial">

        <p>
          This website is an independent publication and is not affiliated with, endorsed by,
          sponsored by, or associated with any previous owner, company, organization, brand, or
          trademark holder that may have previously owned, operated, or been connected with this
          domain name.
        </p>

        <p>
          All content published on this website is original and created exclusively for this
          platform. Any references to third-party trademarks, brand names, products, or services
          are used solely for identification and informational purposes. Such references do not
          imply any affiliation, endorsement, sponsorship, or partnership.
        </p>

        <p>
          All trademarks, logos, and registered marks are the property of their respective owners.
        </p>

        <p>
          If you are a trademark owner, copyright holder, or authorized representative and believe
          that any material on this website infringes upon your rights, please{" "}
          <Link to="/contact" className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity">
            contact us immediately through our contact page
          </Link>
          . We will promptly review and, where appropriate, remove the disputed material in
          accordance with applicable laws.
        </p>

        <p>By using this website, you acknowledge and agree to these terms.</p>

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

      </section>
    </>
  );
}
