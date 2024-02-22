import { useEffect, useContext } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';
import generalData from "../genetalData.json"
import { DataContext } from "./context/DataContext.jsx"

import io from "socket.io-client"
import { MessagesContainer } from './routes/home-route/MessagesContainer';
import { SocialPanel } from './routes/home-route/SocialPanel';
const socket = io('http://localhost:8000');



function App() {
  const navigate = useNavigate()

  const { myUser, setMyUser, setCurrentChat, currentChat } = useContext(DataContext)


  const handleLogOut = () => {
    localStorage.removeItem("mini-chat-user")
    localStorage.removeItem("mini-chat-token")
    navigate("/auth")
  }

  useEffect(() => {
    socket.on('connect', () => {
      const socketId = socket.id;
    });
  }, [])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("mini-chat-token"))

    if (!token) handleLogOut()

    fetch(generalData.API_URL + "verifyToken/" + token, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        if (res.message === "Invalid token") {
          handleLogOut()
        } else {
          console.log(res.user)
          setMyUser(res.user)
          localStorage.setItem("mini-chat-token", JSON.stringify(res.newToken))
        }

      })
      .catch(err => console.log(err))
  }, [])

  if (!myUser) return
  return (
    <main>
      <div className='main-container'>
        <div className='profile-panel'>
          <div className='profile-panel-header'>
            <h3 className='panel-title'>Profile</h3>
            <button onClick={handleLogOut}>log out</button>
          </div>
          <p className='profile-panel-username'>{myUser.username}</p>
        </div>
        <div className="chat-panel">
          <MessagesContainer />
        </div>
        <div className='social-panel'>
          <SocialPanel myUser={myUser} setPreviousChat={setCurrentChat} />
        </div>
      </div>
    </main>
  )
}

export default App




