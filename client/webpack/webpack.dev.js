const { merge } = require('webpack-merge')
const { SourceMapDevToolPlugin } = require('webpack')


const commonWebpackConfig = require('./webpack.common.js')
const PATHS = commonWebpackConfig.externals.paths
console.log(PATHS)

const devWebpackConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    devServer: {
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
    ],
    
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)?$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/react', ['@babel/preset-env', {
            //                 useBuiltIns: "usage",
            //                 corejs: 3,
            //             }]],
            //             plugins: [
            //                 '@babel/plugin-proposal-function-bind',
            //                 '@babel/plugin-proposal-export-default-from',
            //                 'babel-plugin-styled-components'
            //             ]
            //         }
            //     }

            // }
        ]
    }

}

module.exports = merge(commonWebpackConfig, devWebpackConfig)
