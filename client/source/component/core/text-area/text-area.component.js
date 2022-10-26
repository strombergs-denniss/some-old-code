const TextArea = props => {
    const {
        register,
        errors,
        name,
        label,
        placeholder,
        children
    } = props

    return (
        <div
            className="TextArea"
        >
            <textarea
                className="TextArea-Input"
                name={ name }
                placeholder={ placeholder }
                { ...register(name) }
            >
                { children }
            </textarea>
            <label
                className="TextArea-Label"
                htmlFor={ name }
            >
                { label }
            </label>
        </div>
    )
}

export default TextArea
