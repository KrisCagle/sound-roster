import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getAllArtistsWithGenres } from "../services/artistService"

export const BrowseAll = ({ currentUser }) => {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  useEffect(() => {
    getAllArtistsWithGenres().then((artistData) => {
      const sortedArtists = [...artistData].sort((a, b) =>
        a.name.localeCompare(b.name)
      )

      setArtists(sortedArtists)
      setIsLoading(false)
    })
  }, [])

  const allGenres = useMemo(() => {
    const uniqueGenres = new Set()

    artists.forEach((artist) => {
      ;(artist.genres || []).forEach((genre) => uniqueGenres.add(genre))
    })

    return Array.from(uniqueGenres).sort((a, b) => a.localeCompare(b))
  }, [artists])

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch = artist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesGenre =
        !selectedGenre || (artist.genres || []).includes(selectedGenre)

      return matchesSearch && matchesGenre
    })
  }, [artists, searchTerm, selectedGenre])

  const handleGenreClick = (genre) => {
    setSelectedGenre((prev) => (prev === genre ? "" : genre))
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-white/10 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Browse All Artists</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Please sign in to browse artists.
          </p>
        </section>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-6xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Browse All Artists</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Loading artists...
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-8 md:rounded-[4rem] md:px-10 md:py-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-light text-white sm:text-4xl">
            Browse All Artists
          </h1>

          <p className="mt-2 text-base text-gray-300 sm:text-lg md:text-xl">
            {filteredArtists.length} {filteredArtists.length === 1 ? "artist" : "artists"}
          </p>
        </div>

        <div className="mb-8 space-y-5">
          <div>
            <label
              htmlFor="artist-search"
              className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
            >
              Search by Artist Name
            </label>
            <input
              id="artist-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Start typing an artist name..."
              className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
              Filter by Genre
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedGenre("")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedGenre === ""
                    ? "border-blue-200/50 bg-purple-200/80 text-blue-700 shadow-sm"
                    : "border-blue-400/60 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                All Genres
              </button>

              {allGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreClick(genre)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedGenre === genre
                      ? "border-blue-200/50 bg-purple-200/80 text-blue-700 shadow-sm"
                      : "border-blue-400/60 bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="py-12 text-center text-base text-gray-300 sm:py-16 sm:text-lg md:text-xl">
            No artists match your search or filter.
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredArtists.map((artist) => (
              <article
                key={artist.id}
                className="flex h-full flex-col rounded-2xl border border-blue-400/70 bg-white/10 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:p-5 md:p-6"
              >
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl border border-blue-400/70 bg-neutral-700/60 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                  <img
                    src={artist.photoUrl}
                    alt={artist.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x300"
                    }}
                  />
                </div>

                <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {artist.name}
                </h2>

                <p className="mt-1 text-sm text-gray-300 sm:text-base md:text-lg">
                  {artist.originCity}
                </p>

                <p className="mt-2 text-sm text-gray-300 sm:text-base">
                  Active Since: {artist.activeSince}
                </p>

                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  {artist.bio}
                </p>

                <div className="mt-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
                    Genres
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {(artist.genres || []).length === 0 ? (
                      <span className="text-sm text-gray-300">None listed</span>
                    ) : (
                      artist.genres.map((genre) => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => handleGenreClick(genre)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm transition sm:text-sm ${
                            selectedGenre === genre
                              ? "border-blue-200/50 bg-purple-200/80 text-blue-700"
                              : "border-blue-200/40 bg-purple-200/80 text-blue-700 hover:opacity-90"
                          }`}
                        >
                          {genre}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    to={`/artists/${artist.id}`}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:text-base"
                  >
                    View Artist Profile
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  )
}