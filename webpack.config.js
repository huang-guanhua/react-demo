const path = require("path");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const env = process.env.NODE_ENV; //区分development和production
const isDev = env === "development";

function CssLoader(){
    return [
        isDev ? {loader: 'style-loader'} : {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../'
            },
        },
        {
            loader: 'css-loader',
            options: { importLoaders: 1 }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-preset-env')()
                ]
            }
        }
    ];
}
module.exports = {
    mode: env,
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
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
        new ErrorOverlayPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].css"
        }),
        new OptimizeCSSAssetsPlugin()

    ],
    stats: 'errors-only',
    devtool: 'cheap-module-source-map'
}
