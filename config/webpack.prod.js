const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line max-len
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const common = require('./webpack.common.js')
const paths = require('./paths')

const nodeModulesPath = paths.nodeModules

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
    },
  },
]

module.exports = merge(common, {
  mode: 'production',
  // генерация source maps
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  plugins: [
    // style-loader для dev, MiniCssExtractPlugin для prod
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetWebpackPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
      new TerserWebpackPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders,
        exclude: [/node_modules/, nodeModulesPath],
      },
      {
        test: /\.s[ac]ss$/,
        use: [...cssLoaders, 'sass-loader'],
        exclude: [/node_modules/, nodeModulesPath],
      },
    ],
  },
})
