import { bem } from '@core/utility'
import Link from '../link/link.component'
import './list.style.scss'

// eslint-disable-next-line no-unused-vars
const ALLOWED_LIST_TYPES = [
    'ul',
    'ol'
]

const ListItemButton = props => {
    const {
        children,
        onClick = e => e.preventDefault()
    } = props

    return (
        <Link
            className="List-ItemButton"
            onClick={ onClick }
            href=""
        >
            { children }
        </Link>
    )
}

const ListItem = props => {
    const {
        isActive,
        children
    } = props
    const className = bem('List', 'Item', { isActive })

    return (
        <li
            className={ className }
        >
            { children }
        </li>
    )
}

const List = props => {
    const {
        tag: Tag = 'ul',
        children
    } = props

    return (
        <Tag
            className="List"
        >
            { children }
        </Tag>
    )
}

export {
    List,
    ListItem,
    ListItemButton
}
