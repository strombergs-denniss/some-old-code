/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

/*
for (let a = 0; a < children.length; ++a) {
    const child = children[a]
    const node = {
        node: child,
        level,
        children: []
    }

    if (level === 2 && (a === 0 || a === children.length - 1) ) {
        const selection = document.getSelection()
        const isSelected = selection.containsNode(child, true)
        console.log(child)

        if (isSelected) {
            parent.children.push(node) 
            getSelectedNodes(node, child.children, level + 1)
        }
    } else {
        parent.children.push(node) 
        getSelectedNodes(node, child.children, level + 1)
    }
}



const children = []
const blocks = getSelectedBlocks()
getSelectedNodes({ children }, blocks)
const first = children[0].children[0]
const last = getLast(children[children.length - 1].children)
const selection = document.getSelection()
const range = selection.getRangeAt(0)
const { startOffset, endOffset } = range
first.isFirst = true
last.isLast = true

return {
    children,
    first,
    last,
    firstBlock: children[0],
    lastBlock: children[children.length - 1],
    offset: [startOffset, endOffset]
}


const getLast = array => {
    return array[array.length - 1]
}

    for (let a = 1; a < children.length -1; ++a) {
        const child = children[a]
        child.node.remove()
    }

    for (const child of firstBlock.children) {
        if (child.isFirst) {
            continue
        }

        child.node.remove()
    }

    for (const child of lastBlock.children) {
        if (child.isLast) {
            continue
        }

        child.node.remove()
    }

    first.node.innerHTML = first.node.innerHTML.substring(0, offset[0])
    last.node.innerHTML = last.node.innerHTML.substring(offset[1], last.node.innerHTML.length)
*/

import { useEffect, useRef, useState } from 'react'
import './index.scss'

const createBlock = (content, tag = 'div') => {
    const block = document.createElement(tag)
    block.dataset.type = 'block'

    if (Array.isArray(content)) {
        block.append(...content)
    } else {
        const inline = createInline(content ? content : document.createElement('br'))
        block.append(inline)
    }

    return block
}

const createInline = (content, tag = 'span', isEditable = true) => {
    const inline = document.createElement(tag)
    inline.dataset.type = 'inline'

    if (!isEditable) {
        inline.contentEditable = false
    }

    inline.append(content)

    return inline
}

const createEmote = code => {
    const emote = document.createElement('img')
    emote.src = 'https://via.placeholder.com/24'
    emote.alt = `:${ code }:`

    return createInline(emote, 'span', false)
}

const getBlock = node => {
    while (node && node.dataset?.type !== 'block') {
        node = node.parentElement
    }

    return node
}

const getInline = node => {
    while (node && node.dataset?.type !== 'inline') {
        node = node.parentElement
    }

    return node
}

const getSelectedBlocks = () => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)






    const blocks = [getSelectedInlines()]
    let block = getBlock(range.startContainer).nextElementSibling
    const lastBlock = getBlock(range.endContainer)

    while (block && selection.containsNode(block, true) && block !== lastBlock) {
        blocks.push(block)
        block = getBlock(block.nextElementSibling)
    }

    if (range.commonAncestorContainer.dataset?.type !== 'block') {
        blocks.push(getSelectedInlines(true))
    }

}

const getSelectedInlines = isEnd => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const inlines = []
    let inline = getInline(isEnd ? range.endContainer : range.startContainer)

    while (inline && selection.containsNode(inline, true)) {
        inlines.push(inline)
        inline = getInline(isEnd ? inline.previousElementSibling : inline.nextElementSibling)
    }

    return inlines
}

const setCaret = (node, offset) => {
    const selection = document.getSelection()
    const range = document.createRange()
    range.setStart(node, offset)
    selection.removeAllRanges()
    selection.addRange(range)
}


/*
    const { key } = e
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const { startContainer } = range

    if (selection.isCollapsed) {
        if (startContainer.dataset?.type === 'block') {
            e.preventDefault()

            const inline = createInline(key)
            startContainer.append(inline)
            setCaret(inline, 1)
        }
    } else {
        e.preventDefault()
        console.log(getSelectedBlocks())
        
        //deleteSelection()
    }
*/



/*
    message type: default

    blocks
        blocks
            inlines
                text
                void
        inlines
            text
            void
*/


/*
    const { target } = e
    const { children } = target
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    let index = 0
    const blocks = []

    for (const child of children) {
        if (selection.containsNode(child, true)) {
            const { children: childChildren } = child
            const block = {
                node: child,
                children: []
            }

            for (const childChild of childChildren) {
                if (selection.containsNode(childChild, true)) {
                    const blockOrInline = {
                        node: childChild
                    }

                    block.children.push(blockOrInline)
                }
            }

            blocks.push(block)
            index++
        }
    }

    console.log(blocks)
*/


const getBlocks = () => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const { startContainer } = range
    const blocks = []
    let block = getBlock(startContainer)

    while (block && selection.containsNode(block, true)) {
        blocks.push(block)
        block = block.nextElementSibling
    }

    return blocks
}

const getBlockChildren = block => {
    const selection = document.getSelection()
    const { children } = block


}

const test = () => {
    const blocks = getBlocks()
    const firstBlock = blocks[0]
    const lastBlock = blocks[blocks.length - 1]
    
    getBlockChildren(firstBlock)
}

const recursive = (node, level = 1) => {
    const { children } = node

    for (const child of children) {
        console.log(child, level)

        recursive(child, level + 1)
    }
}

const handleChar = e => {
    e.preventDefault()

    recursive(e.target)
}

const deleteSelection = () => {
    const { blocks, offset } = getSelectedBlocks()
    const selection = document.getSelection()
    let first = null
    let last = null

    for (let a = 0; a < blocks.length; ++a) {
        const block = blocks[a]

        if (Array.isArray(block)) {
            for (let b = 0; b < block.length; ++b) {
                const inline = block[b]

                if (a === 0 && b === 0) {
                    inline.innerHTML = inline.innerHTML.substring(0, offset[0])
                    first = inline

                    if (!inline.innerHTML) {
                        inline.remove()
                    }

                } else if (a === blocks.length - 1 && b === block.length - 1) {
                    inline.innerHTML = inline.innerHTML.substring(offset[1], inline.innerHTML.length)
                    last = inline

                    if (!inline.innerHTML) {
                        inline.remove()
                    }
                } else {
                    inline.remove()
                }
            }
        } else {
            block.remove()
        }
    }

    if (first && last) {
        first.innerHTML += last.innerHTML
    }

    if (blocks.length > 1) {
        const lastBlock = getBlock(last)
        
        if (lastBlock) {
            lastBlock.remove()
        }
    }

    console.log(first)
    setCaret(first, 1)
}

const handleSoftBreak = e => {
    e.preventDefault()
}

const Test = () => {
    const ref = useRef()

    useEffect(() => {
        const {
            current
        } = ref

        if (!current) {
            return
        }

        current.append(...[
            createBlock([
                createInline('Inline '),
                createEmote('Emote'),
                createInline('Inline')
            ]),
            createBlock([
                createInline('Inline')
            ]),
            createBlock([
                createInline('Inline '),
                createEmote('Emote'),
                createInline('Inline')
            ])
        ])
    }, [])

    const onKeyDown = e => {
        const {
            altKey,
            metaKey,
            ctrlKey,
            shiftKey,
            key
        } = e

        if (altKey || metaKey) {
            e.preventDefault()

            return
        }

        if (key === 'a' && ctrlKey && !shiftKey) {
            return
        }

        if (ctrlKey) {
            e.preventDefault()

            return
        }

        if (key.length === 1) {
            handleChar(e)

            return
        }

        if (key === 'Enter' && shiftKey) {
            handleSoftBreak(e)

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
            return
        }

        e.preventDefault()
    }

    const onCopy = e => {
        e.preventDefault()

        return
    }

    const onPaste = e => {
        e.preventDefault()

        return
    }

    const onDragStart = e => {
        e.preventDefault()

        return
    }

    return (
        <div
            ref={ ref }
            className="Editable"
            contentEditable
            onKeyDown={ onKeyDown }
            onCopy={ onCopy }
            onPaste={ onPaste }
            onDragStart={ onDragStart }
        />
    )
}

export default Test
