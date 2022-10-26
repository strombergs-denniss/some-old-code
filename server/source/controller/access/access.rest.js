const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const pug = require('pug')
const { generateToken } = require('@core/utility')
const userModel = require('@controller/user/user.model')
const accessRouter = express.Router()

accessRouter.get('/', (req, res) => {
    const token = req.cookies['token']
    let js = '/access.js'

    if (token) {
        jwt.verify(token, process.env.SECRET, e => {
            if (!e) {
                js = '/index.js'
            }
        })
    }

    res.send(pug.renderFile(path.resolve('./source/index.pug'), { js }))
})

accessRouter.use('/distribution/access.js', express.static(path.resolve('./distribution/access.js')))

accessRouter.post('/authorize', async (req, res) => {
    const { name, password } = req.body

    try {
        const user = await userModel.getByName({ name })

        if (user && bcrypt.compareSync(password, user.password)) {
            res.cookie('token', generateToken(user), { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
            res.json({
                id: user.id,
                name: user.name,
                alias: user.alias,
                picture: user.picture
            })
        } else {
            res.sendStatus(403)
        }
    } catch (e) {
        console.error(e)
    }
})

accessRouter.post('/revoke', async (_, res) => {
    res.cookie('token', '')
    res.send()
})

accessRouter.use((req, res, next) => {
    const token = req.cookies['token']

    if (token) {
        jwt.verify(token, process.env.SECRET, (e, user) => {
            if (e) {
                res.sendStatus(403)
            } else {
                next()
            }
        })
    } else {
        res.sendStatus(401)
    }
})

module.exports = accessRouter
