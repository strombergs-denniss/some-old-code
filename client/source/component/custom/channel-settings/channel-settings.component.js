import { useForm } from 'react-hook-form'
import Form from '@component/core/form/form.component'
import TextField from '@component/core/text-field/text-field.component'
import Button from '@component/core/button/button.component'
import channelQuery from '@logic/channel/channel.query'
import { useDispatch, useSelector } from 'react-redux'
import { notificationActions } from '@logic/notification/notification.slice'
import { modalActions } from '@logic/modal/modal.slice'
import { channelActions } from '@logic/channel/channel.slice'

const ChannelSettings = () => {
    const dispatch = useDispatch()
    const {
        id,
        name
    } = useSelector(state => state.modal.payload) || {}
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name
        }
    })

    const onSubmit = async ({ name }) => {
        const channel = await channelQuery.update({
            id,
            name
        })

        if (channel) {
            dispatch(channelActions.update(channel))
            dispatch(modalActions.closeModal())
            dispatch(notificationActions.openNotification({
                variant: 'success',
                lifeTime: 2000,
                title: 'Channel saved!'
            }))
        }
    }

    const handleDelete = async () => {
        const channel = await channelQuery.delete({ id })

        if (channel) {
            dispatch(channelActions.delete(channel))
            dispatch(modalActions.closeModal())
            dispatch(notificationActions.openNotification({
                variant: 'success',
                lifeTime: 2000,
                title: 'Channel deleted!'
            }))
        }
    }

    return (
        <div
            className="ChannelSettings"
        >
            <Form
                onSubmit={ handleSubmit(onSubmit) }
            >
                <TextField
                    register={ register }
                    errors={ errors }
                    type="text"
                    name="name"
                    placeholder="Name"
                    label="Name"
                    shouldShowLabel
                />
                <Button
                    variant="solid"
                    type="submit"
                >
                    Save
                </Button>
                <Button
                    onClick={ handleDelete }
                >
                    Delete
                </Button>
            </Form>
        </div>
    )
}

export default ChannelSettings
