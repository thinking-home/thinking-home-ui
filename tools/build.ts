import { Configuration } from "webpack";
import parse from "minimist";

const args = parse(process.argv.slice(1));

const isProduction = (args["mode"] || "production") === "production";

export const mode: Configuration["mode"] = isProduction
  ? "production"
  : "development";

export const devtool = isProduction ? undefined : "inline-source-map";

export const externals: Configuration["externals"] = {
  react: "thReact",
  "react-dom/client": "thReactDOMClient",
  "react-router": "thReactRouter",
  "react-router-dom": "thReactRouterDOM",
  history: "thHistory",
  "@thinking-home/i18n": "thI18n",
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
    mode,
    devtool,
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
