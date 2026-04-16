import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getArtistById,
  getAllGenres,
  getArtistGenreLinksByArtistId,
  updateArtist,
  replaceArtistGenres,
} from "../services/artistService"

export const EditArtist = ({ currentUser }) => {
  const { artistId } = useParams()
  const navigate = useNavigate()

  const [artist, setArtist] = useState({
    id: "",
    name: "",
    bio: "",
    photoUrl: "",
    originCity: "",
    activeSince: "",
    userId: "",
  })

  const [genres, setGenres] = useState([])
  const [selectedGenreIds, setSelectedGenreIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadArtistData = async () => {
      const [artistData, allGenres, artistGenreLinks] = await Promise.all([
        getArtistById(artistId),
        getAllGenres(),
        getArtistGenreLinksByArtistId(artistId),
      ])

      setArtist({
        id: artistData.id,
        name: artistData.name || "",
        bio: artistData.bio || "",
        photoUrl: artistData.photoUrl || "",
        originCity: artistData.originCity || "",
        activeSince: artistData.activeSince || "",
        userId: artistData.userId || currentUser?.id || "",
      })

      setGenres(allGenres)
      setSelectedGenreIds(artistGenreLinks.map((link) => String(link.genreId)))
      setIsLoading(false)
    }

    loadArtistData()
  }, [artistId, currentUser])

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
    setIsSaving(true)

    try {
      await updateArtist({
        ...artist,
        userId: artist.userId || currentUser?.id || "",
      })

      await replaceArtistGenres(artist.id, selectedGenreIds)

      navigate(`/artists/${artist.id}`)
    } catch (error) {
      console.error(error)
      window.alert("Something went wrong while saving the artist.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!currentUser) {
    return (
      <main>
        <h1>Edit Artist</h1>
        <p>Please sign in to edit artists.</p>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main>
        <h1>Edit Artist</h1>
        <p>Loading artist...</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Edit Artist</h1>
      <p>Update artist details, image, and genres.</p>

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
            placeholder="/images/artists/NovaReyes.jpg"
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
                alt={artist.name}
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
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate(`/artists/${artist.id}`)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </main>
  )
}