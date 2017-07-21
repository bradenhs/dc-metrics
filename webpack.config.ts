import { Configuration } from 'webpack'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'

const config: Configuration = {
  context: __dirname,
  output: {
    path: __dirname + '/www',
    filename: 'bundle.js'
  },
  entry: './src/index.tsx',
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    plugins: [ new TsConfigPathsPlugin() ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin()
  ],
  devServer: {
    contentBase: __dirname + '/www',
    overlay: true,
    watchContentBase: true
  }
}

export default config
