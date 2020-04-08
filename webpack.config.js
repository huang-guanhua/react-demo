const path = require("path");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

function CssLoader(){
    return [
        {loader: 'style-loader'},
        {loader: 'css-loader'}
    ];
}
module.exports = {
    mode: 'development',
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
            },
            {
                test: /\.css$/,
                use: [
                    ...CssLoader()
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ...CssLoader(),
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png||jpg||gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html'
        }),
        new ErrorOverlayPlugin()

    ],
    stats: 'errors-only',
    devtool: 'cheap-module-source-map',
}
