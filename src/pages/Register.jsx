import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail, registerUser } from "../services/authService"

export const Register = ({ setCurrentUser }) => {
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
  })

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    getUserByEmail(newUser.email).then((existingUsers) => {
      if (existingUsers.length > 0) {
        window.alert("An account with that email already exists")
        return
      }

      registerUser(newUser).then((createdUser) => {
        if (createdUser?.id) {
          localStorage.setItem("sound_roster_user", JSON.stringify(createdUser))
          setCurrentUser(createdUser)
          navigate("/roster")
        } else {
          window.alert("Unable to create account")
        }
      })
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
        }}
      >
        <form onSubmit={handleRegister}>
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
            Create your account
          </h2>

          <fieldset
            style={{
              marginBottom: "16px",
              border: "none",
              padding: 0,
            }}
          >
            <div>
              <input
                type="text"
                value={newUser.fullName}
                onChange={(e) =>
                  setNewUser({ ...newUser, fullName: e.target.value })
                }
                placeholder="Full name"
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

          <fieldset
            style={{
              marginBottom: "24px",
              border: "none",
              padding: 0,
            }}
          >
            <div>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Email address"
                required
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
                Sign up
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
            to="/login"
            style={{
              color: "#e2e8f0",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Already have an account? Sign in
          </Link>
        </section>
      </section>
    </main>
  )
}