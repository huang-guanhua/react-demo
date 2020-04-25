const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContentReplacePlugin = require('content-replace-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const STYLE_STR = '__NOWUI_STYLE__';

module.exports = {
    entry: './src/index.js',
    externals: [
        function(context, request, callback) {
            if(/(react|redux|@tencent|classnames|react-redux|react-dom)/.test(request)) {
                return callback(null, 'umd ' + request);
            }
            callback();
        }
    ],
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'nowui',
        libraryTarget: 'umd'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ContentReplacePlugin({
            rules: {
                '*.js': content => content.replace(/__NOWUI_STYLE__/, `require('./style.css')`)
            }
        }),
        new ExtractTextPlugin('style.css'),
    ],
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', ['env', {
                    targets: {
                        browsers: ['Android >= 2.3', 'iOS >= 6'],
                    }
                }], 'stage-0']
            },
        }, {
            test: /\.less$/,
            use: [{
                loader: 'string-replace-loader',
                options: {
                    search: '// removed by extract-text-webpack-plugin',
                    replace: STYLE_STR
                }
            }].concat(ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader']
            }))
        }, {
            test: /\.scss|sass$/,
            use: [{
                loader: 'string-replace-loader',
                options: {
                    search: '// removed by extract-text-webpack-plugin',
                    replace: STYLE_STR
                }
            }].concat(ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
            }))
        }, {
            test: /\.css$/,
            use: [{
                loader: 'string-replace-loader',
                options: {
                    search: '// removed by extract-text-webpack-plugin',
                    replace: STYLE_STR
                }
            }].concat(ExtractTextPlugin.extract({
                use: ['css-loader']
            }))
        }, {
            test: /.(png?.*|jpg?.*|jpg|png)$/,
            loader: 'url-loader'
        }, {
            test: /.(blob|svg)$/,
            loader: 'file-loader'
        }, {
            test: /.json$/,
            loader: 'json-loader'
        }]
    }
}