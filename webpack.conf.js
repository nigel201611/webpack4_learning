const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: ['./src/app.js', 'webpack-hot-middleware/client']
    },
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // mode: 'development',
    mode: "production",
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: './dist',
    //     port: 9000,
    //     hot: true
    // },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HtmlWebpackPlugin test'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
};