import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from 'react-icons/ai'
import Button from '../button/button.component'
import './notifications.style.scss'
import { bem } from '@core/utility'
import { notificationActions } from '@logic/notification/notification.slice'
import { useEffect } from 'react'

const ICON_MAP = {
    success: AiOutlineCheckCircle,
    error: AiOutlineCloseCircle,
    info: AiOutlineInfoCircle,
    warning: AiOutlineExclamationCircle
}

const Notification = props => {
    const {
        notification: {
            variant,
            title,
            description,
            lifeTime
        } = {},
        index
    } = props
    const dispatch = useDispatch()
    const className = bem('Notification', '', { hasIcon: !!variant, variant })

    useEffect(() => {
        if (lifeTime) {
            setTimeout(() => {
                dispatch(notificationActions.closeNotification(index))
            }, lifeTime)
        }
    }, [])

    const renderIcon = () => {
        const Icon = ICON_MAP[variant]

        if (!Icon) {
            return null
        }

        return (
            <span
                className="Notification-Icon"
            >
                <Icon
                    size={ 24 }
                />
            </span>
        )
    }

    const renderDescription = () => {
        if (!description) {
            return null
        }
        
        return (
            <div
                className="Notification-Description"
            >
                { description }
            </div>
        )
    }

    const onCloseClick = () => {
        dispatch(notificationActions.closeNotification(index))
    }

    return (
        <div
            className={ className }
        >
            <div
                className="Notification-Title"
            >
                { renderIcon() }
                <span>
                    { title }
                </span>
                <span
                    className="Notification-Close"
                >
                    <Button
                        icon={ AiOutlineClose }
                        onClick={ onCloseClick }
                    />
                </span>
            </div>
            { renderDescription() }
        </div>
    )
}

const Notifications = () => {
    const notifications = useSelector(state => state.notification.notifications)
    const notificationsRoot = document.getElementById('notifications-root')

    const renderItem = (notification, index) => {
        return (
            <Notification
                notification={ notification }
                key={ index }
                index={ index }
            />
        )
    }

    const renderNotifications = () => {
        return (
            <div
                className="Notifications-Container"
            >
                <div
                    className="Notifications"
                >
                    { notifications.map(renderItem) }
                </div>
            </div>
        )
    }

    return createPortal(renderNotifications(), notificationsRoot)
}

export default Notifications
