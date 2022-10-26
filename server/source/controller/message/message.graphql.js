const messageModel = require('./message.model')

const messageTypeDef = `
    scalar Timestamp

    type Message {
        id: ID
        content: String
        attachments: [Attachment]
        created_at: Timestamp
        updated_at: Timestamp
        user_id: ID
        channel_id: ID
    }

    type Query {
        getMessage(id: ID!) : Message
        getAllMessages(channel_id: ID!, pageNumber: Int!, pageSize: Int!) : [Message]
    }

    type Mutation {
        createMessage(name: String!) : Message
        updateMessage(id: ID!, content: String!) : Message
        deleteMessage(id: ID!) : Message
    }
`

const messageResolver = {
    Query: {
        getMessage: async (_, { id }) => {
            return await messageModel.get({ id })
        },
        getAllMessages: async (_, { channel_id, pageNumber, pageSize }) => {
            return await messageModel.getAll({ channel_id, pageNumber, pageSize })
        }
    },
    Mutation: {
        createMessage: async (_, { name }) => {
            return await messageModel.create({ name })
        },
        updateMessage: async (_, { id, name }) => {
            return await messageModel.update({ id, name })
        },
        deleteMessage: async (_, { id }) => {
            return await messageModel.delete({ id })
        }
    }
}

module.exports = {
    messageTypeDef,
    messageResolver
}
