import { useEffect, useState } from 'react';
import './App.css'
import { Message } from './components/message'
import io from "socket.io-client"

const socket = io('http://localhost:8000');


function App() {
  const [id, setId] = useState(null)


  useEffect(() => {
    socket.on('connect', () => {
      const socketId = socket.id;
      setId(socketId)
    });
  }, [])

  return (
    <main>
      <div className='main-container'>
        <div className='profile-panel'>
          <div className='profile-panel-header'>
            <h3 className='panel-title'>Profile</h3>
            <button>log out</button>
          </div>
          <p className='profile-panel-username'>Daniels</p>
        </div>
        <div className="chat-panel">
          <div className='messages-container'>
            <Message />
            <Message myMessage={true} />
          </div>
          <form className='message-form'>
            <input placeholder="your message..." />
            <button>send</button>
          </form>
        </div>
        <div className='social-panel'>
          <h3 className='panel-title'>Chat with:</h3>
          <div className='social-panel-users-container'>
            <input placeholder='find user' className='social-panel-browser'/>
            <a>Eliasitom</a>
            <a className='selected'>MmmSarbroso</a>
            <a>SuperSudoUserXDprogamer</a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App




