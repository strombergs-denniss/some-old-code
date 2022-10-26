import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { bem } from '@core/utility'
import './checkbox.style.scss'
import { useWatch } from 'react-hook-form'

const Checkbox = props => {
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
                <MdCheckBoxOutlineBlank
                    size={ 24 }
                />
            )
        }

        return (
            <MdCheckBox
                size={ 24 }
            />
        )
    }

    return (
        <div
            className={ bem('Checkbox', '', [isInline ? 'isInline' : '']) }
        >
            <label
                className="Checkbox-Label"
            >
                <span
                    className="Checkbox-Box"
                >
                    { renderBoxIcon() }
                </span>
                <input
                    className="Checkbox-Input"
                    type="checkbox"
                    name={ name }
                    value={ value }
                    { ...register(name) }
                />
                <span
                    className="Checkbox-LabelText"
                >
                    { label }
                </span>
            </label>
        </div>
    )
}

export default Checkbox
