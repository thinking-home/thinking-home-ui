import { Configuration } from "webpack";

export const externals: Configuration["externals"] = {
    "react": "thReact",
    "react-dom/client": "thReactDOMClient",
    "react-router": "thReactRouter",
    "react-router-dom": "thReactRouterDOM",
    "history": "thHistory",
    "@thinking-home/ui": "ThinkingHomeUi",
};

export const externalsType: Configuration["externalsType"] = "window";

export const module: Configuration["module"] = {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
  ],
};

export const resolve: Configuration["resolve"] = {
  extensions: [".tsx", ".ts", ".js"],
};

export function initWebpackConfig(
  entry: Configuration["entry"],
  path: string
): Configuration {
  return {
    mode: "production",
    entry,
    externals,
    externalsType,
    module,
    resolve,
    experiments: {
      outputModule: true,
    },
    output: {
      path,
      filename: "[name].js",
      libraryTarget: "module",
      clean: true,
    },
  };
}
