import { env } from "@/env";

export default function sitemap() {
  return [
    {
      url: `https://${env.NEXT_PUBLIC_APP_URL}.com/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `https://${env.NEXT_PUBLIC_APP_URL}.com/movies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `https://${env.NEXT_PUBLIC_APP_URL}.com/offers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];
}
