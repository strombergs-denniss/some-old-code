import './attachment.style.scss'
import { AiOutlineFileText } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import Button from '@component/core/button/button.component'

const Attachment = props => {
    const {
        attachment: {
            file,
            file: {
                name: fileName,
                type
            }
        },
        onAttachmentDelete,
        index
    } = props
    const src = window.URL.createObjectURL(file)
    const mainType = type.split('/')[0]

    const renderMap = {
        image: () => {
            return (
                <img
                    className="Attachment-Preview_Image"
                    src={ src }
                    width="64"
                    height="64"
                />
            )
        },
        text: () => {
            return (
                <div
                    className="Attachment-Preview_Text"
                >
                    <span>
                        <AiOutlineFileText
                            size={ 48 }
                        />
                    </span>
                    <span>
                        { fileName }
                    </span>
                </div>
            )
        }
    }

    const onClick = () => {
        onAttachmentDelete(index)
    }

    return (
        <div
            className="Attachment"
        >
            <div
                className="Attachment-Control"
            >
                <Button
                    icon={ MdClose }
                    onClick={ onClick }
                />
            </div>
            { renderMap[mainType]() }
        </div>
    )
}

export default Attachment
