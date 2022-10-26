/* eslint-disable no-unused-vars */

import { useEffect, useRef } from 'react'
import { createBlock, createBold, createEmote, createInline, deleteSelection, getSelection } from './editable'
import './index.scss'

const Test = () => {
    const ref = useRef(null)

    useEffect(() => {
        const { current } = ref

        current.append(...[
            createBlock([
                createInline('Inline '),
                createEmote('emote'),
                createInline(' Inline')
            ]),
            createBlock([
                createEmote('emote'),
                createInline(' '),
                createEmote('emote'),
                createInline(' '),
                createEmote('emote'),
                createInline(' ')
            ]),
            createBlock([
                createInline('Inline '),
                createBold('Bold'),
                createInline(' Inline')
            ])
        ])
    }, [])

    const onKeyDown = e => {
        e.preventDefault()

        const selection = getSelection()
        deleteSelection(selection)
    }

    const onCopy = e => {
        e.preventDefault()
    }

    const onPaste = e => {
        e.preventDefault()
    }

    const onDragStart = e => [
        e.preventDefault()
    ]

    return (
        <div
            ref={ ref }
            className="Editable"
            contentEditable
            onKeyDown={onKeyDown }
            onCopy={ onCopy }
            onPaste={ onPaste }
            onDragStart={ onDragStart }
        />
    )
}

export default Test
