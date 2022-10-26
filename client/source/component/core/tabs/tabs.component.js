import { useState } from 'react'
import Button from '../button/button.component'
import './tabs.style.scss'

const Tab = props => {
    const {
        children
    } = props

    return (
        <div
            className="Tab"
        >
            { children }
        </div>
    )
}

const Tabs = props => {
    const { children } = props
    const [activeTab, setActiveTab] = useState(0)

    const renderTabButton = (item, index = 0) => {
        const { label } = item.props

        const onClick = () => {
            setActiveTab(index)
        }

        return (
            <Button 
                modifiers={{ isActive: activeTab === index }}
                key={ index }
                onClick={ onClick }
            >
                { label }
            </Button>
        )
    }

    if (!children.length) {
        return null
    }

    return (
        <div
            className="Tabs"
        >
            <div
                className="Tabs-Head"
            >
                { children.length > 1 ? children.map(renderTabButton) : renderTabButton(children) }
            </div>
            <div
                className="Tabs-Content"
            >
                { children.length > 1 ? children[activeTab]?.props?.children : children?.props?.children }
            </div>
        </div>
    )
}

export {
    Tabs,
    Tab
}
