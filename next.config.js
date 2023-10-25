/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "tmdb.org",
      "image.tmdb.org",
      "themoviedb.org",
      "api.themoviedb.org",
      "https://www.thermofisher.com/",
    ],
  },
};

module.exports = nextConfig;
