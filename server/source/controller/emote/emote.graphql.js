const emoteModel = require('./emote.model')

const emoteTypeDef = `
    type Emote {
        id: ID
        code: String
    }

    type Query {
        getEmote(id: ID!) : Emote
        getAllEmotes(pageNumber: Int!, pageSize: Int!) : [Emote]
    }

    type Mutation {
        createEmote(code: String!) : Emote
        updateEmote(id: ID!, code: String!) : Emote
        deleteEmote(id: ID!) : Emote
    }
`

const emoteResolver = {
    Query: {
        getEmote: async (_, { id }) => {
            return await emoteModel.get({ id })
        },
        getAllEmotes: async (_, { pageNumber, pageSize }) => {
            return await emoteModel.getAll({ pageNumber, pageSize })
        }
    },
    Mutation: {
        createEmote: async (_, { name }) => {
            return await emoteModel.create({ name })
        },
        updateEmote: async (_, { id, name }) => {
            return await emoteModel.update({ id, name })
        },
        deleteEmote: async (_, { id }) => {
            return await emoteModel.delete({ id })
        }
    }
}

module.exports = {
    emoteTypeDef,
    emoteResolver
}
