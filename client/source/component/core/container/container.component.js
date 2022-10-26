const ALLOWED_CONTAINER_TYPES = [
    'article',
    'aside',
    'div',
    'footer',
    'header',
    'main',
    'nav',
    'section'
]

const Container = props => {
    const {
        element: Tag = 'div',
        children
    } = props

    return (
        <Tag
            className="Container"
        >
            { children }
        </Tag>
    )
}

export default Container
