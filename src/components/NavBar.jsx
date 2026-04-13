import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

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
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white transition"

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white text-2xl font-bold">
            Sound Roster
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
            className="text-gray-300 hover:text-white transition flex items-center gap-2"
          >
            <span>{username}</span>
            <span className="text-xs">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100"
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