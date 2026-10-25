/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: { agentUpgrade: "security" },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
