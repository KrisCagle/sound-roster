import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllArtistsWithGenres } from "../services/artistService"

export const BrowseAll = ({ currentUser }) => {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllArtistsWithGenres().then((artistData) => {
      const sortedArtists = [...artistData].sort((a, b) =>
        a.name.localeCompare(b.name)
      )

      setArtists(sortedArtists)
      setIsLoading(false)
    })
  }, [])

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
            {artists.length} artists
          </p>
        </div>

        {artists.length === 0 ? (
          <div className="py-12 text-center text-base text-gray-300 sm:py-16 sm:text-lg md:text-xl">
            No artists found.
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {artists.map((artist) => (
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
                        <span
                          key={genre}
                          className="rounded-full border border-blue-200/40 bg-purple-200/80 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm sm:text-sm"
                        >
                          {genre}
                        </span>
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