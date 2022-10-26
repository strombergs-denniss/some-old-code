const userModel = require('./user.model')

const userTypeDef = `
    type User {
        id: ID
        name: String
        alias: String
        picture: String
    }

    type Query {
        getUser(id: ID!): User
        getAllUsers: [User]
    }

    type Mutation {
        updateUser(
            id: ID!,
            name: String!,
            alias: String!,
            picture: String!
        ): User
    }
`

const userResolver = {
    Query: {
        getUser: async (_, { id }) => {
            return await userModel.get({ id })
        },
        getAllUsers: async () => {
            return await userModel.getAll()
        }
    },
    Mutation: {
        updateUser: async (_, { id, name, alias, picture }) => {
            return await userModel.update({ id, name, alias, picture })
        }
    }
}

module.exports = {
    userTypeDef,
    userResolver
}
