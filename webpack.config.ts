import { Configuration } from "webpack";
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin";
import { TsConfigPathsPlugin } from "awesome-typescript-loader";

const isProductionBuild = process.argv.indexOf("-p") !== -1;

const plugins = [];

if (!isProductionBuild) {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      formatter: "codeframe"
    }),
    new ForkTsCheckerNotifierWebpackPlugin()
  );
}

const config: Configuration = {
  context: __dirname,
  output: {
    path: __dirname + "/www",
    filename: "bundle.js"
  },
  devtool: isProductionBuild ? false : "eval-source-map",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: !isProductionBuild
        }
      }
    ]
  },
  plugins,
  devServer: {
    contentBase: __dirname + "/www",
    overlay: true,
    watchContentBase: true
  }
};

export default config;
