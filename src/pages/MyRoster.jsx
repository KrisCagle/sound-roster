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
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-white/10 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">My roster</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Please sign in to view your roster.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-8 md:rounded-[4rem] md:px-10 md:py-10">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-light text-white sm:text-4xl">My Roster</h1>
            <p className="mt-2 text-base text-gray-300 sm:text-lg md:text-xl">
              {isLoading ? "Loading..." : `${rosterArtists.length} artists`}
            </p>
          </div>

          <Link
            to="/artists/new"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:w-auto sm:px-8 sm:py-4 sm:text-lg md:px-10 md:text-xl"
          >
            Add Artist
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-base text-gray-300 sm:py-16 sm:text-lg md:text-xl">
            Loading roster...
          </div>
        ) : rosterArtists.length === 0 ? (
          <div className="py-12 text-center text-base text-gray-300 sm:py-16 sm:text-lg md:text-xl">
            No artists in your roster yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {rosterArtists.map((artist) => (
              <Link
                key={artist.id}
                to={`/artists/${artist.id}`}
                className="block rounded-2xl border border-blue-400/70 bg-white/10 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:p-5 md:p-6"
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

                <h2 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                  {artist.name}
                </h2>

                <p className="mt-1 text-sm text-gray-300 sm:text-base md:text-lg">
                  {artist.originCity}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(artist.genres || []).map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-blue-200/40 bg-purple-200/80 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm sm:text-sm"
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