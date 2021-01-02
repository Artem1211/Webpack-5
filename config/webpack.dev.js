const { merge } = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const paths = require('./paths')

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
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options:
                            {
                                sourceMap: true,
                                // количество лоадеров перед этим
                                modules: true
                            }
                    },
                    {
                        loader: 'sass-loader',
                        options:
                            {
                                sourceMap: true
                            }
                    },
                ],
            },
        ]
    }

})