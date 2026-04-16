import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getArtistById,
  getTourDateById,
  updateTourDate,
  deleteTourDateById,
} from "../services/artistService"

export const EditTourDate = ({ currentUser }) => {
  const { artistId, tourDateId } = useParams()
  const navigate = useNavigate()

  const [artist, setArtist] = useState(null)
  const [tourDate, setTourDate] = useState({
    id: "",
    venue: "",
    city: "",
    date: "",
    ticketUrl: "",
    artistId: "",
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    Promise.all([getArtistById(artistId), getTourDateById(tourDateId)]).then(
      ([artistData, tourDateData]) => {
        setArtist(artistData)
        setTourDate({
          id: tourDateData.id,
          venue: tourDateData.venue || "",
          city: tourDateData.city || "",
          date: tourDateData.date || "",
          ticketUrl: tourDateData.ticketUrl || "",
          artistId: String(tourDateData.artistId || artistId),
        })
        setIsLoading(false)
      }
    )
  }, [artistId, tourDateId])

  const handleChange = (event) => {
    const { name, value } = event.target

    setTourDate((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!tourDate.venue || !tourDate.city || !tourDate.date) {
      window.alert("Please fill out venue, city, and date.")
      return
    }

    setIsSaving(true)

    try {
      await updateTourDate({
        ...tourDate,
        artistId: String(artistId),
      })

      navigate(`/artists/${artistId}`)
    } catch (error) {
      console.error(error)
      window.alert("Something went wrong while updating the tour date.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteTourDate = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tour date?"
    )

    if (!confirmed) return

    try {
      await deleteTourDateById(tourDate.id)
      navigate(`/artists/${artistId}`)
    } catch (error) {
      console.error(error)
      window.alert("Something went wrong while deleting the tour date.")
    }
  }

  if (!currentUser) {
    return <h2>Please sign in to edit tour dates.</h2>
  }

  if (isLoading) {
    return <h2>Loading tour date...</h2>
  }

  if (!artist) {
    return <h2>Artist not found.</h2>
  }

  return (
    <main>
      <h1>Edit Tour Date</h1>
      <p>Update show information for {artist.name}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="venue">Venue</label>
          <br />
          <input
            id="venue"
            type="text"
            name="venue"
            value={tourDate.venue}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            name="city"
            value={tourDate.city}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="date">Date</label>
          <br />
          <input
            id="date"
            type="date"
            name="date"
            value={tourDate.date}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="ticketUrl">Ticket URL</label>
          <br />
          <input
            id="ticketUrl"
            type="text"
            name="ticketUrl"
            value={tourDate.ticketUrl}
            onChange={handleChange}
            placeholder="https://example.com/tickets"
          />
        </div>

        <br />

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate(`/artists/${artistId}`)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDeleteTourDate}
          style={{ marginLeft: "10px" }}
        >
          Delete Tour Date
        </button>
      </form>
    </main>
  )
}