import { createSlice } from '@reduxjs/toolkit'

const {
    reducer: notificationReducer,
    actions: notificationActions
} = createSlice({
    name: 'notification',
    initialState: {
        notifications: []
    },
    reducers: {
        openNotification: (state, { payload }) => {
            state.notifications.push({
                id: state.notifications.length,
                ...payload
            })
        },
        closeNotification: (state, { payload }) => {
            const index = state.notifications.indexOf(state.notifications.find(a => a.id == payload))
            state.notifications.splice(index, 1)
        }
    }
})

export { notificationReducer, notificationActions }
