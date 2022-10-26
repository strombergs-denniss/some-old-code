const Image = props => {
    const {
        src,
        width,
        height,
        alt
    } = props

    return (
        <img
            className="Image"
            src={ src }
            width={ width }
            height={ height }
            alt={ alt }
        />
    )
}

export default Image
