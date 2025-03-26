/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add rules to handle both versions of undici
    config.module.rules.push({
      test: /node_modules[\/\\](?:firebase[\/\\].*[\/\\])?undici[\/\\].*\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-transform-private-methods",
            "@babel/plugin-transform-class-properties",
          ],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
