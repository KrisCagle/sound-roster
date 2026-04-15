import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTourDate, getArtistById } from "../services/artistService"

export const AddTourDate = ({ currentUser }) => {
  const { artistId } = useParams()
  const navigate = useNavigate()

  const [artist, setArtist] = useState(null)
  const [tourDate, setTourDate] = useState({
    venue: "",
    city: "",
    date: "",
    ticketUrl: "",
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    getArtistById(artistId).then((artistData) => {
      setArtist(artistData)
      setIsLoading(false)
    })
  }, [artistId])

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
      await createTourDate({
        ...tourDate,
        artistId: String(artistId),
      })

      navigate(`/artists/${artistId}`)
    } catch (error) {
      console.error(error)
      window.alert("Something went wrong while creating the tour date.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!currentUser) {
    return <h2>Please sign in to add tour dates.</h2>
  }

  if (isLoading) {
    return <h2>Loading artist...</h2>
  }

  if (!artist) {
    return <h2>Artist not found.</h2>
  }

  return (
    <main>
      <h1>Add Tour Date</h1>
      <p>Add a new show for {artist.name}</p>

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
          {isSaving ? "Saving..." : "Add Tour Date"}
        </button>

        <button
          type="button"
          onClick={() => navigate(`/artists/${artistId}`)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </main>
  )
}