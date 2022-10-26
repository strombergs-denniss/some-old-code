import { createSlice } from '@reduxjs/toolkit'

const { reducer: messageReducer, actions: messageActions } = createSlice({
    name: 'message',
    initialState: {
        message: '',
        messages: {}
    },
    reducers: {
        create: (state, { payload }) => {
            const { message } = payload
            const { channel_id } = message
            state.messages[channel_id] = state.messages[channel_id] || []
            state.messages[channel_id].unshift(message)
        },
        load: (state, { payload }) => {
            const { currentChannel, messages } = payload
            state.messages[currentChannel] = [...messages]
        },
        append: (state, { payload }) => {
            const { currentChannel, messages } = payload
            state.messages[currentChannel].push(...messages)
        },
        delete: (state, { payload }) => {
            const { channel_id, id } = payload
            const index = state.messages[channel_id].indexOf(state.messages[channel_id].find(a => a.id == id))
            state.messages[channel_id].splice(index, 1)
        },
        update: (state, { payload }) => {
            const { channel_id, id, content } = payload
            const index = state.messages[channel_id].indexOf(state.messages[channel_id].find(a => a.id == id))
            state.messages[channel_id][index].content = content
        },
        setMessage: (state, { payload }) => {
            state.message = payload
        }
    }
})

export { messageReducer, messageActions }
