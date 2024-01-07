/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      // configure images from a remote source, only tmdb.org in this case
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

module.exports = nextConfig;
