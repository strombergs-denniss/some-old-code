import React, { useEffect, useRef, useState } from 'react'
import MessageEditor from '@component/custom/message-editor/message-editor.component'
import Message from '@component/custom/message/message.component'
import messageQuery from '@logic/message/message.query'
import './messages.style.scss'
import { messageActions } from '@logic/message/message.slice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@component/core/button/button.component'
import Search from '../search/search.component'
import { createEmote } from '../emote/emote.component'

const Messages = props => {
    const ref = useRef()
    const inputRef = useRef()
    const currentChannel = useSelector(state => state.channel.currentChannel)
    const [pageNumber, setPageNumber] = useState(0)
    const pageSize = 20
    const users = useSelector(state => state.user.users)
    const messages = useSelector(state => state.message.messages) || {}
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(null)

    useEffect(async () => {
        props.socket.on('message.update', message => {
            setIsEditing(null)

            dispatch(messageActions.update(message))
        })

        props.socket.on('message.delete', message => {
            dispatch(messageActions.delete(message))
        })
    }, [])

    useEffect(async () => {
        const messages = await messageQuery.getAll({ channelId: currentChannel, pageNumber, pageSize })
        dispatch(messageActions.load({ currentChannel, messages }))
        const { current = {} } = ref
        current.scrollTop = current.scrollHeight
    }, [currentChannel])

    const createMessage = message => {
        const { current = {} } = ref
        dispatch(messageActions.create({ message }))
        current.scrollTop = current.scrollHeight
    }

    const updateMessage = async (message) => {
        inputRef.current.innerHTML = ''

        message.content.split(/(:[a-zA-Z0-9-_]+:|\n)/).map(string => {
            if (string === '\n') {
                inputRef.current.append(document.createElement('br'))
            } else if (string.length > 2 && string[0] === ':' && string[string.length - 1] === ':') {
                inputRef.current.append(createEmote(string))
            } else {
                inputRef.current.append(document.createTextNode(string))
            }
        })

        setIsEditing(message.id)
    }

    const deleteMessage = async (message) => {
        props.socket.emit('message.delete', message)
    }

    const renderMessage = (message, index) => {
        const { user_id } = message
        const user = users.find(({ id }) => id == user_id) || {}

        return (
            <Message message={ message } user={ user } key={ index } index={ index } isEditing={ isEditing == message.id } updateMessage={ updateMessage } deleteMessage={ deleteMessage } />
        )
    }

    const cancelEdit = () => {
        setIsEditing(false)
        inputRef.current.innerHTML = ''
    }

    const onLoadMoreButtonClick = async () => {
        const messages = await messageQuery.getAll({ channelId: currentChannel, pageNumber: pageNumber + 1, pageSize })

        if (messages.length) {
            dispatch(messageActions.append({ currentChannel, messages }))
            setPageNumber(pageNumber + 1)
        }
    }

    const renderLoadMoreButton = () => {
        return (
            <Button
                isFullWidth
                variant="fill"
                onClick={ onLoadMoreButtonClick }
            >
                Load more
            </Button>
        )
    }

    return (
        <div
            className="Messages"
        >
            <div
                className="Messages-Head"
            >
                <Button>
                    Files
                </Button>
                <Search />
            </div>
            <div
                className="Messages-List"
                ref={ ref }
            >
                <div
                    className="Messages-LoadMore"
                >
                    { renderLoadMoreButton() }
                </div>
                <div>
                    { (messages[currentChannel] || []).map(renderMessage) }
                </div>
            </div>
            <MessageEditor
                createMessage={ createMessage }
                socket={ props.socket }
                inputRef={ inputRef }
                isEditing={ isEditing }
                cancelEdit={ cancelEdit }
            />
        </div>
    )
}

export default Messages
