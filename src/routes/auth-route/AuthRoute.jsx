import "../../stylesheets/auth-route/AuthRoute.css"
import { FaGithub } from "react-icons/fa";


export const AuthRoute = () => {
  return (
    <main>
      <div className="auth-panel">
        <div className="left-sections">
          <section className="title-section">
            <h1>Mini Chat!</h1>
          </section>
          <section className="auth-panel-signup-section">
            <h3 className="panel-title">Sign Up</h3>
            <form>
              <input placeholder="username" />
              <input placeholder="password" type="password" />
            </form>
          </section>
        </div>
        <div className="right-sections">
          <section className="auth-panel-signin-section">
            <h3 className="panel-title">Sign In</h3>
            <form>
              <input placeholder="username" />
              <input placeholder="password" type="password" />
              <input placeholder="confirm password" type="password" />
            </form>
          </section>
          <section className="github-section">
            <FaGithub />
            <p>See more on GitHub!</p>
          </section>
        </div>
      </div>
    </main>
  )
}