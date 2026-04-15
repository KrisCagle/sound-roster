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
    <main className="min-h-screen flex items-center justify-center bg-gray-800">
      <section className="bg-gray-700 rounded-2xl border border-grey-400 p-10 w-full max-w-md">
        <form onSubmit={handleRegister}>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            SoundRoster
          </h1>
          <h2 className="text-lg text-gray-300 text-center mb-8">
            Create your account
          </h2>

          <fieldset className="mb-4">
            <div className="form-group">
              <input
                type="text"
                value={newUser.fullName}
                onChange={(e) =>
                  setNewUser({ ...newUser, fullName: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white placeholder-white focus:outline-none"
                placeholder="Full name"
                required
                autoFocus
              />
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <div className="form-group">
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white placeholder-white focus:outline-none"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-white text-blue-500 font-semibold hover:bg-gray-100 transition"
              >
                Sign up
              </button>
            </div>
          </fieldset>
        </form>

        <section className="text-center mt-6">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white text-sm"
          >
            Already have an account? Sign in
          </Link>
        </section>
      </section>
    </main>
  )
}