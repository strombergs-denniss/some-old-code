const Form = props => {
    const {
        children,
        onSubmit
    } = props

    return (
        <form
            className="Form"
            onSubmit={ onSubmit }
        >
            { children }
        </form>
    )
}

export default Form
