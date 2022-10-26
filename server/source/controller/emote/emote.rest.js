const express = require('express')
const emoteModel = require('./emote.model')
const emoteRouter = express.Router()

emoteRouter.get('/api/emote/:code', async (req, res) => {
    const file = await emoteModel.getEmote(req.params.code)

    if (file) {
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': file.buffer.length()
        })
        res.end(file.buffer.buffer)
    } else {
        res.sendStatus(404)
    }
})


module.exports = emoteRouter
