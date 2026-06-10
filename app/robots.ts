import type { MetadataRoute } from "next";

const BASE_URL = "https://acrobit.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cpa/", "/landing-page3/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
