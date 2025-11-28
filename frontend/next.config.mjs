/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["astromani.com", "localhost"],
  },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        // Cache all images inside /public/images
        source: "/:all*(png|jpg|jpeg|gif|webp|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", 
          },
        ],
      },
    ];
  },
};

export default nextConfig;
