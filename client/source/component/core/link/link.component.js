import './link.style.scss'

const Link = props => {
    const {
        children,
        href,
        onClick
    } = props

    return (
        <a
            className="Link"
            href={ href }
            onClick={ onClick }
        >
            { children }
        </a>
    )
}

export default Link
