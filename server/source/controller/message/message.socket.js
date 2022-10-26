const messageModel = require('@controller/message/message.model')
const { attachmentModel } = require('../attachment/attachment.model')

const messageCreate = (io, socket) => (
    async message => {
        const data = await messageModel.create({
            content: message.content,
            user_id: socket.user.id,
            channel_id: message.channelId || 1
        })

        message.attachments.forEach(async attachment => {
            await attachmentModel.create({
                ...attachment,
                message_id: data.id
            })
        })

        io.emit('message.create', data)
    }
)

const messageUpdate = (io, socket) => (
    async message => {
        const data = await messageModel.update({ id: message.id, user_id: socket.user.id, content: message.content })
        
        if (data) {
            io.emit('message.update', data)
        }
    }
)

const messageDelete = (io, socket) => (
    async message => {
        const data = await messageModel.delete({ id: message.id, user_id: socket.user.id })
        
        if (data) {
            io.emit('message.delete', data)
        }
    }
)

module.exports = {
    messageCreate,
    messageUpdate,
    messageDelete
}
