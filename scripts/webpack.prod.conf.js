const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const baseWebpackConfig = require('./webpack.base.conf');
const path = require('path');

const resolve = (absolutePath) => path.resolve(process.cwd(), absolutePath);

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  // entry: {
  //   main: config.webIndex,
  // },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    rules:[
      // { parser: { system: false } },
      // {
      //   resource: config.webIndex,
      //   use: [
      //     {
      //       loader: resolve("scripts/libs/systemjs-imports-loader.js"),
      //       options: { importsMap: systemImports },
      //     },
      //   ],
      // },
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'assets/fonts/[name].[hash:8].[ext]',
            esModule: false
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true,
          safari10: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 1,
          priority: 1,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
        styles: {
          name: 'main',
          test: /\/src\/(.*)\.scss$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
    chunkIds: 'named',
    concatenateModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    removeAvailableModules: true,
    providedExports: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      root: resolve('dist'),
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll/**'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    // new WebpackAssetsManifest({
    //   customize(entry) {
    //     if (entry.key.indexOf('locales') > -1) {
    //       const ret = entry.key.match(/locales\/(\S*?)\./);
    //       if (ret) {
    //         return { key: `locales-${ret[1]}`, value: entry.value };
    //       }
    //     }
    //   },
    //   entrypoints: false,
    //   writeToDisk: true,
    //   output: '../dist/manifest.json',
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
    }),
  ],
});

if (process.env.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

webpack(webpackConfig, function(error, stats) {
  if (error) {
    throw error;
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  console.log('  Webpack Finished\n');
});
