import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"

export const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

   loginUser(email, password).then((user) => {
  if (user) {
    localStorage.setItem("sound_roster_user", JSON.stringify(user))
    setCurrentUser(user)
    navigate("/roster")
  } else {
    window.alert("Invalid email or password")
  }
})
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800">
      <section className="bg-gray-700 rounded-2xl border border-grey-400 p-10 w-full max-w-md">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            SoundRoster
          </h1>
          <h2 className="text-lg text-gray-300 text-center mb-8">
            Welcome back
          </h2>
          <fieldset className="mb-4">
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white placeholder-white focus:outline-none"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="mb-6">
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white placeholder-white focus:outline-none"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-white text-blue-500 font-semibold hover:bg-gray-100 transition">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
        <section className="text-center mt-6">
          <Link
            to="/register"
            className="text-gray-300 hover:text-white text-sm">
            Don't have an account? Sign up
          </Link>
        </section>
      </section>
    </main>
  )
}