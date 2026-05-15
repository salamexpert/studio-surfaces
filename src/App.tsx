import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HomePage } from "@/routes/index";
import { BlogIndex } from "@/routes/blog.index";
import { BlogPost } from "@/routes/blog.$slug";
import { SurfacesPage } from "@/routes/surfaces";
import { ArchPage } from "@/routes/architecture";
import { AboutPage } from "@/routes/about";
import { ContactPage } from "@/routes/contact";
import { AdvertisePage } from "@/routes/advertise";
import { PrivacyPage } from "@/routes/privacy-policy";
import { TermsPage } from "@/routes/terms-of-service";
import { EditorialPolicyPage } from "@/routes/editorial-policy";
import { DmcaPage } from "@/routes/dmca-disclaimer";
import { LegalDisclaimerPage } from "@/routes/legal-disclaimer";
import { CookiesPolicyPage } from "@/routes/cookies-policy";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="display text-6xl mt-6">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has moved or never existed.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

// 301-equivalent redirect: strip trailing slash from any path except "/"
function StripTrailingSlash() {
  const { pathname, search, hash } = useLocation();
  if (pathname !== "/" && pathname.endsWith("/")) {
    return <Navigate to={pathname.slice(0, -1) + search + hash} replace />;
  }
  return null;
}

export function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <StripTrailingSlash />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/surfaces" element={<SurfacesPage />} />
            <Route path="/architecture" element={<ArchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
            <Route path="/dmca-disclaimer" element={<DmcaPage />} />
            <Route path="/legal-disclaimer" element={<LegalDisclaimerPage />} />
            <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
