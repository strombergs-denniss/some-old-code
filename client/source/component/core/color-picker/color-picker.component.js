const ColorPicker = props => {
    const {
        label,
        id,
        name
    } = props

    return (
        <div
            className="ColorPicker"
        >
            <input
                className="ColorPicker-Input"
                type="color"
                id={ id }
                name={ name }
            />
            <label
                className="ColorPicker-Label"
                htmlFor={ id }
            >
                { label }
            </label>
        </div>
    )
}

export default ColorPicker
