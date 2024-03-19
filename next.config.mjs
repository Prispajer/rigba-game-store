/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Dodaj fallback dla modułów "tls" i "net" tylko dla środowiska serwerowego
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        tls: false,
        net: false,
      };
    }

    return config;
  },
};

export default nextConfig;
