const path = require("path");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const webpack = require('webpack');
//import { Configuration } from 'webpack';
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

// /**
//  * @type {Configuration}
//  */
module.exports = {
    mode: env,
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        //设置开发服务起的目标地址
        contentBase: path.resolve(__dirname,'build'),
        //服务器访问地址
        host: '127.0.0.1',
        //服务器端口
        port: 8080,
        inline: false,
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // },
        // hotOnly: false,
        // //是否启用服务器压缩
        // //compress: true,
        // //hot: true,
        // //https: true,
        proxy: {
            // "/api": {
            //     target: "https://www.jianshu.com",
            //     // 因为使用的是https，会有安全校验，所以设置secure为false
            //     secure: false,
            //     // port: 80,
            //     // ingorePath 默认即为 false, 注释掉也可以
            //     // ingorePath: false,
            //     // changeOrigin是关键，如果不加这个就无法跳转请求
            //     changeOrigin: true,
            // }
            '*': {
                target: 'https://zhiqiu.baidu.com', // 后台服务地址以及端口号
                changeOrigin: true, //是否跨域
                //ws: false,
                //pathRewrite: { '^/api': '/' }
              }
        },
        //sockHost: 'http://127.0.0.1',
        // sockPort: 8080,
        //disableHostCheck: true,
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
        new OptimizeCSSAssetsPlugin(),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'library/mainfest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'library/lodash.js')
        })

    ],
    optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        }
    },
    stats: 'errors-only',
    devtool: isDev ? 'cheap-module-source-map' : 'source-map'
}
