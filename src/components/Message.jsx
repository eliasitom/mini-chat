import "../stylesheets/Message.css"

export const Message = ({myMessage}) => {
    return (
        <div className={`message-main ${myMessage ? "my-message" : ""}`}>
            <div className="message-content">
                <p>Lorem ipsum dolor sit amet consectetur!</p>
            </div>
            <div className="message-arrow"/>
        </div>
    )
}