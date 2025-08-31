/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Set API timeout to 3 minutes to handle long-running requests
  experimental: {
    proxyTimeout: 180000, // 3 minutes in milliseconds
  },

  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://aithink-production.up.railway.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
