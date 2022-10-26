const express = require('express')
const pug = require('pug')
const path = require('path')
const customRouter = express.Router()

customRouter.get('/cell-grid', (_, res) => {
    res.send(pug.renderFile(path.resolve('./source/index.pug'), { js: '/cell-grid/index.js' }))
})

customRouter.get('/*', (_, res) => {
    res.send(pug.renderFile(path.resolve('./source/index.pug'), { js: '/index.js' }))
})

module.exports = customRouter
