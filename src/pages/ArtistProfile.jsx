import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtistById, getAllGenres, getArtistGenreLinksByArtistId, getTourDatesByArtistId } from "../services/artistService";

export const ArtistProfile = ({currentUser}) => {
    const { artistId } = useParams()
    
    const [artist, setArtist] = useState(null)
    const [artistGenre, setArtistGenres] = useState([])
    const [tourDate, setTourDates] = useState([])
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
        .map((link) => allGenres.find((genre) => genre.id === link.genreId))
        .filter(Boolean)
        .map((genre) => genre.name)
    
        setArtist(artistData)
        setArtistGenres(genreNames)
        setTourDates(artistTourDates)
        setIsLoading(false)
    }
    loadArtistProfile()
},[artistId])

    const formatDate = (dateString) => {
        return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
    if (!currentUser){
        return (
            <main className=" min-h-screen bg-neutral-600 px-6 py-10 text-white">
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
            <div className="overflow-hidden rounded-3xl border-blue-400/70 bg-neutral-700 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
            <img
            src={artist.photoUrl}
            alt={artist.name}
            className="aspect-square w-full object-cover"
            onError={(e) => {
                e.target.src = "https://placehold.co/600x600"
            }}
            />
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <Link
                to={`/artists/${artist.id}/edit`}
                className="inline-flex items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              >
                Edit Artist
              </Link>
            <div className="mt-6 flex flex-col gap-4">
                <Link
                to={`/artists/${artist.id}/tourdates/new`}
                className="inline-flex items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                 Add Tour Date   
                </Link>
            </div>
            </div>
            <div>
                <h1 className="text-4xl font-light text-white md:text-5x1">
                    {artist.name}
                </h1>
                <div className="mt-4 flex flex-wrap gap-3">
                    {artistGenre.map((genre) => (
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
                    <p className=" text-sm uppercase tracking-wide text-gray-300">
                        Active Since
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                  {artist.activeSince}
                </p>
                    </div>
                    
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
                  {tourDate.length} {tourDate.length === 1 ? "date" : "dates"}
                </span>
              </div>
              {tourDate.length === 0 ? (
                <p className="mt-4 text-lg text-gray-300">
                  No tour dates added yet.
                </p>
              ) : (
                <div className="mt-6 space-y-4">
                  {tourDate.map((tourDate) => (
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
                          <a
                            href={tourDate.ticketUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-blue-300 hover:text-white"
                          >
                            Tickets
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      </section>
    </main>
  )
}