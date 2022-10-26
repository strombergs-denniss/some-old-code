import { bem } from '@core/utility'
import './text-field.scss'

// eslint-disable-next-line no-unused-vars
const ALLOWED_TEXT_FIELD_TYPES = [
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url'
]

const TextField = props => {
    const {
        register = () => {},
        errors = {},
        variant = 'solid',
        shape,
        type,
        name,
        placeholder,
        icon: Icon,
        label,
        shouldShowLabel
    } = props
    const id = Math.round(Math.random() * 100000000)
    const inputClassName = bem('TextField', 'Input', { variant, shape, hasIcon: !!Icon, shouldShowLabel })

    const renderError = () => {
        if (!errors[name]) {
            return null
        }

        return (
            <span
                className="TextField-Error"
            >
                { errors.name }
            </span>
        )
    }

    const renderIcon = () => {
        if (!Icon) {
            return null
        }

        return (
            <span
                className="TextField-Icon"
            >
                <Icon
                    size={ 18 }
                />
            </span>
        )
    }

    return (
        <div
            className="TextField"
        >
            { renderIcon() }
            <input
                className={ inputClassName }
                type={ type }
                id={ id }
                name={ name }
                placeholder={ placeholder }
                { ...register(name) }
            />
            <label
                className="TextField-Label"
                htmlFor={ id }
            >
                { label }
            </label>
            { renderError() }
        </div>
    )
}

export default TextField
