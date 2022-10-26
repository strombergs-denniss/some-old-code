const { makeExecutableSchema } = require('@graphql-tools/schema')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { userTypeDef, userResolver } = require('@controller/user/user.graphql')
const { channelTypeDef, channelResolver } = require('@controller/channel/channel.graphql')
const { messageTypeDef, messageResolver } = require('@controller/message/message.graphql')
const { emoteTypeDef, emoteResolver } = require('@controller/emote/emote.graphql')
const { attachmentTypeDef, attachmentResolver } = require('@controller/attachment/attachment.graphql')

const createSchema = () => (
    makeExecutableSchema({
        typeDefs: mergeTypeDefs([
            userTypeDef,
            channelTypeDef,
            messageTypeDef,
            emoteTypeDef,
            attachmentTypeDef
        ]),
        resolvers: mergeResolvers([
            userResolver,
            channelResolver,
            messageResolver,
            emoteResolver,
            attachmentResolver
        ])
    })
)

module.exports = {
    createSchema
}
