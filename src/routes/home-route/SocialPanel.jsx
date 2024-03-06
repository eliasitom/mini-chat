import { useContext, useState } from "react";

import { FaSearch } from "react-icons/fa";
import generalData from "../../../genetalData.json"
import { DataContext } from "../../context/DataContext";

export const SocialPanel = () => {
  const [username, setUsername] = useState("")

  const { myUser, setCurrentChat } = useContext(DataContext)

  const getChatName = (chatName) => {
    return chatName.split("_").filter(elem => elem !== myUser.username)[0]
  }

  const handleFindUser = () => {
    if (username === myUser.username) {
      return setUsername("")
    }

    fetch(generalData.API_URL + "getUser/" + username, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(res => {
        if (res.message === "User not found") return alert("User not found")
        openChat(res.user)
      })
  }

  const openChat = (user) => {
    const existingChat = () => {
      myUser.chats.filter(elem => {
        let chatMembers = elem.split("_")

        if (chatMembers.includes(myUser.username) && chatMembers.includes(user)) {
          return true
        } else {
          return false
        }
      })
    }

    if (!existingChat()) {
      const generatedChatName = myUser.username + "_" + user

      setCurrentChat(generatedChatName)
    } else {
      const existingChat = myUser.chats.findIndex(elem => {
        elem.name === myUser.username + "_" + user || elem.name === user + "_" + myUser.username
      })
      setCurrentChat(existingChat)
    }

  }

  return (
    <>
      <div className='social-panel-users-container'>
        <form className='social-panel-browser' onSubmit={e => { e.preventDefault(); handleFindUser(); }}>
          <input placeholder='find user'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button type="submit" style={{ display: 'none' }} />
          <FaSearch onClick={handleFindUser} />
        </form>
        {
          myUser.chats.length > 0 ?
            myUser.chats.map((elem, index) => (
              <a key={index} onClick={() => setCurrentChat(elem)}>{getChatName(elem)}</a>
            )) : undefined
        }
      </div>
    </>
  )
}