import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"

export const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    loginUser(email).then((user) => {
      if (user) {
        localStorage.setItem("sound_roster_user", JSON.stringify(user))
        setCurrentUser(user)
        navigate("/roster")
      } else {
        window.alert("No account found with that email")
      }
    })
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7b7e83",
        padding: "20px",
      }}
    >
      <section
  style={{
    backgroundColor: "#aeb0b6",
    border: "1px solid #00e1ff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "5px 25px 35px rgba(0, 0, 0, 0.2)"
  }}
>
        <form onSubmit={handleLogin}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            SoundRoster
          </h1>

          <h2
            style={{
              fontSize: "1.1rem",
              color: "#e2e8f0",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Welcome back
          </h2>

          <fieldset style={{ marginBottom: "24px", border: "none", padding: 0 }}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                autoFocus
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #a0aec0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </fieldset>

          <fieldset style={{ border: "none", padding: 0 }}>
            <div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "white",
                  color: "#3182ce",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign in
              </button>
            </div>
          </fieldset>
        </form>

        <section
          style={{
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Link
            to="/register"
            style={{
              color: "#e2e8f0",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Don&apos;t have an account? Sign up
          </Link>
        </section>
      </section>
    </main>
  )
}