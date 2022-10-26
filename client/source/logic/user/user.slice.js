import { createSlice } from '@reduxjs/toolkit'

const { reducer: userReducer, actions: userActions } = createSlice({
    name: 'user',
    initialState: {
        users: []
    },
    reducers: {
        load: (state, { payload }) => {
            state.users = [...payload]
        }
    }
})

export { userReducer, userActions }
