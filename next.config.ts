import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    // Create a new config object to avoid modifying the original directly
    const newConfig = { ...config };

    // Initialize module and rules if they don't exist
    if (!newConfig.module) {
      newConfig.module = { rules: [] };
    } else if (!newConfig.module.rules) {
      newConfig.module.rules = [];
    }

    // Add TypeScript loader rule
    newConfig.module.rules.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    });

    // Initialize or update resolve.extensions
    if (!newConfig.resolve) {
      newConfig.resolve = { extensions: ['.js', '.jsx', '.ts', '.tsx'] };
    } else if (!newConfig.resolve.extensions) {
      newConfig.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
    } else {
      // Make sure TypeScript extensions are included
      const extensions = newConfig.resolve.extensions;
      if (!extensions.includes('.ts')) extensions.push('.ts');
      if (!extensions.includes('.tsx')) extensions.push('.tsx');
    }

    return newConfig;
  },
};

export default nextConfig;