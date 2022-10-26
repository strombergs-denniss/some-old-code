const { attachmentModel } = require('./attachment.model')

const attachmentTypeDef = `
    type Attachment {
        id: ID
        name: String
        path: String
        type: String
        message_id: ID
    }

    type Query {
        getAttachment(id: ID!) : Attachment
        getAllAttachments(pageNumber: Int!, pageSize: Int!) : [Attachment]
    }

    type Mutation {
        deleteAttachment(id: ID!) : Attachment
    }
`

const attachmentResolver = {
    Query: {
        getAttachment: async (_, { id }) => {
            return await attachmentModel.get({ id })
        },
        getAllAttachments: async (_, { pageNumber, pageSize }) => {
            return await attachmentModel.getAll({ pageNumber, pageSize })
        }
    },
    Mutation: {
        deleteAttachment: async (_, { id }) => {
            return await attachmentModel.delete({ id })
        }
    }
}

module.exports = {
    attachmentTypeDef,
    attachmentResolver
}
