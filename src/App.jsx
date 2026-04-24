import "./App.css"
import { useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { MyRoster } from "./pages/MyRoster"
import { ArtistProfile } from "./pages/ArtistProfile"
import { AddArtist } from "./pages/AddArtist"
import { EditArtist } from "./pages/EditArtist"
import { AddTourDate } from "./pages/AddTourDate"
import { BrowseAll } from "./pages/BrowseAll"
import { EditTourDate } from "./pages/EditTourDate"
import { UpcomingShows } from "./pages/UpcomingShows"

const AppRoutes = ({ currentUser, setCurrentUser }) => {
  const location = useLocation()

  const hideNav =
    location.pathname === "/login" || location.pathname === "/register"

  return (
    <>
      {!hideNav && currentUser ? (
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      ) : null}

      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/register"
          element={<Register setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/roster"
          element={<MyRoster currentUser={currentUser} />}
        />
        <Route
          path="/artists"
          element={<BrowseAll currentUser={currentUser} />}
        />
        <Route
          path="/artists/:artistId"
          element={<ArtistProfile currentUser={currentUser} />}
        />
        <Route
          path="/artists/new"
          element={<AddArtist currentUser={currentUser} />}
        />
        <Route
          path="/artists/:artistId/edit"
          element={<EditArtist currentUser={currentUser} />}
        />
        <Route
          path="/artists/:artistId/tourdates/new"
          element={<AddTourDate currentUser={currentUser} />}
        />
      <Route
          path="/artists/:artistId/tourdates/:tourDateId/edit"
          element={<EditTourDate currentUser={currentUser} />}
        />
      <Route path="/upcoming-shows" element={<UpcomingShows currentUser={currentUser} />} 
      />
      </Routes>
    </>
  )
}

export const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("sound_roster_user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  return (
    <BrowserRouter>
      <AppRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </BrowserRouter>
  )
}