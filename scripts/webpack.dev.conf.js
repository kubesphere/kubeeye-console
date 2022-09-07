const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = (absolutePath) => path.resolve(process.cwd(), absolutePath);

const webpackDevConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // entry: {
  //   main: config.webIndex,
  // },
  output: {
    path: resolve('dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      // { parser: { system: false } },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[name].[ext]',
            publicPath: '/',
            esModule: false,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'assets/fonts/[name].[ext]',
            publicPath: '/',
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [
      resolve('server'),
    ] }),
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: false,
    splitChunks: false,
  },
  devServer: {
    hot: true,
    port: 3001,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    // contentBase: [resolve('dist')],
    // publicPath: config.assetsPublicPath,
    // watchContentBase: true,
    // compress: true,
    open: false,
    // inline: true,
    client: {
      overlay: true,
    },
    static: {
      directory: resolve('dist'),
      publicPath: resolve('dist'),
      watch: true,
    },
    // stats: 'errors-only',
    proxy: {
      '/apis': {
        target: 'ws://localhost:9088',
        ws: true,
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:9088',
        changeOrigin: true,
      }
    }
  },
  stats: {
    assets: false,
    modules: false,
    entrypoints: false,
  },
});

module.exports = webpackDevConfig;
