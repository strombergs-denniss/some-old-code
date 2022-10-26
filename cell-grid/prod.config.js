const path = require('path')

module.exports = {
    mode: 'production',
    entry: './source/index.js',
    output: {
        path: path.resolve('../server/distribution/cell-grid'),
        filename: 'index.js'
    },
    resolve: {
        alias: {
            '@core': path.resolve('./source/core'),
            '@gui': path.resolve('./source/gui'),
            '@automata': path.resolve('./source/automaton')
        }
    }
}
