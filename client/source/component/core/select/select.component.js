const Select = props => {
    const {
        label,
        id,
        name,
        children
    } = props

    return (
        <div
            className="Select"
        >
            <select
                className="Select-Input"
                id={ id }
                name={ name }
            >
                { children }
            </select>
            <label
                className="Select-Label"
                htmlFor={ id }
            >
                { label }
            </label>
        </div>
    )
}

export default Select
