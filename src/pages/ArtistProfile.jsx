import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import {
  getArtistById,
  getAllGenres,
  getArtistGenreLinksByArtistId,
  getTourDatesByArtistId,
  deleteArtistGenreLinksByArtistId,
  deleteTourDatesByArtistId,
  deleteArtistById,
  deleteTourDateById,
} from "../services/artistService"
const FacebookIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
  >
    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V4.9c-.4-.1-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H8v3h2.2v8h3.3Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-none stroke-current"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const ArtistProfile = ({ currentUser }) => {
  const { artistId } = useParams()
  const navigate = useNavigate()

  const [artist, setArtist] = useState(null)
  const [artistGenres, setArtistGenres] = useState([])
  const [tourDates, setTourDates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArtistProfile = async () => {
      const [artistData, allGenres, artistGenreLinks, artistTourDates] =
        await Promise.all([
          getArtistById(artistId),
          getAllGenres(),
          getArtistGenreLinksByArtistId(artistId),
          getTourDatesByArtistId(artistId),
        ])

      const genreNames = artistGenreLinks
        .map((link) =>
          allGenres.find((genre) => String(genre.id) === String(link.genreId))
        )
        .filter(Boolean)
        .map((genre) => genre.name)

      setArtist(artistData)
      setArtistGenres(genreNames)
      setTourDates(artistTourDates)
      setIsLoading(false)
    }

    loadArtistProfile()
  }, [artistId])

  const formatDate = (dateString) => {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isOwner = String(currentUser?.id) === String(artist?.userId)

  const handleDeleteArtist = async () => {
    if (!isOwner) {
      window.alert("Only the owner can delete this artist.")
      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${artist.name}? This cannot be undone.`
    )

    if (!confirmed) return

    await deleteArtistGenreLinksByArtistId(artist.id)
    await deleteTourDatesByArtistId(artist.id)
    await deleteArtistById(artist.id)

    navigate("/roster")
  }

  const handleDeleteTourDate = async (tourDateId, venue) => {
    if (!isOwner) {
      window.alert("Only the owner can delete this tour date.")
      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the tour date for ${venue}?`
    )

    if (!confirmed) return

    await deleteTourDateById(tourDateId)

    setTourDates((prevState) =>
      prevState.filter((tourDate) => String(tourDate.id) !== String(tourDateId))
    )
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-10 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <h1 className="text-4xl font-light">Artist Profile</h1>
          <p className="mt-4 text-xl text-gray-300">
            Please sign in to view artist profiles.
          </p>
        </section>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-10 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <h1 className="text-4xl font-light">Loading artist...</h1>
        </section>
      </main>
    )
  }

  if (!artist) {
    return (
      <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-10 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <h1 className="text-4xl font-light">Artist not found</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl rounded-[4rem] border border-blue-400/70 bg-neutral-700/85 px-8 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:px-12">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-blue-400/70 bg-neutral-700 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
              <img
                src={artist.photoUrl}
                alt={artist.name}
                className="aspect-square w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x600"
                }}
              />
            </div>
            {artist.facebookUrl?.trim() || artist.instagramUrl?.trim() ? (
  <div className="mt-4 flex items-center justify-center gap-4">
    {artist.facebookUrl?.trim() ? (
      <a
        href={artist.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/70 bg-white/10 text-blue-200 shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:text-white"
      >
        <FacebookIcon />
      </a>
    ) : null}

    {artist.instagramUrl?.trim() ? (
      <a
        href={artist.instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/70 bg-white/10 text-blue-200 shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:text-white"
      >
        <InstagramIcon />
      </a>
    ) : null}
  </div>
) : null}
            {isOwner ? (
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  to={`/artists/${artist.id}/edit`}
                  className="inline-flex items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                  Edit Artist
                </Link>

                <Link
                  to={`/artists/${artist.id}/tourdates/new`}
                  className="inline-flex items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                  Add Tour Date
                </Link>

                <button
                  type="button"
                  onClick={handleDeleteArtist}
                  className="inline-flex items-center justify-center rounded-full border border-red-400/80 bg-red-500/10 px-8 py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:bg-red-500/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                  Delete Artist
                </button>
              </div>
            ) : null}
          </div>

          <div>
            <h1 className="text-4xl font-light text-white md:text-5xl">
              {artist.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              {artistGenres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-blue-200/40 bg-purple-200/80 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-400/60 bg-white/10 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                <p className="text-sm uppercase tracking-wide text-gray-300">
                  Origin City
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {artist.originCity}
                </p>
              </div>

              <div className="rounded-2xl border border-blue-400/60 bg-white/10 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                <p className="text-sm uppercase tracking-wide text-gray-300">
                  Active Since
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {artist.activeSince}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-blue-400/60 bg-white/10 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
              <h2 className="text-2xl font-semibold text-white">Bio</h2>
              <p className="mt-4 text-lg leading-8 text-gray-200">
                {artist.bio}
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-blue-400/60 bg-white/10 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Tour Dates</h2>
                <span className="text-gray-300">
                  {tourDates.length} {tourDates.length === 1 ? "date" : "dates"}
                </span>
              </div>

              {tourDates.length === 0 ? (
                <p className="mt-4 text-lg text-gray-300">
                  No tour dates added yet.
                </p>
              ) : (
                <div className="mt-6 space-y-4">
                  {tourDates.map((tourDate) => (
                    <div
                      key={tourDate.id}
                      className="rounded-2xl border border-blue-400/50 bg-neutral-700/70 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {tourDate.venue}
                          </h3>
                          <p className="mt-1 text-gray-300">{tourDate.city}</p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-lg font-medium text-white">
                            {formatDate(tourDate.date)}
                          </p>

                          {tourDate.ticketUrl ? (
                        <a
                          href={tourDate.ticketUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-blue-300 hover:text-white"
                        >
                          Tickets
                        </a>
                      ) : null}

                          {isOwner ? (
                            <div className="mt-2 flex flex-col gap-2 md:items-end">
                              <Link
                                to={`/artists/${artist.id}/tourdates/${tourDate.id}/edit`}
                                className="inline-block text-blue-300 hover:text-white"
                              >
                                Edit Tour Date
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteTourDate(tourDate.id, tourDate.venue)
                                }
                                className="inline-block text-red-300 transition hover:text-white"
                              >
                                Delete Tour Date
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}