const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};