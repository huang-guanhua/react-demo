const path = require("path");

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
            }
        ]
    },
    plugins: [

    ],
}
