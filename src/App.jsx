import logo from "./logo.svg";
import "./App.css";
import {useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/NavBar"
import {Home } from "./pages/Home"
import {Login } from "./pages/Login"
import {Register } from "./pages/Register"
import {MyRoster } from "./pages/MyRoster"
import {ArtistProfile} from "./pages/ArtistProfile"
import {AddArtist} from "./pages/AddArtist"
import {EditArtist } from "./pages/EditArtist"
import {AddTourDate } from "./pages/AddTourDate"
import {BrowseAll} from "./pages/BrowseAll"

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  return (
     <BrowserRouter>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route path="/roster" element={<MyRoster currentUser={currentUser} />} />
        <Route path="/artists" element={<BrowseAll currentUser={currentUser} />} />
        <Route path="/artists/:artistId" element={<ArtistProfile currentUser={currentUser} />} />
        <Route path="/artists/new" element={<AddArtist currentUser={currentUser} />} />
        <Route path="/artists/:artistId/edit" element={<EditArtist currentUser={currentUser} />} />
        <Route path="/artists/:artistId/tourdates/new" element={<AddTourDate currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  )
}
