import { fetchGraphQl } from '@core/utility'

const GET_ALL_MESSAGES = `
    query getAllMessages(
        $channelId: ID!,
        $pageNumber: Int!,
        $pageSize: Int!
    ) {
        messages: getAllMessages(
            channel_id: $channelId,
            pageNumber: $pageNumber,
            pageSize: $pageSize
        ) {
            id
            content
            created_at
            updated_at
            user_id
            channel_id
            attachments {
                name
                path
                type
            }
        }
    }
`

const messageQuery = {
    getAll: ({ channelId, pageNumber, pageSize }) => {
        return fetchGraphQl(GET_ALL_MESSAGES, {
            channelId,
            pageNumber,
            pageSize
        }).then(({ messages}) => messages)
    }
}

export default messageQuery
