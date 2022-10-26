/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Editable, withReact, useSlate, Slate, useSelected, useFocused} from 'slate-react'
import { Editor, Transforms, createEditor, Descendant, Element as SlateElement, Range } from 'slate'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'
import isUrl from 'is-url'

const initialValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: 'Text'
            }
        ]
    }
]

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)

    return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const withMentions = editor => {
    const { isInline, isVoid } = editor
  
    editor.isInline = element => {
        return element.type === 'mention' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'mention' ? true : isVoid(element)
    }

    return editor
}

const insertMention = (editor, character) => {
    const mention = {
        type: 'mention',
        character,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

const Element = props => {
    const { attributes, children, element } = props

    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'link':
            return <LinkComponent {...props} />
        case 'mention':
            return <Mention {...props} />
        default:
            return (
                <p
                    { ...attributes }
                >
                    { children }
                </p>
            )
    }
}

const Leaf = ({ attributes, children, leaf }) => {

    if (leaf.bold) {
        children = (
            <strong>
                {children}
            </strong>
        )
    }

    if (leaf.code) {
        children = (
            <code>
                {children}
            </code>
        )
    }

    if (leaf.italic) {
        children = (
            <em>
                {children}
            </em>
        )
    }

    if (leaf.underline) {
        children = (
            <u>
                {children}
            </u>
        )
    }

    return (
        <span
            { ...attributes }
        >
            { children }
        </span>
    )
}

const LinkComponent = ({ attributes, children, element }) => {
    const selected = useSelected()
    return (
        <a
            {...attributes}
            href={ element.url }
            style={{ backgroundColor: selected ? 'red' : 'white' }}

        >
            {children}
        </a>
    )
}

const Emote = () => {

}


const Toolbar = props => {
    const {
        children
    } = props

    return (
        <div
            className="Toolbar"
        >
            { children }
        </div>
    )
}

const Button = props => {
    const {
        children,
        type = 'button',
        onClick,
        onMouseDown,
        active
    } = props

    return (
        <button
            className="Button"
            type={ type }
            onClick={ onClick }
            onMouseDown={ onMouseDown }
            style={{ backgroundColor: active ? 'red' : 'white' }}
        >
            { children }
        </button>
    )
}

const MarkButton = ({ format, children }) => {
    const editor = useSlate()

    const onMouseDown = e => {
        e.preventDefault()
        toggleMark(editor, format)
    }

    return (
        <Button
            active={ isMarkActive(editor, format) }
            onMouseDown={ onMouseDown }
        >
            { children }
        </Button>
    )
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type),
        split: true,
    })

    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }

    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const isBlockActive = (editor, format) => {
    const { selection } = editor

    if (!selection) return false

    const [match] = Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}

const BlockButton = ({ format, children }) => {
    const editor = useSlate()

    const onMouseDown = e => {
        e.preventDefault()
        toggleBlock(editor, format)
    }

    return (
        <Button
            active={ isBlockActive(editor, format) }
            onMouseDown={ onMouseDown }
        >
            { children }
        </Button>
    )
}

const withInlines = editor => {
    const { insertData, insertText, isInline } = editor

    editor.isInline = element =>
        ['link', 'button', 'emote'].includes(element.type) || isInline(element)

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
    
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}
  
const insertButton = editor => {
    if (editor.selection) {
        wrapButton(editor)
    }
}


const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })

    return !!link
}

const isButtonActive = editor => {
    const [button] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
    })

    return !!button
}

const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}
  
const unwrapButton = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
    })
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }
  
    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }
  
    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

const wrapButton = editor => {
    if (isButtonActive(editor)) {
        unwrapButton(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const button = {
        type: 'button',
        children: isCollapsed ? [{ text: 'Edit me!' }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, button)
    } else {
        Transforms.wrapNodes(editor, button, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

const Mention = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()

    return (
        <span
            {...attributes}
            contentEditable={ false }
        >
            {children}
            <img
                width="24"
                height="24"
                src="https://via.placeholder.com/24"
            />
        </span>
    )
}


const Test = () => {
    const [value, setValue] = useState(initialValue)
    const editor = useMemo(() => withMentions(withInlines(withHistory(withReact(createEditor())))), [])
    const renderElement = useCallback(props => <Element { ...props } />, [])
    const renderLeaf = useCallback(props => <Leaf { ...props } />, [])

    const ref = useRef()
    const [target, setTarget] = useState()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')


    /*
    const onKeyDown = e => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, e)) {
                e.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            }
        }
    }
    */

    const onKeyDown = event => {
        const { selection } = editor
    
        // Default left/right behavior is unit:'character'.
        // This fails to distinguish between two cursor positions, such as
        // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
        // Here we modify the behavior to unit:'offset'.
        // This lets the user step into and out of the inline without stepping over characters.
        // You may wish to customize this further to only use unit:'offset' in specific cases.
        if (selection && Range.isCollapsed(selection)) {
            const { nativeEvent } = event
            if (isHotkey('left', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset', reverse: true })
                return
            }
            if (isHotkey('right', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset' })
                return
            }
        }

        if (target) {
            switch (event.key) {
                case ':':
                    event.preventDefault()
                    Transforms.select(editor, target)
                    insertMention(editor, search)
                    setTarget(null)
                    break
            }
        }
    }

    const onChange = value => {
        setValue(value)
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, { unit: 'word' })
            const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = before && Editor.range(editor, before, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)
            const beforeMatch = beforeText && beforeText.match(/^:(\w+)$/)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMatch && afterMatch) {
                setTarget(beforeRange)
                setSearch(beforeMatch[1])
                setIndex(0)
                return
            }
        }

        setTarget(null)
    }

    return (
        <div
            className="Test"
        >
            
            <Slate
                editor={ editor }
                value={ value }
                onChange={ onChange }
            >
                <Toolbar>
                    <MarkButton
                        format="bold"
                    >
                        Bold
                    </MarkButton>
                    <MarkButton
                        format="code"
                    >
                        Code
                    </MarkButton>
                    <MarkButton
                        format="italic"
                    >
                        Italic
                    </MarkButton>
                    <MarkButton
                        format="underline"
                    >
                        Underline
                    </MarkButton>
                    <BlockButton format="heading-one">H1</BlockButton>
                    <BlockButton format="heading-two">H2</BlockButton>
                    <BlockButton format="block-quote">Quote</BlockButton>
                    <BlockButton format="numbered-list">OL</BlockButton>
                    <BlockButton format="bulleted-list">UL</BlockButton>
                </Toolbar>
                <Editable
                    renderElement={ renderElement }
                    renderLeaf={ renderLeaf }
                    onKeyDown={ onKeyDown }
                    placeholder="Enter some rich text…"
                    spellCheck
                    autoFocus
                />
            </Slate>
        </div>
    )
}

export default Test
