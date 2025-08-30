/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

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
