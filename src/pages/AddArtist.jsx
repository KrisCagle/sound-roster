import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  createArtist,
  getAllGenres,
  replaceArtistGenres,
} from "../services/artistService"

export const AddArtist = ({ currentUser }) => {
  const navigate = useNavigate()

  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    photoUrl: "",
    originCity: "",
    activeSince: "",
  })

  const [genres, setGenres] = useState([])
  const [selectedGenreIds, setSelectedGenreIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    getAllGenres().then((genreData) => {
      setGenres(genreData)
      setIsLoading(false)
    })
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setArtist((prevState) => ({
      ...prevState,
      [name]: name === "activeSince" ? Number(value) || "" : value,
    }))
  }

  const handleGenreToggle = (genreId) => {
    const genreIdString = String(genreId)

    setSelectedGenreIds((prevState) =>
      prevState.includes(genreIdString)
        ? prevState.filter((id) => id !== genreIdString)
        : [...prevState, genreIdString]
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!artist.name || !artist.originCity) {
      window.alert("Please fill out the artist name and origin city.")
      return
    }

    setIsSaving(true)

    try {
      const createdArtist = await createArtist({
        ...artist,
        userId: currentUser.id,
      })

      await replaceArtistGenres(String(createdArtist.id), selectedGenreIds)
      navigate(`/artists/${createdArtist.id}`)
    } catch (error) {
      console.error(error)
      window.alert("Something went wrong while creating the artist.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!currentUser) {
    return (
      <main>
        <h1>Add Artist</h1>
        <p>Please sign in to add artists.</p>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main>
        <h1>Add Artist</h1>
        <p>Loading form...</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Add Artist</h1>
      <p>Create a new artist profile for your roster.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Artist Name</label>
          <br />
          <input
            id="name"
            type="text"
            name="name"
            value={artist.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="originCity">Origin City</label>
          <br />
          <input
            id="originCity"
            type="text"
            name="originCity"
            value={artist.originCity}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="photoUrl">Photo URL</label>
          <br />
          <input
            id="photoUrl"
            type="text"
            name="photoUrl"
            value={artist.photoUrl}
            onChange={handleChange}
            placeholder="/images/artists/NewArtist.jpg"
          />
        </div>

        <br />

        <div>
          <label htmlFor="activeSince">Active Since</label>
          <br />
          <input
            id="activeSince"
            type="number"
            name="activeSince"
            value={artist.activeSince}
            onChange={handleChange}
            min="1900"
            max="2100"
          />
        </div>

        <br />

        <div>
          <label htmlFor="bio">Bio</label>
          <br />
          <textarea
            id="bio"
            name="bio"
            value={artist.bio}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <br />

        <div>
          <p>Genres</p>
          {genres.map((genre) => {
            const isSelected = selectedGenreIds.includes(String(genre.id))

            return (
              <div key={genre.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleGenreToggle(genre.id)}
                  />
                  {genre.name}
                </label>
              </div>
            )
          })}
        </div>

        <br />

        {artist.photoUrl ? (
          <>
            <div>
              <p>Photo Preview</p>
              <img
                src={artist.photoUrl}
                alt={artist.name || "Artist preview"}
                width="250"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300"
                }}
              />
            </div>
            <br />
          </>
        ) : null}

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Create Artist"}
        </button>

        <button type="button" onClick={() => navigate("/roster")}>
          Cancel
        </button>
      </form>
    </main>
  )
}