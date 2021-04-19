const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const common = require('./webpack.common.js')
const paths = require('./paths')

const nodeModulesPath = paths.nodeModules

const cssLoaders = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
]

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    // Only update what has changed on hot reload
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      // async: false,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders,
        exclude: [/node_modules/, nodeModulesPath],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          ...cssLoaders,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: [/node_modules/, nodeModulesPath],
      },
    ],
  },
})
