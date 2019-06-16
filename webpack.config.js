var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx?$/],
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/react', '@babel/preset-env']
                }
            }
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}