import { fetchGraphQl } from '@core/utility'

const GET_ALL_EMOTES = `
    query getAllEmotes(
        $pageNumber: Int!,
        $pageSize: Int!
    ) {
        emotes: getAllEmotes(
            pageNumber: $pageNumber,
            pageSize: $pageSize
        ) {
            id
            code
        }
    }
`

const emoteQuery = {
    getAll: ({ pageNumber, pageSize }) => {
        return fetchGraphQl(GET_ALL_EMOTES, {
            pageNumber,
            pageSize
        }).then(({ emotes }) => emotes)
    }
}

export default emoteQuery
