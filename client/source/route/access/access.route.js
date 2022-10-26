import { useForm } from 'react-hook-form'
import Button from '@component/core/button/button.component'
import accessRequest from '@logic/access/access.request'
import { localStorage } from '@core/utility'
import TextField from '@component/core/text-field/text-field.component'
import './access.style.scss'

const Access = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async ({ name, password }) => {
        accessRequest.authorize(name, password)
            .then(data => data.json())
            .then((data) => {
                localStorage.setItem('USER', data)
                window.location.reload()
            })
            .catch(e => console.error(e))
    }

    return (
        <div className="Access-Container">
            <form onSubmit={ handleSubmit(onSubmit) } className="Access">
                <TextField
                    name="name"
                    type="text"
                    placeholder="Name"
                    register={ register }
                    errors={ errors }
                />
                <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                    register={ register }
                />
                <Button
                    type="submit"
                    variant="double"
                    isFullWidth
                >
                    Authorize
                </Button>
            </form>
        </div>
    )
}

export default Access
