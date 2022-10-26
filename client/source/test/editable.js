/* eslint-disable no-unused-vars */

const createBlock = (content, tag = 'div', isEditable) => {
    const block = document.createElement(tag)
    block.dataset.type = 'block'

    if (isEditable !== undefined) {
        block.contentEditable = isEditable
    }

    if (Array.isArray(content)) {
        block.append(...content)
    } else {
        block.append(createInline(content ? content : document.createElement('br')))
    }

    return block
}

const createInline = (content, tag = 'span', isEditable) => {
    const inline = document.createElement(tag)
    inline.dataset.type = 'inline'

    if (isEditable !== undefined) {
        inline.contentEditable = isEditable
    }

    inline.append(content)

    return inline
}

const createEmote = code => {
    const emote = document.createElement('img')
    emote.className = 'Emote'
    emote.src = 'https://via.placeholder.com/24'
    emote.alt = `:${ code }:`

    return createInline(emote, 'span', false)
}


const createBold = content => {
    return createInline(content, 'b')
}

const getSelectedBlock = node => {
    while (node && node.dataset?.type !== 'block') {
        node = node.parentElement
    }

    return node
}

const getSelectedInline = node => {
    while (node && node.dataset?.type !== 'inline') {
        node = node.parentElement
    }

    return node
}

const getSelectedBlocks = () => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const { startContainer } = range
    const blocks = []
    let block = getSelectedBlock(startContainer)

    while (block && selection.containsNode(block, true)) {
        blocks.push(block)
        block = block.nextElementSibling
    }

    return blocks
}

const getInlines = block => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const { startOffset, endOffset }= range
    const { children } = block
    const selectedInlines = []
    const outerInlines = []

    for (const child of children) {
        if (selection.containsNode(child, true)) {
            selectedInlines.push(child)
        } else {
            outerInlines.push(child)
        }
    }

    const firstInline = selectedInlines[0]
    const lastInline = selectedInlines[selectedInlines.length - 1]
    const innerInlines = []

    for (let a = 1; a < selectedInlines.length - 1; ++a) {
        innerInlines.push(selectedInlines[a])
    }

    return {
        innerInlines,
        outerInlines,
        firstInline,
        lastInline,
        isTotal: children.length === selectedInlines.length && !startOffset && (lastInline.innerHTML.length === endOffset || !endOffset),
        count: selectedInlines.length
    }
}

const getSelection = () => {
    const selection = document.getSelection()
    const range = selection.getRangeAt(0)
    const { commonAncestorContainer, startOffset, endOffset } = range

    if (selection.isCollapsed) {
        return {
            block: getSelectedBlock(commonAncestorContainer),
            inline: getSelectedInline(commonAncestorContainer),
            offset: startOffset,
            isCollapsed: true
        }
    }

    const blocks = getSelectedBlocks()
    const firstBlock = blocks[0]
    const lastBlock = blocks[blocks.length - 1]
    const innerBlocks = []

    for (let a = 1; a < blocks.length - 1; ++a) {
        innerBlocks.push(blocks[a])
    }

    const firstBlockInlines = getInlines(firstBlock)
    const lastBlockInlines = firstBlock !== lastBlock ? getInlines(lastBlock) : firstBlockInlines

    return {
        firstBlock: {
            node: firstBlock,
            ...firstBlockInlines
        },
        lastBlock: {
            node: lastBlock,
            ...lastBlockInlines
        },
        innerBlocks,
        offset: [
            startOffset,
            endOffset
        ],
        count: blocks.length
    }
}

const deleteSelection = selection => {
    const { firstBlock, lastBlock, innerBlocks, offset, count, isCollapsed } = selection

    if (isCollapsed) {
        return
    }

    if (firstBlock.isTotal) {
        firstBlock.node.remove()
    } else {
        for (const inline of firstBlock.innerInlines) {
            inline.remove()
        }
    }

    if (count > 1) {
        if (lastBlock.isTotal) {
            lastBlock.node.remove()
        } else {
            for (const inline of lastBlock.innerInlines) {
                inline.remove()
            }
        }


        if (firstBlock.count > 1) {
            firstBlock.lastInline.remove()
        }

        if (lastBlock.count > 1) {
            lastBlock.firstInline.remove()
        }
    }

    for (const innerBlock of innerBlocks) {
        innerBlock.remove()
    }

    const firstInline = firstBlock.firstInline
    const lastInline = lastBlock.lastInline




    if (firstInline.firstChild.nodeType === 3 && lastInline.firstChild.nodeType === 3) {
        firstInline.innerHTML = firstInline.innerHTML.substring(0, offset[0])
        lastInline.innerHTML = lastInline.innerHTML.substring(offset[1], lastInline.innerHTML.length)
        firstInline.innerHTML += lastInline.innerHTML
        lastInline.remove()
    }

    for (const inline of lastBlock.outerInlines) {
        console.log(inline)
        firstBlock.node.append(inline)
    }

    if (!lastBlock.children.length) {
        lastBlock.node.remove()
    }
}

const mergeBlocks = (firstBlock, lastBlock) => {

}

const wrapSelection = selection => {

}

const serialize = () => {

}


export {
    createBlock,
    createInline,
    createEmote,
    createBold,
    getSelectedBlock,
    getSelectedInline,
    getSelectedBlocks,
    getInlines,
    getSelection,
    deleteSelection,
    mergeBlocks,
    wrapSelection,
    serialize
}
