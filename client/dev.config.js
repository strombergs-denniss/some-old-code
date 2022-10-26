const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: ['@babel/polyfill', './source/index.js'],
        access: ['@babel/polyfill', './source/access.js']
    },
    output: {
        path: path.resolve('./distribution'),
        filename: '[name].js',
        publicPath: '/distribution'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@core': path.resolve('./source/core'),
            '@route': path.resolve('./source/route'),
            '@component': path.resolve('./source/component'),
            '@logic': path.resolve('./source/logic')
        }
    },
    devServer: {
        port: 3001,
        proxy: {
            '/': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        new ESLintPlugin(),
        new StylelintPlugin()
    ]
}
