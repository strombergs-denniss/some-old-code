import { bem } from '@core/utility'
import './button.style.scss'

const Button = props => {
    const {
        variant,
        icon: Icon,
        iconAlignment = 'left',
        isFullWidth,
        modifiers = {},
        children,
        type = 'button',
        onClick
    } = props
    const className = bem('Button', '', { variant, isPureIcon: !children && !!Icon, ...modifiers, isFullWidth })

    const renderText = () => {
        if (!children) {
            return null
        }

        return (
            <span
                className="Button-Text"
            >
                { children }
            </span>
        )
    }

    const renderIcon = () => {
        if (!Icon) {
            return null
        }

        return (
            <span
                className="Button-Icon"
            >
                <Icon
                    size={ 18 }
                />
            </span>
        )
    }

    return (
        <button
            className={ className }
            type={ type }
            onClick={ onClick }
        >
            { iconAlignment === 'left' ? renderIcon() : null }
            { renderText() }
            { iconAlignment === 'right' ? renderIcon() : null }
        </button>
    )
}

export default Button
