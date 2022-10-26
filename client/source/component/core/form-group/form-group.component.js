import './form-group.style.scss'

const FormGroup = props => {
    const {
        label,
        children
    } = props

    return (
        <fieldset
            className="FormGroup"
        >
            <legend
                className="FormGroup-Label"
            >
                { label }
            </legend>
            <div
                className="FormGroup-Content"
            >
                { children }
            </div>
        </fieldset>
    )
}

export default FormGroup
