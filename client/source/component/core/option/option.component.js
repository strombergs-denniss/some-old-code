const Option = props => {
    const {
        children
    } = props

    return (
        <option
            className="Option"
        >
            { children }
        </option>
    )
}

export default Option
