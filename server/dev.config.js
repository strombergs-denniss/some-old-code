const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');
const Nodemon = require('nodemon-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './source/index.js',
    output: {
        path: path.resolve('./build'),
        filename: 'dev.js'
    },
    resolve: {
        alias: {
            '@core': path.resolve('./source/core'),
            '@controller': path.resolve('./source/controller')
        }
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        new Dotenv(),
        new Nodemon()
    ]
}
