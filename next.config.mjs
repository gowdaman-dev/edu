/** @type {import('next').NextConfig} */
import * as path from 'path';
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.node/,
          exclude:
          [
            path.resolve(process.cwd(), 'node_modules', 'firebase'),
            path.resolve(process.cwd(), 'node_modules', '@firebase'),
          ],
          use: "raw-loader",
        });
    return config;
      },
};

export default nextConfig;
