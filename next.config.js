/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["image.tmdb.org"], // Add the domain here
  },
};

export default nextConfig;
