import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import soundRosterLogo from "../assets/sound-roster-logo.png"

export const NavBar = ({ currentUser, setCurrentUser }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("sound_roster_user")
    setCurrentUser(null)
    navigate("/login")
  }

  const username = currentUser?.fullName || currentUser?.email || "User"

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-white font-bold"
      : "text-gray-300 text-xl lg hover:text-white transition"

  return (
    <nav className="bg-blue-500 border-b border-black px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
         <Link to="/" className="flex h-14 w-[280px] items-center overflow-hidden">
  <img
    src={soundRosterLogo}
    alt="Sound Roster"
    className="h-28 max-w-none origin-left scale-[2] -translate-x-14"
  />
</Link>

          <div className="flex items-center gap-6">
            <NavLink to="/roster" className={navLinkStyle}>
              My Roster
            </NavLink>

            <NavLink to="/artists" className={navLinkStyle}>
              Browse All
            </NavLink>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-gray-100 transition hover:text-white"
          >
            <span>{username}</span>
            <span className="text-xs">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg bg-white shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}