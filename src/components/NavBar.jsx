import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import soundRosterLogo from "../assets/sound-roster-logo.png"

export const NavBar = ({ currentUser, setCurrentUser }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("sound_roster_user")
    setCurrentUser(null)
    setShowDropdown(false)
    setShowMobileMenu(false)
    navigate("/login")
  }

  const username = currentUser?.fullName || currentUser?.email || "User"

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-white font-bold"
      : "text-gray-200 hover:text-white transition"

  return (
    <nav className="border-b border-black bg-blue-500 px-4 py-3 sm:px-6 sm:py-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex h-14 w-[210px] items-center overflow-hidden sm:w-[240px] md:w-[280px]">
  <img
    src={soundRosterLogo}
    alt="Sound Roster"
    className="h-24 max-w-none origin-left scale-[1.65] -translate-x-10 sm:h-24 sm:scale-[1.8] sm:-translate-x-12 md:h-28 md:scale-[2] md:-translate-x-14"
  />
</Link>
          </div>

         <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
  <NavLink to="/roster" className={navLinkStyle}>
    My Roster
  </NavLink>

  <NavLink to="/artists" className={navLinkStyle}>
    Browse All
  </NavLink>

  <NavLink to="/upcoming-shows" className={navLinkStyle}>
    Upcoming Shows
  </NavLink>
</div>

          <div className="hidden md:block">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-sm text-gray-100 transition hover:text-white lg:text-base"
              >
                <span className="max-w-[160px] truncate">{username}</span>
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

          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu)
              setShowDropdown(false)
            }}
            className="rounded-lg p-2 text-white transition hover:bg-blue-600 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {showMobileMenu && (
          <div className="mt-4 space-y-3 rounded-2xl bg-blue-600/40 p-4 md:hidden">
            <NavLink
              to="/roster"
              className={({ isActive }) =>
                `${navLinkStyle({ isActive })} block rounded-lg px-3 py-2 text-base`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              My Roster
            </NavLink>

            <NavLink
              to="/artists"
              className={({ isActive }) =>
                `${navLinkStyle({ isActive })} block rounded-lg px-3 py-2 text-base`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              Browse All
            </NavLink>
              <NavLink
  to="/upcoming-shows"
  className={({ isActive }) =>
    `${navLinkStyle({ isActive })} block rounded-lg px-3 py-2 text-base`
  }
  onClick={() => setShowMobileMenu(false)}
>
  Upcoming Shows
</NavLink>
            <div className="border-t border-white/20 pt-3">
              <div className="mb-3 truncate px-3 text-sm text-white/90">
                {username}
              </div>
              <button
                onClick={handleLogout}
                className="block w-full rounded-lg bg-white px-3 py-2 text-left font-medium text-gray-800 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}