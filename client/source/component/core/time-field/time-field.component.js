import { bem } from '@core/utility'
import './time-field.scss'

const ALLOWED_TIME_FIELD_TYPES = [
    'date',
    'datetime-local',
    'month',
    'time',
    'week'
]

const TimeField = props => {
    const {
        variant = 'solid',
        shape,
        type,
        name,
        placeholder,
        label
    } = props
    const id = Math.round(Math.random() * 100000000)
    const inputClassName = bem('TimeField', 'Input', { variant, shape })

    return (
        <div
            className="TimeField"
        >
            <input
                className={ inputClassName }
                type={ type }
                id={ id }
                name={ name }
                placeholder={ placeholder }
            />
            <label
                className="TimeField-Label"
                htmlFor={ id }
            >
                { label }
            </label>
        </div>
    )
}

export default TimeField
