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
  <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
    <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-10 md:px-10 md:py-12">
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="text-center">
            <h1 className="text-3xl font-light text-white sm:text-4xl">
              Sound Roster
            </h1>
            <h2 className="mt-2 text-base text-gray-300 sm:text-lg">
              Create Your Account
            </h2>
          </div>
          <fieldset className="border-0 p-0">
            <div>
              <label
              htmlFor="fullName"
              className="mh-2 block text-sm font-semibold uppercase tracking-wide text-blue-200">
                Full Name
              </label>
              <input
              id="fullName"
              type="text"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({...newUser, fullName:e.target.value })
              }
              placeholder="Full Name"
              required
              autoFocus
              className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow=[0_10px_24px_rgba(0,0,0,0.2)outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>
          </fieldset>
          <fieldset className="border-0 p-0">
            <div>
              <label
              htmlFor="email"
              className="mb-2 block text font-semibold uppercase tracking-wide text-blue-200">
                Email Address
              </label>
              <input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({...newUser,email: e.target.value})
              }
                placeholder="Email address"
                    required
                    className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
                  />
                </div>
              </fieldset>

              <fieldset className="border-0 p-0">
                <div>
                  <button
                    type="submit"
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                  >
                    Sign Up
                  </button>
                </div>
              </fieldset>
            </form>

            <section className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Already have an account? Sign in
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}