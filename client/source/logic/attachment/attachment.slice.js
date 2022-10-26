import { createSlice } from '@reduxjs/toolkit'

export const {
    reducer: attachmentReducer,
    actions: attachmentActions
} = createSlice({
    name: 'attachment',
    initialState: {
        attachments: []
    },
    reducers: {
        create: (state, { payload }) => {
            state.attachments.push(payload)
        },
        delete: (state, { payload }) => {
            state.attachments.splice(payload, 1)
        },
        clear: (state) => {
            state.attachments = []
        }
    }
})
