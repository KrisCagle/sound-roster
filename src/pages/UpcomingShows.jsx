import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getUpcomingTourDatesWithArtists } from "../services/artistService"

export const UpcomingShows = ({ currentUser }) => {
  const [upcomingShows, setUpcomingShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUpcomingTourDatesWithArtists().then((shows) => {
      setUpcomingShows(shows)
      setIsLoading(false)
    })
  }, [])

  const formatDate = (dateString) => {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const groupedShows = useMemo(() => {
    const grouped = {}

    upcomingShows.forEach((show) => {
      const artistKey = String(show.artistId)

      if (!grouped[artistKey]) {
        grouped[artistKey] = {
          artistId: show.artistId,
          artistName: show.artistName,
          artistPhotoUrl: show.artistPhotoUrl,
          shows: [],
        }
      }

      grouped[artistKey].shows.push(show)
    })

    return Object.values(grouped)
  }, [upcomingShows])

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-white/10 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Upcoming Shows</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Please sign in to view upcoming shows.
          </p>
        </section>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Upcoming Shows</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Loading upcoming shows...
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
            Upcoming Shows
          </h1>
          <p className="mt-2 text-base text-gray-300 sm:text-lg md:text-xl">
            {upcomingShows.length}{" "}
            {upcomingShows.length === 1 ? "show" : "shows"} coming up
          </p>
        </div>

        {groupedShows.length === 0 ? (
          <div className="py-12 text-center text-base text-gray-300 sm:py-16 sm:text-lg md:text-xl">
            No upcoming shows found.
          </div>
        ) : (
          <div className="space-y-8">
            {groupedShows.map((artistGroup) => (
              <section
                key={artistGroup.artistId}
                className="rounded-3xl border border-blue-400/60 bg-white/10 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.22)] sm:p-6"
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-blue-400/70 bg-neutral-700/60 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                      <img
                        src={artistGroup.artistPhotoUrl}
                        alt={artistGroup.artistName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/300x300"
                        }}
                      />
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        {artistGroup.artistName}
                      </h2>
                      <p className="mt-1 text-sm text-gray-300 sm:text-base">
                        {artistGroup.shows.length}{" "}
                        {artistGroup.shows.length === 1 ? "upcoming show" : "upcoming shows"}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/artists/${artistGroup.artistId}`}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                  >
                    View Artist
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {artistGroup.shows.map((show) => (
                    <article
                      key={show.id}
                      className="rounded-2xl border border-blue-400/50 bg-neutral-700/70 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                    >
                      <div className="flex flex-col gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {show.venue}
                          </h3>
                          <p className="mt-1 text-gray-300">{show.city}</p>
                        </div>

                        <div className="inline-flex w-fit rounded-full border border-blue-200/40 bg-purple-200/80 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm">
                          {formatDate(show.date)}
                        </div>

                        {show.ticketUrl?.trim() ? (
                          <div className="pt-2">
                            <a
                              href={show.ticketUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.3)]"
                            >
                              Tickets
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}