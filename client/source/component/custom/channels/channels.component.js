import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai'
import { List, ListItem, ListItemButton } from '@component/core/list/list.component'
import { channelActions } from '@logic/channel/channel.slice'
import Modal, { Portal, Trigger } from '@component/core/modal/modal.component'
import ChannelSettings from '../channel-settings/channel-settings.component'
import CreateChannel from '../create-channel/create-channel.component'
import './channels.style.scss'
import Button from '@component/core/button/button.component'

const Channels = () => {
    const dispatch = useDispatch()
    const channels = useSelector(state => state.channel.channels)
    const activeChannel = useSelector(state => state.channel.currentChannel)

    const renderItem = (channel, index) => {
        const {
            id,
            name
        } = channel

        const onClick = e => {
            e.preventDefault()
            dispatch(channelActions.setCurrentChannel(id))
        }

        return (
            <ListItem
                isActive={ id == activeChannel }
                key={ index }
            >
                <ListItemButton
                    onClick={ onClick }
                >
                    <span>
                        { name }
                    </span>
                    <Trigger
                        name="channel-settings"
                        component={ Button }
                        componentProps={{
                            icon: AiOutlineSetting
                        }}
                        title="Channel Settings"
                        payload={ channel }
                    />
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <>
            <div
                className="Channels"
            >
                <div
                    className="Channels-Head"
                >
                    <Modal
                        name="create-channel"
                        title="Create Channel"
                        buttonText="Create Channel"
                        buttonProps={{
                            icon: AiOutlinePlus
                        }}
                    >
                        <CreateChannel />
                    </Modal>
                </div>
                <div
                    className="Channels-Content"
                >
                    <List>
                        { channels.map(renderItem) }
                    </List>
                </div>
            </div>
            <Portal
                name="channel-settings"
            >
                <ChannelSettings />
            </Portal>
        </>
    )
}

export default Channels
