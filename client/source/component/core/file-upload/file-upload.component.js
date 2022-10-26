import { bem, fetchFile } from '@core/utility'
import { useWatch } from 'react-hook-form'
import './file-upload.style.scss'

const FileUpload = props => {
    const {
        variant,
        allow,
        label,
        name,
        setValue,
        control,
        shouldShowLabel
    } = props
    const value = useWatch({ name: 'picture', control })
    const className = bem('FileUpload', '', { variant, shouldShowLabel })

    const onChange = async e => {
        const file = e.target.files[0]
        const data = new FormData()
        data.append('file', file)

        fetchFile(data).then(data => data.json()).then(data => {
            setValue(name, data.path)
        })
    }

    return (
        <div
            className={ className }
        >
            <span
                className="FileUpload-LabelText"
            >
                { label }
            </span>
            <input
                className="FileUpload-Input"
                type="file"
                allow={ allow }
                id={ name }
                name={ name }
                onChange={ onChange }
            />
            <label
                style={{ '--url': value }}
                className="FileUpload-Label"
                htmlFor={ name }
            >
                <img
                    src={ value }
                />
                <span>
                    { label }
                </span>
            </label>
        </div>
    )
}

export default FileUpload
