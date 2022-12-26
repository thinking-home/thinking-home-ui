import { Configuration } from "webpack";
import { resolve } from "path";

const config: Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "vendor.js",
    library: "ThinkingHomeUi",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", "js"],
  },
};

export default config;
