const channelModel = require('./channel.model')

const channelTypeDef = `
    type Channel {
        id: ID
        name: String
    }

    type Query {
        getChannel(id: ID!) : Channel
        getAllChannels : [Channel]
    }

    type Mutation {
        createChannel(name: String!) : Channel
        updateChannel(id: ID!, name: String!) : Channel
        deleteChannel(id: ID!) : Channel
    }
`

const channelResolver = {
    Query: {
        getChannel: async (_, { id }) => {
            return await channelModel.get({ id })
        },
        getAllChannels: async () => {
            return await channelModel.getAll()
        }
    },
    Mutation: {
        createChannel: async (_, { name }) => {
            return await channelModel.create({ name })
        },
        updateChannel: async (_, { id, name }) => {
            return await channelModel.update({ id, name })
        },
        deleteChannel: async (_, { id }) => {
            return await channelModel.delete({ id })
        }
    }
}

module.exports = {
    channelTypeDef,
    channelResolver
}
