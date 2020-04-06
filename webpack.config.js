const path = require("path");
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    stats: 'errors-only',
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html'
        })

    ],
}
