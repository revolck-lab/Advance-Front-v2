// next.config.mjs (renomeie de .ts para .mjs)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  // Configuração para limites da API se necessário
  api: {
    responseLimit: "8mb",
  },
};

export default nextConfig;
