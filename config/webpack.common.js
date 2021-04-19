const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const path = require('path')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const paths = require('./paths')

module.exports = {
  entry: [path.resolve(paths.src, 'index.tsx')],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    // https://webpack.js.org/guides/public-path/
    publicPath: '/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          // не генерит ошибку при отсутствии файлов
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: path.resolve(paths.src, 'images/favicon.png'),
      template: path.resolve(paths.src, 'template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    new PrettierPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        // https://github.com/webpack/webpack/issues/11467#issuecomment-691702706
        // https://github.com/vercel/next.js/pull/17095
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
}
