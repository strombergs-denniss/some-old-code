import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '@logic/user/user.slice'
import { messageReducer } from '@logic/message/message.slice'
import { channelReducer } from '@logic/channel/channel.slice'
import { modalReducer } from '@logic/modal/modal.slice'
import { notificationReducer } from '@logic/notification/notification.slice'
import { attachmentReducer } from '@logic/attachment/attachment.slice'

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        channel: channelReducer,
        modal: modalReducer,
        notification: notificationReducer,
        attachment: attachmentReducer
    }
})

export default store
