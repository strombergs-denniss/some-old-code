import { useForm } from 'react-hook-form'
import Form from '@component/core/form/form.component'
import TextField from '@component/core/text-field/text-field.component'
import Button from '@component/core/button/button.component'
import { useDispatch } from 'react-redux'
import { notificationActions } from '@logic/notification/notification.slice'
import { modalActions } from '@logic/modal/modal.slice'
import { localStorage } from '@core/utility'
import userQuery from '@logic/user/user.query'
import FileUpload from '../../core/file-upload/file-upload.component'

const UserSettings = () => {
    const dispatch = useDispatch()
    const {
        id,
        name,
        alias,
        picture
    } = localStorage.getItem('USER')
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        control
    } = useForm({
        defaultValues: {
            name,
            alias,
            picture
        }
    })

    const onSubmit = async ({ name, alias, picture }) => {
        const user = await userQuery.update({
            id,
            name,
            alias,
            picture
        })

        console.log(name, alias, picture)

        if (user) {
            localStorage.setItem('USER', user)
            dispatch(modalActions.closeModal())
            dispatch(notificationActions.openNotification({
                variant: 'success',
                lifeTime: 2000,
                title: 'User settings saved!'
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
                <TextField
                    register={ register }
                    errors={ errors }
                    type="text"
                    name="alias"
                    placeholder="Alias"
                    label="Alias"
                    shouldShowLabel
                />
                <FileUpload
                    variant="image"
                    register={ register }
                    setValue={ setValue }
                    control={ control }
                    name="picture"
                    placeholder="Picture"
                    label="Picture"
                    shouldShowLabel
                />
                <Button
                    variant="solid"
                    type="submit"
                >
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default UserSettings
