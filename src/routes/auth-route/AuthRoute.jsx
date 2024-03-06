import { useEffect, useState } from "react";
import "../../stylesheets/auth-route/AuthRoute.css"
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import generalData from "../../../genetalData.json"
const gitHubURL = "https://github.com/eliasitom/mini-chat"

export const AuthRoute = () => {
  const navigate = useNavigate()

  const [signInUsername, setSignInUsername] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [signUpUsername, setSignUpUsername] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")

  const [disabled, setDisabled] = useState(false)


  const handleSignUp = (e) => {
    e.preventDefault()
    setDisabled(true)

    if (!signUpUsername || !signUpPassword) {
      alert("You need to complete all the fields")
      setDisabled(false)
      return
    }

    const userData = {
      username: signUpUsername,
      password: signUpPassword
    }

    fetch(generalData.API_URL + "signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(res => {
        if(res.message === "User not found") {
          alert("User not found")
          setDisabled(false)
          return
        } 
        if(res.message === "Incorrect password") {
          alert("Incorrect password")
          setDisabled(false)
          return
        }
        
        localStorage.setItem("mini-chat-token", JSON.stringify(res.newToken))
        navigate("/")
        setDisabled(false)
      })
      .catch(err => {
        console.log(err)
        setDisabled(false)
      })
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    setDisabled(true)

    if (!signInUsername || !signInPassword || !confirmPassword) {
      alert("You need to complete all the fields")
      setDisabled(false)
      return
    }
    if (confirmPassword !== signInPassword) {
      alert("Passwords do not match")
      setDisabled(false)
      return
    }

    const userData = {
      username: signInUsername,
      password: signInPassword
    }

    fetch(generalData.API_URL + "signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(res => {
        localStorage.setItem("mini-chat-token", JSON.stringify(res.token))
        localStorage.setItem("mini-chat-user", JSON.stringify(res.newUser))
        navigate("/")
        setDisabled(false)
      })
      .catch(err => {
        console.log(err)
        setDisabled(false)
      })
  }

  const openGitHub = () => {
    window.open(gitHubURL, "_blank")
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("mini-chat-token"))

    if(!token) return

    fetch(generalData.API_URL + "verifyToken/" + token, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(res => {
        if (res.message === "Valid token") {
          localStorage.setItem("mini-chat-user", JSON.stringify(res.user))
          navigate("/")
        }
      })
  }, [])

  return (
    <main>
      <div className="auth-panel">
        <div className="left-sections">
          <section className="title-section">
            <h1>Mini Chat!</h1>
          </section>
          <section className="auth-panel-signup-section">
            <h3 className="panel-title">Sign Up</h3>
            <form onSubmit={handleSignUp}>
              <input
                placeholder="username"
                value={signUpUsername}
                onChange={e => setSignUpUsername(e.target.value)}
              />
              <input
                placeholder="password"
                type="password"
                value={signUpPassword}
                onChange={e => setSignUpPassword(e.target.value)}
              />
              <button disabled={disabled}>sign up</button>
            </form>
          </section>
        </div>
        <div className="right-sections">
          <section className="auth-panel-signin-section">
            <h3 className="panel-title">Sign In</h3>
            <form onSubmit={handleSignIn}>
              <input
                placeholder="username"
                value={signInUsername}
                onChange={e => setSignInUsername(e.target.value)}
              />
              <input
                placeholder="password"
                type="password"
                value={signInPassword}
                onChange={e => setSignInPassword(e.target.value)}
              />
              <input
                placeholder="confirm password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button disabled={disabled}>sign in</button>
            </form>
          </section>
          <section className="github-section" onClick={openGitHub}>
            <FaGithub />
            <p>See more on GitHub!</p>
          </section>
        </div>
      </div>
    </main>
  )
}