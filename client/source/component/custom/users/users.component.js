import { useSelector } from 'react-redux'
import { List, ListItem } from '@component/core/list/list.component'
import './users.style.scss'

const Users = () => {
    const users = useSelector(state => state.user.users)

    const renderItem = (user, index) => {
        const {
            name,
            alias,
            picture
        } = user

        return (
            <ListItem
                key={ index }
            >
                <img
                    className="Users-Picture"
                    src={ picture }
                    width="48"
                    height="48"
                />
                <span>
                    { alias || name }
                </span>
            </ListItem>
        )
    }

    return (
        <div
            className="Users"
        >
            <div
                className="Users-Head"
            />
            <div
                className="Users-Content"
            >
                <List>
                    { users.map(renderItem) }
                </List>
            </div>
        </div>
    )
}

export default Users
