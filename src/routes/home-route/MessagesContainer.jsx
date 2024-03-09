import { useContext, useEffect, useState } from 'react';
import { Message } from './Message'
import generalData from "../../../genetalData.json"


import io from "socket.io-client"
import { DataContext } from '../../context/DataContext';
const socket = io(generalData.FLAT_API_URL);


export const MessagesContainer = () => {
  const { myUser, setMyUser, currentChat } = useContext(DataContext)

  const [chatData, setChatData] = useState(null)
  const [message, setMessage] = useState("")

  const getAnotherMember = () => {
    const currentChatCopy = new String(currentChat)
    return currentChatCopy.split("_").filter(elem => elem !== myUser.username)[0]
  }

  const submitMessage = (e) => {
    e.preventDefault()

    if (!currentChat || !message || !myUser) return

    const data = {
      message: {
        createdBy: myUser.username,
        body: message
      },
      chatName: currentChat
    }

    if (!chatData) {
      socket.emit("firstMessage", data)
    } else {
      socket.emit("message", data)

      let newChatData = { ...chatData }
      newChatData.messages = [...newChatData.messages, data.message]
      setChatData(newChatData)
    }
  }


  useEffect(() => {
    socket.on('message', (newChatData) => {
      setChatData(newChatData)
    });
    socket.on("firstMessageResponse", data => {
      setChatData(data.chatData)
      setMyUser(data.userData)
    })
    return () => {
      socket.disconnect();
    };

  }, []);


  useEffect(() => {
    fetch(generalData.API_URL + "getChat/" + currentChat, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(res => {
        setChatData(res.chat)
      })
      .catch(err => console.log(err))
  }, [currentChat])

  useEffect(() => {
    if (myUser.chats.length > 0) socket.emit("connectToAllRooms", myUser.chats)
  }, [])

  return (
    <>
      <div className='chat-panel-header'>
        <h3 className='panel-title'>
          {currentChat ? "Chating with: " + getAnotherMember() : "Empty"}
        </h3>
      </div>
      <div className='messages-container'>
        {
          chatData ?
            chatData.messages.map((elem, index) => (
              <Message key={index} from={elem.createdBy} body={elem.body} />
            )) : undefined
        }
      </div>
      <form className='message-form' onSubmit={submitMessage}>
        <input
          placeholder="your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button>send</button>
      </form>
    </>
  )
}