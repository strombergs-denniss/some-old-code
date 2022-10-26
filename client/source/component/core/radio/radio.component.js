import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'
import { bem } from '@core/utility'
import { useWatch } from 'react-hook-form'
import './radio.style.scss'

const Radio = props => {
    const {
        control,
        register,
        isInline,
        name,
        label,
        value
    } = props
    const watch = useWatch({ name, control })

    const renderBoxIcon = () => {
        if ((watch || []).indexOf(value) < 0) {
            return (
                <MdRadioButtonUnchecked
                    size={ 24 }
                />
            )
        }

        return (
            <MdRadioButtonChecked
                size={ 24 }
            />
        )
    }

    return (
        <div
            className={ bem('Radio', '', [isInline ? 'isInline' : '']) }
        >
            <label
                className="Radio-Label"
            >
                <span
                    className="Radio-Circle"
                >
                    { renderBoxIcon() }
                </span>
                <input
                    className="Radio-Input"
                    type="radio"
                    name={ name }
                    value={ value }
                    { ...register(name) }
                />
                <span
                    className="Radio-LabelText"
                >
                    { label }
                </span>
            </label>
        </div>
    )
}

export default Radio
