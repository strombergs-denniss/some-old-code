import './emote.style.scss'

export const createEmote = code => {
    const emote = document.createElement('img')
    emote.className = 'Emote'
    emote.src = '/api/emote/' + code.replace(/:/g, '')
    emote.width = 24
    emote.height = 24
    emote.alt = code

    return emote
}

const Emote = props => {
    const {
        code
    } = props

    return (
        <img
            className="Emote"
            src={ '/api/emote/' + code }
            alt={ ':' + code + ':' }
            width="24"
            height="24"
        />
    )
}

export default Emote
