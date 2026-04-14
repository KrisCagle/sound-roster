import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRosterArtistsForUser } from "../services/artistService"

export const MyRoster = ({ currentUser }) => {
  const [rosterArtists, setRosterArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentUser?.id) {
      setRosterArtists([])
      setIsLoading(false)
      return
    }

    getRosterArtistsForUser(currentUser.id).then((artists) => {
      setRosterArtists(artists)
      setIsLoading(false)
    })
  }, [currentUser])

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-white/10 px-10 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <h1 className="text-4xl font-light">My roster</h1>
          <p className="mt-4 text-xl text-gray-300">
            Please sign in to view your roster.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-10 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-light text-white">My roster</h1>
            <p className="mt-2 text-xl text-gray-300">
              {isLoading ? "Loading..." : `${rosterArtists.length} artists`}
            </p>
          </div>

          <Link
            to="/artists/new"
            className="inline-flex items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-10 py-4 text-xl font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            Add Artist
          </Link>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-xl text-gray-300">
            Loading roster...
          </div>
        ) : rosterArtists.length === 0 ? (
          <div className="py-16 text-center text-xl text-gray-300">
            No artists in your roster yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {rosterArtists.map((artist) => (
              <Link
                key={artist.id}
                to={`/artists/${artist.id}`}
                className="block rounded-2xl border border-blue-400/70 bg-white/10 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
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

                <h2 className="text-xl font-semibold leading-tight text-white">
                  {artist.name}
                </h2>

                <p className="mt-1 text-lg text-gray-300">{artist.originCity}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {artist.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-blue-200/40 bg-purple-200/80 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}