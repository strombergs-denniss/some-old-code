const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    entry: './source/index.js',
    output: {
        path: path.resolve('./build'),
        filename: 'prod.js'
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
        new Dotenv()
    ]
}
