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
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-white/10 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Edit Artist</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Please sign in to edit artists.
          </p>
        </section>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Edit Artist</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Loading artist...
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-8 md:rounded-[4rem] md:px-10 md:py-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-light text-white sm:text-4xl">
            Edit Artist
          </h1>
          <p className="mt-2 text-base text-gray-300 sm:text-lg md:text-xl">
            Update artist details, image, and genres.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Artist Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={artist.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="originCity"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Origin City
              </label>
              <input
                id="originCity"
                type="text"
                name="originCity"
                value={artist.originCity}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="photoUrl"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Photo URL
              </label>
              <input
                id="photoUrl"
                type="text"
                name="photoUrl"
                value={artist.photoUrl}
                onChange={handleChange}
                placeholder="/images/artists/NovaReyes.jpg"
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="activeSince"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Active Since
              </label>
              <input
                id="activeSince"
                type="number"
                name="activeSince"
                value={artist.activeSince}
                onChange={handleChange}
                min="1900"
                max="2100"
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={artist.bio}
              onChange={handleChange}
              rows="6"
              className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
              Genres
            </p>

            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => {
                const isSelected = selectedGenreIds.includes(String(genre.id))

                return (
                  <label
                    key={genre.id}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-blue-200/50 bg-purple-200/80 text-blue-700 shadow-sm"
                        : "border-blue-400/60 bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleGenreToggle(genre.id)}
                      className="h-4 w-4 accent-blue-500"
                    />
                    {genre.name}
                  </label>
                )
              })}
            </div>
          </div>

          {artist.photoUrl ? (
  <div className="flex justify-center">
    <div className="w-full max-w-sm rounded-3xl border border-blue-400/70 bg-white/10 p-5 text-center shadow-[0_12px_30px_rgba(0,0,0,0.28)] sm:p-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-200">
        Photo Preview
      </p>

      <div className="overflow-hidden rounded-2xl border border-blue-400/70 bg-neutral-700/60 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
        <img
          src={artist.photoUrl}
          alt={artist.name}
          className="aspect-square w-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/300x300"
          }}
        />
      </div>
    </div>
  </div>
) : null}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/artists/${artist.id}`)}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-black/20 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}