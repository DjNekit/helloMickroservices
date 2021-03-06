const webpack = require('webpack')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const commonWebpackConfig = require('./webpack.common.js')

const prodWebpackPlugin = argv => {
    return {
        mode: 'production',
        devtool: false,
        performance: { hints: false },
        optimization: {
            concatenateModules: true,
            minimize: true,
            minimizer: [new TerserPlugin()]
        },
        plugins: [
            new SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new BundleAnalyzerPlugin()
        ]
    }
}

module.exports = (env, argv) => merge(commonWebpackConfig, prodWebpackPlugin(argv))