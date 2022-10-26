import { fetchGraphQl } from '@core/utility'

const GET_ALL_USERS = `
    query GetAllUsers {
        users: getAllUsers {
            id
            name
            alias
            picture
        }
    }
`

const UPDATE_USER = `
    mutation UpdateUser($id: ID!, $name: String!, $alias: String!, $picture: String!) {
        user: updateUser(id: $id, name: $name, alias: $alias, picture: $picture) {
            id
            name
            alias
            picture
        }
    }
`

const userQuery = {
    getAll: () => {
        return fetchGraphQl(GET_ALL_USERS).then(({ users }) => users)
    },
    update: ({ id, name, alias, picture }) => {
        return fetchGraphQl(UPDATE_USER, { id, name, alias, picture }).then(({ user }) => user)
    }
}

export default userQuery
