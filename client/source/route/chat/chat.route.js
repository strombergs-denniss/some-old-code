import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import Menu from '@component/custom/menu/menu.component'
import Messages from '@component/custom/messages/messages.component'
import { userActions } from '@logic/user/user.slice'
import { channelActions } from '@logic/channel/channel.slice'
import userQuery from '@logic/user/user.query'
import channelQuery from '@logic/channel/channel.query'
import emoteQuery from '@logic/emote/emote.query'
import { localStorage } from '@core/utility'
import './chat.style.scss'

const socket = io()

const Chat = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)
    const channels = useSelector(state => state.channel.channels)

    useEffect(async () => {
        const users = await userQuery.getAll()
        const channels = await channelQuery.getAll()
        const emotes = await emoteQuery.getAll({
            pageNumber: 0,
            pageSize: 100
        }) || []
        localStorage.setItem('EMOTES', emotes)
        dispatch(userActions.load(users))
        dispatch(channelActions.load(channels))
    }, [])

    if (!users.length || !channels.length) {
        return null
    }

    return (
        <div
            className="Chat"
        >
            <Menu />
            <Messages
                socket={ socket }
            />
        </div>
    )
}

export default Chat
