const OptionGroup = props => {
    const {
        label,
        children
    } = props

    return (
        <optgroup
            className="OptionGroup"
            label={ label }
        >
            { children }
        </optgroup>
    )
}

export default OptionGroup
