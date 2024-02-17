// next.config.js
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.module.rules.push({
          test: /\.node/,
          exclude: /node_modules\/(firebase|@firebase)\//,
          use: "raw-loader",
        });
      }
      return config;
    },
  };
  module.exports = nextConfig;