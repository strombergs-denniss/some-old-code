import { useForm } from 'react-hook-form'
import Form from '@component/core/form/form.component'
import TextField from '@component/core/text-field/text-field.component'
import Button from '@component/core/button/button.component'
import channelQuery from '@logic/channel/channel.query'
import { useDispatch } from 'react-redux'
import { notificationActions } from '@logic/notification/notification.slice'
import { modalActions } from '@logic/modal/modal.slice'
import { channelActions } from '@logic/channel/channel.slice'

const CreateChannel = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const onSubmit = async data => {
        const channel = await channelQuery.create(data)

        if (channel) {
            dispatch(notificationActions.openNotification({
                title: 'Channel created!',
                variant: 'success',
                lifeTime: 2000
            }))
            dispatch(modalActions.closeModal())
            dispatch(channelActions.create(channel))
        }
    }

    return (
        <div
            className="CreateChannel"
        >
            <Form
                onSubmit={ handleSubmit(onSubmit) }
            >
                <TextField
                    name="name"
                    type="text"
                    placeholder="Name"
                    register={ register }
                    errors={ errors }
                    shouldShowLabel
                />
                <Button
                    type="submit"
                    variant="solid"
                >
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreateChannel
