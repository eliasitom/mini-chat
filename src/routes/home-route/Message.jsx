import { useContext } from "react"
import "../../stylesheets/Message.css"
import { DataContext } from "../../context/DataContext"

export const Message = ({from, body}) => {
    const {myUser} = useContext(DataContext)

    return (
        <div className={`message-main ${from === myUser.username ? "my-message" : ""}`}>
            <div className="message-content">
                <p>{body}</p>
            </div>
            <div className="message-arrow"/>
        </div>
    )
}