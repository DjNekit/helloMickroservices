const { merge } = require('webpack-merge')
const { SourceMapDevToolPlugin } = require('webpack')

const commonWebpackConfig = require('./webpack.common.js')
const PATHS = commonWebpackConfig.externals.paths

const devWebpackConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    devServer: {
        host: 'localhost',
        contentBase: PATHS.dist,
        compress: true,
        port: 3000,
        hot: true
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },

    plugins: [
        new SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]

}

module.exports = merge(commonWebpackConfig, devWebpackConfig)
