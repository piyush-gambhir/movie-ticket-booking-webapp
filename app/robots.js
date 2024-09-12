import { env } from "@/env";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `https://${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
