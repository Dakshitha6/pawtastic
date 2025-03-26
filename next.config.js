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
    if (!isServer) {
      // Don't resolve server-only modules on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        "fs/promises": false,
        "timers/promises": false,
        crypto: false,
        stream: false,
        http2: false,
        util: false,
        http: false,
        https: false,
        zlib: false,
        os: false,
        path: false,
        "mongodb-client-encryption": false,
        kerberos: false,
        "@mongodb-js/zstd": false,
        "@aws-sdk/credential-providers": false,
        "gcp-metadata": false,
        snappy: false,
        socks: false,
        aws4: false,
      };
    }

    // Add rules to handle both versions of undici and mongodb
    config.module.rules.push({
      test: /node_modules[\/\\](?:firebase[\/\\].*[\/\\])?undici[\/\\].*\.js$|node_modules[\/\\]mongodb[\/\\].*\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
