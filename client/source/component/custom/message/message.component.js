import moment from 'moment'
import React, { Fragment } from 'react'
import Button from '@component/core/button/button.component'
import { AiOutlineEnter, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './message.style.scss'
import Emote from '../emote/emote.component'
import { localStorage } from '@core/utility'
import Image from '@component/core/image/image.component'
import { bem } from '@core/utility'

const Message = props => {
    const {
        message: { content, created_at, attachments = [] },
        user: { name, alias, picture }, updateMessage, deleteMessage,
        isEditing
    } = props
    const className = bem('Message', '', { isEditing })

    const onReply = () => {

    }

    const onEdit = () => {
        const { message, index } = props
        updateMessage(message, index)
    }

    const onDelete = () => {
        const { message, index } = props
        deleteMessage(message, index)
    }

    const date = moment(created_at)
    const isToday = moment(created_at).isSame(new Date(), 'day')

    const renderEdit = () => {
        if (name != localStorage.getItem('USER')?.name) {
            return null
        }

        return (
            <Button
                icon={ AiOutlineEdit }
                onClick={ onEdit }
            />
        )
    }

    const renderDelete = () => {
        if (name != localStorage.getItem('USER')?.name) {
            return null
        }

        return (
            <Button
                icon={ AiOutlineDelete }
                onClick={ onDelete }
            />
        )
    }

    const renderNode = (string, index) => {
        if (string === '\n') {
            return (
                <br
                    key={ index}
                />
            )
        } else if (string.length > 2 && string[0] === ':' && string[string.length - 1] === ':') {
            const code = string.substring(1, string.length - 1)

            return (
                <Emote
                    code={ code }
                    key={ index }
                />
            )
        } else {
            return (
                <Fragment
                    key={ index }
                >
                    { string }
                </Fragment>
            )
        }
    }

    const renderAttachment = (attachment, index) => {
        const {
            name,
            type,
            path
        } = attachment

        if (/image\//.test(type)) {
            return (
                <img
                    className="Message-AttachmentImage"
                    src={ path }
                    key={ index }
                />
            )
        }

        return (
            <a
                className="Message-AttachmentImage"
                key={ index }
                href={ path }
                download={ name }
            >
                { name }
            </a>
        )
    }

    return (
        <div className={ className }>
            <div
                className="Message-Picture"
            >
                <Image
                    src={ picture }
                    width={ 56 }
                    height={ 56 }
                />
            </div>
            <div>
                <div className="Message-Head">
                    <div>
                        <span className="Message-Alias">
                            { alias || name }
                        </span>
                        <span className="Message-Timestamp">
                            { isToday ? date.format('HH:mm:ss') : date.format('YYYY-MM-DD HH:mm:ss') }
                        </span>
                    </div>
                    <div className="Message-Actions">
                        <Button
                            icon={ AiOutlineEnter }
                            onClick={ onReply }
                        />
                        { renderEdit() }
                        { renderDelete() }
                    </div>
                </div>
                <div className="Message-Content">
                    { content.split(/(:[a-zA-Z0-9-_]+:|\n)/).map(renderNode) }
                </div>
                <div
                    className="Message-Attachments"
                >
                    { attachments.map(renderAttachment) }
                </div>
            </div>
        </div>
    )
}

export default Message
