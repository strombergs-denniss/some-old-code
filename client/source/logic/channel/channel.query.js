import { fetchGraphQl } from '@core/utility'

const GET_ALL_CHANNELS = `
    query GetAllChannels {
        channels: getAllChannels {
            id
            name
        }
    }
`

const CREATE_CHANNEL = `
    mutation CreateChannel($name: String!) {
        channel: createChannel(name: $name) {
            id
            name
        }
    }
`

const UPDATE_CHANNEL = `
    mutation UpdateChannel($id: ID!, $name: String!) {
        channel: updateChannel(id: $id, name: $name) {
            id
            name
        }
    }
`

const DELETE_CHANNEL = `
    mutation DeleteChannel($id: ID!) {
        channel: deleteChannel(id: $id) {
            id
            name
        }
    }
`

const channelQuery = {
    getAll: () => {
        return fetchGraphQl(GET_ALL_CHANNELS).then(({ channels }) => channels)
    },
    create: ({ name }) => {
        return fetchGraphQl(CREATE_CHANNEL, { name }).then(({ channel }) => channel)
    },
    update: ({ id, name }) => {
        return fetchGraphQl(UPDATE_CHANNEL, { id, name }).then(({ channel }) => channel)
    },
    delete: ({ id }) => {
        return fetchGraphQl(DELETE_CHANNEL, { id }).then(({ channel }) => channel)
    }
}

export default channelQuery
