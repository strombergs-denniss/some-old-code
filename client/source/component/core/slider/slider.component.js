const Slider = props => {
    const {
        onChange,
        value,
        min,
        max,
        step,
        label,
        id,
        name
    } = props

    return (
        <div
            className="Slider"
        >
            <input
                className="Slider-Input"
                type="range"
                onChange={ onChange }
                value={ value }
                min={ min }
                max={ max }
                step={ step }
                id={ id }
                name={ name }
            />
            <label
                className="Slider-Label"
                htmlFor={ id }
            >
                { label }
            </label>
        </div>
    )
}

export default Slider
