/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.node/,
          exclude:/node_modules\/(firebase|@firebase)\//,
          use: "raw-loader",
        });
    return config;
      },
};

export default nextConfig;
