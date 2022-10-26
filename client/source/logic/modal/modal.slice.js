import { createSlice } from '@reduxjs/toolkit'

const {
    reducer: modalReducer,
    actions: modalActions
} = createSlice({
    name: 'modal',
    initialState: {
        activeModal: '',
        payload: {},
        title: ''
    },
    reducers: {
        closeModal: state => {
            state.activeModal = ''
        },
        openModal: (state, { payload: { name, title, payload } }) => {
            state.activeModal = name
            state.title = title
            state.payload = payload
        }
    }
})

export { modalReducer, modalActions }
