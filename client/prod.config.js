const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        index: ['@babel/polyfill', './source/index.js'],
        access: ['@babel/polyfill', './source/access.js']
    },
    output: {
        path: path.resolve('../server/distribution'),
        filename: '[name].js'
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
    }
}
