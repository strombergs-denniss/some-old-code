const path = require('path')

module.exports = {
    mode: 'development',
    entry: './source/index.js',
    output: {
        path: path.resolve('./distribution/cell-grid'),
        filename: 'index.js',
        publicPath: '/distribution/cell-grid'
    },
    resolve: {
        alias: {
            '@core': path.resolve('./source/core'),
            '@gui': path.resolve('./source/gui'),
            '@automata': path.resolve('./source/automaton')
        }
    },
    devServer: {
        port: 3002,
        proxy: {
            '/': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    }
}
