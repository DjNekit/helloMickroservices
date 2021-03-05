const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') 

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    root: path.resolve(__dirname, '../'),    
    assets: 'assets'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    context: PATHS.src,
    entry: {
        app: `/index.tsx`
    },
    output: {
        path: `${PATHS.dist}`,
        filename: `[name].[contenthash].js`,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', 'json'],
        alias: {
            '@shared': `${PATHS.src}/shared`,
            "@helpers": `${PATHS.src}/helpers`,
        }
    },
    plugins: [
        new HTMLPlugin({
            template: `${PATHS.src}/index.html`,
            filename: 'index.html',
            path: PATHS.dist
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}`,
                    to: `${PATHS.dist}/${PATHS.assets}`
                }
            ]
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].ext'
                }
            }
        ]
    }
}
