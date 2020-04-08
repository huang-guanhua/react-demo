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
                test: /\.(js||jsx)$/,
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
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            esModule: false,
                            name: '[name].[contenthash:10].[ext]',
                            outputPath: 'images'
                        }
                    }
                    // {
                    //     loader: 'file-loader'
                    // }
                ]
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
