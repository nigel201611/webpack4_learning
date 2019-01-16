const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 放弃使用extract-text-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 每次修改css，只更改對於css文件hash
const WebpackMd5Hash = require('webpack-md5-hash');
// const nodeExternals = require('webpack-node-externals');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        // polyfills: './src/polyfills.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '生产构建'
        }),
        // 任何添加新的本地依赖，对于每次构建，vendor hash 都应该保持一致
        new webpack.HashedModuleIdsPlugin(),
        //至少一处用到 _ 变量的模块实例，那请你将 lodash package 包引入进来，并将其提供给需要用到它的模块。
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
        }),
        new WebpackMd5Hash(),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    optimization: {
        splitChunks: {
            // chunks: 'all',将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中,命中缓存
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single'
    },
    // target: 'node', // in order to ignore built-in modules like path, fs, etc.
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    }

};