import { AiOutlineSmile, AiOutlineFileAdd } from 'react-icons/ai'
import Button from '@component/core/button/button.component'
import './message-editor.style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchFile, isMimeTypeAllowed, localStorage } from '@core/utility'
import Attachments from '../attachments/attachments.component'
import { bem } from '@core/utility'
import { createEmote } from '../emote/emote.component'
import { attachmentActions } from '@logic/attachment/attachment.slice'

export const stringifyContent = target => {
    let content = ''

    target.childNodes.forEach(child => {
        if (child.className === 'Emote') {
            content += child.alt || ''
        } else {
            if (child.nodeName === '#text') {
                content += child.data.replace(/\n/g, '') || ''
            } else if (child.nodeName === 'BR') {
                content += '\n'
            }
        }
    })

    return content
}

export const parseContent = text => {
    const content = document.createElement('div')

    text.split(/(:[a-zA-Z0-9-_]+:|\n)/).map(string => {
        if (string === '\n') {
            content.append(document.createElement('br'))
        } else if (string.length > 2 && string[0] === ':' && string[string.length - 1] === ':') {
            content.append(createEmote(string))
        } else {
            content.append(document.createTextNode(string))
        }
    })

    return content
}

const MessageEditor = props => {
    const dispatch = useDispatch()
    const [isFocused, setIsFocused] = useState(false)
    const { isEditing, cancelEdit } = props
    const user = useSelector(state => state.user)
    const attachments = useSelector(state => state.attachment.attachments)
    const currentChannel = useSelector(state => state.channel.currentChannel)
    const contentWrapperClassName = bem('MessageEditor', 'ContentWrapper', { isFocused })

    useEffect(async () => {
        props.socket.on('message.create', message => {
            props.createMessage(message)
        })
    }, [])

    const onKeyDown = e => {
        const { key } = e

        if (key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
        }

        if (key == 'Enter' && (e.target.querySelector('.Emote') || (e.target.textContent && !/^\s*$/.test(e.target.textContent))) && !e.shiftKey) {
            if (props.isEditing) {
                props.socket.emit('message.update', {
                    id: props.isEditing,
                    content: stringifyContent(e.target),
                    userId: user.id,
                    channelId: currentChannel
                })
                e.target.innerHTML = ''
            } else {
                props.socket.emit('message.create', {
                    userId: user.id,
                    content: stringifyContent(e.target),
                    channelId: currentChannel,
                    attachments: attachments.map(item => ({
                        name: item.name, path: item.path, type: item.type
                    }))
                })
                e.target.innerHTML = ''
                dispatch(attachmentActions.clear())
            }

            e.preventDefault()
        }
    }

    const onKeyUp = e => {
        e.preventDefault()

        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const data = selection.anchorNode.data

        if (data) {
            const {
                0: match,
                index
            } = data.match(/:[\w-]+:/) || {}

            if (match && index !== undefined) {
                const emotes = localStorage.getItem('EMOTES') || []
                const isEmoteValid = emotes.find(emote => emote.code === match.substring(1, match.length - 1))

                if (isEmoteValid) {
                    range.setStart(selection.anchorNode, index)
                    range.setEnd(selection.anchorNode, index + match.length)
                    range.deleteContents()
                    range.insertNode(createEmote(match))
                    range.collapse()
                }
            }
        }
    }

    const onPaste = e => {
        e.preventDefault()

        const html = parseContent(e.clipboardData.getData('text/plain'))
        console.log(e.clipboardData.getData('text/plain'))

        document.execCommand('insertHTML', false, html.innerHTML)
    }

    const onFileUploadClick = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = e => {
            const file = e.target.files[0]
            const data = new FormData()
            data.append('file', file)

            if (isMimeTypeAllowed(file.type)) {
                fetchFile(data).then(data => data.json()).then(data => {
                    const {
                        path,
                        type
                    } = data

                    dispatch(attachmentActions.create({
                        name: file.name,
                        path,
                        file,
                        type
                    }))
                })
            }
        }

        input.click()
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const renderIsEdit = () => {
        if (isEditing) {
            return (
                <Button
                    onClick={ cancelEdit }
                >
                    Stop Editing
                </Button>
            )
        }
    }

    return (
        <div className="MessageEditor">
            <div
                className="MessageEditor-Head"
            >
                <Button
                    icon={ AiOutlineSmile }
                />
                <Button
                    icon={ AiOutlineFileAdd }
                    onClick={ onFileUploadClick }
                />
                { renderIsEdit() }
            </div>
            <div
                className={ contentWrapperClassName }
            >
                <div
                    ref={ props.inputRef }
                    className="MessageEditor-Content"
                    contentEditable
                    onKeyDown={ onKeyDown }
                    onKeyUp={ onKeyUp }
                    onPaste={ onPaste }
                    onFocus={ onFocus }
                    onBlur={ onBlur }
                />
            </div>
            <Attachments />
        </div>
    )
}

export default MessageEditor
