/* eslint-disable no-unused-vars */

import { createRef, useEffect } from 'react'
import './index.scss'

const isBlockEnd = () => {
    return true
}

const createEmote = code => {
    const emote = document.createElement('img')
    emote.className = 'Emote'
    emote.src = 'https://via.placeholder.com/24'
    emote.width = 24
    emote.height = 24
    emote.alt = code

    return emote
}

const getSelectionNodes = () => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const {
        startContainer,
        startOffset,
        endOffset
    } = range
    let container = startContainer
    const nodes = []

    while (container && selection.containsNode(container)) {
        nodes.push(container)
        container = container.nextSibling
    }

    return nodes
}

const getSelectedBlock = () => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)

    if (range.startContainer?.className === 'Block') {
        return range.startContainer
    }

    if (range.startContainer?.parentNode?.className === 'Block') {
        return range.startContainer.parentNode
    }

    if (range.startContainer?.parentNode?.parentNode?.className === 'Block') {
        return range.startContainer.parentNode.parentNode
    }

    console.log(selection)
}

const createBlock = content => {
    const block = document.createElement('div')
    block.className = 'Block'

    if (content) {
        block.append(content)
    } else {
        block.append(document.createElement('br'))
    }

    return block
}

const createInline = () => {
    const inline = document.createElement('span')
    inline.className = 'Inline'

    return inline
}

const insertBlock = () => {
    const selection = document.getSelection()

    if (selection.isCollapsed) {
        if (isBlockEnd()) {
            // const block = createBlock()
            // const range = document.createRange()
            // range.setStart(block, 0)
            // selection.removeAllRanges()
            // selection.addRange(range)

            const selectedBlock = getSelectedBlock()
            console.log(selectedBlock)
        }

        console.log('collapsed')
    } else {
        // Not collapsed
    }
}

const insertInline = () => {

}




const test = e => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const {
        startContainer,
        startOffset
    } = range
    let container = startContainer
    const nodes = []

    while (container && container.className !== 'Block') {
        nodes.push(container)
        container = container.nextSibling
    }
 
    console.log(nodes)
    if (nodes[0].nodeType === 3) {
        const node0 = nodes[0].textContent
        nodes[0].data = node0.substring(0, startOffset)


        const selectedBlock = getSelectedBlock()
        const block = createBlock(node0.substring(startOffset, node0.length))

        if (selectedBlock.nextSibling) {
            e.target.insertBefore(block, selectedBlock.nextSibling)
        } else {
            e.target.append(block)
        }

        const range = document.createRange()
        range.setStart(block, 0)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    return nodes
}

const Test = () => {
    const onKeyDown = e => {
        const {
            altKey,
            metaKey,
            ctrlKey,
            shiftKey,
            key,
            target
        } = e
        const charCode = key.charCodeAt(0)

        if (altKey || metaKey) {
            e.preventDefault()

            return
        }

        if (key === 'a' && ctrlKey && !shiftKey) {
            e.preventDefault()

            return null
        }

        if (key === 'x' && ctrlKey && !shiftKey) {
            e.preventDefault()

            return null
        }

        if (key === 'c' && ctrlKey && !shiftKey) {
            e.preventDefault()

            return null
        }

        if (key === 'v' && ctrlKey && !shiftKey) {
            e.preventDefault()

            return null
        }

        if (key === 'b' && ctrlKey && !shiftKey) {
            e.preventDefault()
            test(e)

            return null
        }

        if (ctrlKey) {
            e.preventDefault()

            return
        }

        if (key.length === 1 && charCode >= 32 && charCode <= 126) {
            if (target.innerHTML === '') {
                e.preventDefault()
                const selection = document.getSelection()
                const block = createBlock(key)
                target.append(block)
                const range = document.createRange()
                range.setStart(block, 1)
                selection.removeAllRanges()
                selection.addRange(range)
            }

            return
        }

        if (key === 'Enter' && shiftKey) {
            e.preventDefault()
            const selectedBlock = getSelectedBlock()
            const selection = document.getSelection()
            const block = createBlock()

            if (selectedBlock.nextSibling) {
                target.insertBefore(block, selectedBlock.nextSibling)
            } else {
                target.append(block)
            }

            const range = document.createRange()
            range.setStart(block, 0)
            selection.removeAllRanges()
            selection.addRange(range)

            return
        }

        if (shiftKey) {
            e.preventDefault()

            return
        }

        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].indexOf(key) > -1) {
            return
        }

        if (key === 'Backspace') {
            e.preventDefault()

            return
        }

        if (key === 'Enter') {
            e.preventDefault()

            return
        }

        e.preventDefault()
    }

    const onKeyUp = e => {
        e.preventDefault()

        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const data = selection.anchorNode.data

        if (data) {
            const {
                0: match,
                index
            } = data.match(/:[\w-]+:/) || {}

            if (match && index !== undefined) {
                const emote = createEmote(match)
                range.setStart(selection.anchorNode, index)
                range.setEnd(selection.anchorNode, index + match.length)
                range.deleteContents()
                range.insertNode(emote)
                range.collapse()
            }
        }
    }

    return (
        <div
            className="Editable"
            contentEditable
            onKeyDown={ onKeyDown }
            onKeyUp={ onKeyUp }
        />
    )
}

export default Test
