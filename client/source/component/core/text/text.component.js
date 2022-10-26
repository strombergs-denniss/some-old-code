const ALLOWED_TEXT_TYPES = [
    'abbr',
    'address',
    'b',
    'bdi',
    'bdo',
    'blockquote',
    'cite',
    'code',
    'data',
    'del',
    'dfn',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'i',
    'ins',
    'kbd',
    'mark',
    'p',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'time',
    'u',
    'var'
]

const Text = props => {
    const {
        element: Tag = 'span',
        children
    } = props

    return (
        <Tag
            className="Text"
        >
            { children }
        </Tag>
    )
}

export default Text
