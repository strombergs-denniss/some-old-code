
import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import Modal from '@component/core/modal/modal.component'
import Button from '@component/core/button/button.component'
import UserSettings from '../user-settings/user-settings.component'
import ServerSettings from '../server-settings/server-settings.component'
import { Tab, Tabs } from '@component/core/tabs/tabs.component'
import Channels from '../channels/channels.component'
import Users from '../users/users.component'
import accessRequest from '@logic/access/access.request'
import './menu.style.scss'

const Menu = () => {
    const onRevoke = async () => {
        accessRequest.revoke().then(() => {
            window.location.reload()
        })
    }

    return (
        <div
            className="Menu"
        >
            <div
                className="Menu-Head"
            >
                <Modal
                    name="user_settings"
                    title="User Settings"
                    buttonProps={{
                        icon: AiOutlineUser
                    }}
                >
                    <UserSettings />
                </Modal>
                <Modal
                    name="server_settings"
                    title="Server Settings"
                    buttonProps={{
                        icon: AiOutlineSetting
                    }}
                >
                    <ServerSettings />
                </Modal>
                <Button
                    icon={ AiOutlineLogout }
                    onClick={ onRevoke }
                />
            </div>
            <div
                className="Menu-Content"
            >
                <Tabs>
                    <Tab
                        label="Channels"
                    >
                        <Channels />
                    </Tab>
                    <Tab
                        label="Users"
                    >
                        <Users />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Menu
