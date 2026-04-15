import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {createArtist, getAllGenres, replaceArtistGenres,} from "../services/artistService"

export const AddArtist = ({currentUser}) => {
    const navigate = useNavigate()

    const [artist,setArtist] = useState({
        name: "",
        bio:"",
        photoUrl:"",
        originCity: "",
        activeSince: "",
    })
    const [genres, setGenres] = useState ([])
    const [selectedGenreIds, setSelectedGenreIds] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [isSaving,setIsSaving] = useState(false)

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
        if(!artist.name || !artist.originCity) {
            window.alert("Please fill out the artist name and origin city.")
            return
        }
        setIsSaving(true)
    const createdArtist = await createArtist({
        ...artist,
        userId: currentUser.id,
    })
    await replaceArtistGenres(String(createdArtist.id), selectedGenreIds)
    navigate (`/artists/${createdArtist.id}`)
    }
    if (!currentUser) {
        return (
            <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-10 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <h1 className="text-4xl font-light">Add Artist</h1>
          <p className="mt-4 text-xl text-gray-300">
            Please sign in to add artists.
          </p>
        </section>
      </main>
    )
  }
   if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-10 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <h1 className="text-4xl font-light">Loading form...</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-8 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:px-12">
        <div className="mb-10">
          <h1 className="text-4xl font-light">Add Artist</h1>
          <p className="mt-2 text-lg text-gray-300">
            Create a new artist profile for your roster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-lg font-semibold text-white">
                Artist Name
              </label>
              <input
                type="text"
                name="name"
                value={artist.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder-gray-300 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300"
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-semibold text-white">
                Origin City
              </label>
              <input
                type="text"
                name="originCity"
                value={artist.originCity}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder-gray-300 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300"
                placeholder="Nashville, TN"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-semibold text-white">
                Photo URL
              </label>
              <input
                type="text"
                name="photoUrl"
                value={artist.photoUrl}
                onChange={handleChange}
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder-gray-300 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300"
                placeholder="/images/artists/NewArtist.jpg"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-semibold text-white">
                Active Since
              </label>
              <input
                type="number"
                name="activeSince"
                value={artist.activeSince}
                onChange={handleChange}
                min="1900"
                max="2100"
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder-gray-300 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300"
                placeholder="2024"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-white">
              Bio
            </label>
            <textarea
              name="bio"
              value={artist.bio}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder-gray-300 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300"
              placeholder="Write a short artist bio..."
            />
          </div>

          <div>
            <label className="mb-4 block text-lg font-semibold text-white">
              Genres
            </label>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {genres.map((genre) => {
                const isSelected = selectedGenreIds.includes(String(genre.id))

                return (
                  <label
                    key={genre.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition ${
                      isSelected
                        ? "border-blue-300 bg-blue-400/20 text-white"
                        : "border-blue-400/50 bg-white/10 text-gray-200 hover:bg-white/15"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleGenreToggle(genre.id)}
                      className="h-4 w-4 accent-blue-400"
                    />
                    <span>{genre.name}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {artist.photoUrl ? (
            <div>
              <label className="mb-4 block text-lg font-semibold text-white">
                Photo Preview
              </label>
              <div className="h-64 w-64 overflow-hidden rounded-2xl border border-blue-400/70 bg-neutral-700 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
                <img
                  src={artist.photoUrl}
                  alt={artist.name || "Artist preview"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x300"
                  }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full border border-blue-400/80 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Create Artist"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/roster")}
              className="rounded-full border border-gray-400/70 bg-white/5 px-8 py-3 text-lg font-semibold text-gray-200 shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}