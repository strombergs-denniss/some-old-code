import { createSlice } from '@reduxjs/toolkit'

const { reducer: channelReducer, actions: channelActions } = createSlice({
    name: 'channel',
    initialState: {
        channels: [],
        currentChannel: 1
    },
    reducers: {
        load: (state, { payload }) => {
            state.channels = [...payload]
        },
        setCurrentChannel: (state, { payload }) => {
            state.currentChannel = payload
        },
        create: (state, { payload }) => {
            state.channels.push(payload)
        },
        update: (state, { payload }) => {
            const index = state.channels.indexOf(state.channels.find(channel => channel.id === payload.id))

            state.channels[index] = payload
        },
        delete: (state, { payload }) => {
            const index = state.channels.indexOf(state.channels.find(channel => channel.id === payload.id))
            state.channels.splice(index, 1)
        }
    }
})

export { channelReducer, channelActions }
