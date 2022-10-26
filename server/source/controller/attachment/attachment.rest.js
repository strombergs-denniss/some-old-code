const express = require('express')
const multer = require('multer')
const { attachmentModel } = require('./attachment.model')
const upload = multer()
const attachmentRouter = express.Router()

attachmentRouter.post('/api/attachment', upload.single('file'), async (req, res) => {
    try {
        const link = await attachmentModel.createAttachmentFile(req.file)

        if (link) {
            res.send({
                name: req.file.name,
                type: req.file.mimetype,
                path: '/api/attachment/' + link
            })
        }
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

attachmentRouter.get('/api/attachment/:id', async (req, res) => {
    const attachment = await attachmentModel.getAttachmentFile(req.params.id)

    if (attachment) {
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': attachment.buffer.length()
        })
        res.end(attachment.buffer.buffer)
    } else {
        res.sendStatus(404)
    }
})

module.exports = attachmentRouter
