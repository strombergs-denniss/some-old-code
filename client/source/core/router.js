import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from '@route/chat/chat.route'
import Notifications from '@component/core/notifications/notifications.component'
import Synchronizer from '@component/custom/synchronizer/synchronizer.component'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    exact
                >
                    <Chat />
                </Route>
            </Switch>
            <Synchronizer />
            <Notifications />
        </BrowserRouter>
    )
}

export default Router
