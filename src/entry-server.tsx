import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";
import { POSTS } from "@/lib/content";

export const routes = [
  "/",
  "/surfaces",
  "/architecture",
  "/blog",
  "/about",
  "/contact",
  "/advertise",
  "/privacy-policy",
  "/terms-of-service",
  "/editorial-policy",
  "/dmca-disclaimer",
  "/legal-disclaimer",
  "/cookies-policy",
  ...POSTS.map((p) => `/blog/${p.slug}`),
];

export function render(url: string) {
  const helmetContext: any = {};
  const html = renderToString(
    <StaticRouter location={url}>
      <App helmetContext={helmetContext} />
    </StaticRouter>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
