import { useSelector } from 'react-redux'
import Attachment from '../attachment/attachment.component'
import './attachments.style.scss'

const Attachments = () => {
    const attachments = useSelector(state => state.attachment.attachments)

    const renderAttachment = (attachment, index) => {
        return (
            <Attachment
                attachment={ attachment }
                index={ index }
                key={ index }
            />
        )
    }

    if (!attachments) {
        return null
    }

    return (
        <div
            className="Attachments"
        >
            { attachments.map(renderAttachment) }
        </div>
    )
}

export default Attachments
