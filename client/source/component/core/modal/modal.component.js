import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { modalActions } from '@logic/modal/modal.slice'
import Button from '../button/button.component'
import './modal.style.scss'

export const Trigger = props => {
    const {
        component: Tag,
        componentProps: {
            onClick = () => {},
            ...other
        },
        name,
        title,
        payload,
        children
    } = props
    const dispatch = useDispatch()

    const onTriggerClick = e => {
        onClick(e)
        dispatch(modalActions.openModal({
            name,
            title,
            payload
        }))
    }

    return (
        <Tag
            onClick={ onTriggerClick }
            { ...other }
        >
            { children }
        </Tag>
    )
}

export const Portal = props => {
    const {
        name,
        children
    } = props
    const activeModal = useSelector(state => state.modal.activeModal)
    const title = useSelector(state => state.modal.title)
    const isOpen = activeModal === name
    const modalRoot = document.getElementById('modal-root')
    const dispatch = useDispatch()

    if (!isOpen) {
        return null
    }

    const onOutsideClick = e => {
        if (e.target.className === 'Modal-Container') {
            dispatch(modalActions.closeModal())
        }
    }

    const onCloseClick = () => {
        dispatch(modalActions.closeModal())
    }

    const renderModal = () => {
        return (
            <div
                className="Modal-Container"
                onClick={ onOutsideClick }
                role="presentation"
            >
                <div
                    className="Modal"
                >
                    <div
                        className="Modal-Head"
                    >
                        <span
                            className="Modal-Title"
                        >
                            { title }
                        </span>
                        <Button
                            icon={ AiOutlineClose }
                            onClick={ onCloseClick }
                        />
                    </div>
                    <div
                        className="Modal-Content"
                    >
                        { children }
                    </div>
                </div>
            </div>
        )
    }

    return createPortal(renderModal(), modalRoot)
}

const Modal = props => {
    const {
        name,
        title,
        buttonText,
        buttonProps = {},
        children
    } = props
    const dispatch = useDispatch()
    const activeModal = useSelector(state => state.modal.activeModal)
    const isOpen = activeModal === name
    const modalRoot = document.getElementById('modal-root')

    const onOpenClick = () => {
        dispatch(modalActions.openModal({ name }))
    }

    const onCloseClick = () => {
        dispatch(modalActions.closeModal())
    }

    const renderButton = () => {
        return (
            <Button
                { ...buttonProps }
                onClick={ onOpenClick }
            >
                { buttonText }
            </Button>
        )
    }

    const onClick = e => {
        if (e.target.className === 'Modal-Container') {
            dispatch(modalActions.closeModal())
        }
    }

    const renderModal = () => {
        return (
            <div
                className="Modal-Container"
                onClick={ onClick }
                role="presentation"
            >
                <div
                    className="Modal"
                >
                    <div
                        className="Modal-Head"
                    >
                        <span
                            className="Modal-Title"
                        >
                            { title }
                        </span>
                        <Button
                            icon={ AiOutlineClose }
                            onClick={ onCloseClick }
                        />
                    </div>
                    <div
                        className="Modal-Content"
                    >
                        { children }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { renderButton() }
            { isOpen ? createPortal(renderModal(), modalRoot) : null }
        </>
    )
}

export default Modal
