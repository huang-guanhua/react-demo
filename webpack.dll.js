const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        lodash: ['lodash']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'library'),
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: resolve(__dirname, 'library/mainfest.json')
        })
    ],
    mode: 'production'
}
