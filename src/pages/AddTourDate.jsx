import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTourDate } from "../services/artistService"

export const AddTourDate = ({ currentUser }) => {
const navigate = useNavigate()
const { artistId } = useParams()
const normalizedArtistId = Number.isNaN(Number(artistId))
  ? artistId
  : Number(artistId)

  const [tourDate, setTourDate] = useState({
    venue: "",
    city: "",
    date: "",
    ticketUrl: "",
    artistId: normalizedArtistId
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setTourDate((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!tourDate.venue || !tourDate.city || !tourDate.date) {
      window.alert("Please fill out venue, city, and date.")
      return
    }

    setIsSaving(true)

    try {
      await createTourDate({
        ...tourDate,
        artistId: normalizedArtistId,
      })

      navigate(`/artists/${artistId}`)
    } catch (error) {
      console.error(error)
      window.alert("Something went wrong while creating the tour date.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-white/10 px-5 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[4rem] md:px-10 md:py-16">
          <h1 className="text-3xl font-light sm:text-4xl">Add Tour Date</h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
            Please sign in to add tour dates.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-400/70 bg-neutral-700/85 px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-8 md:rounded-[4rem] md:px-10 md:py-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-light text-white sm:text-4xl">
            Add Tour Date
          </h1>
          <p className="mt-2 text-base text-gray-300 sm:text-lg md:text-xl">
            Add a new show date for this artist.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="venue"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Venue
              </label>
              <input
                id="venue"
                type="text"
                name="venue"
                value={tourDate.venue}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={tourDate.city}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={tourDate.date}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white [color-scheme:dark] shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="ticketUrl"
                className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-200"
              >
                Ticket URL
              </label>
              <input
                id="ticketUrl"
                type="url"
                name="ticketUrl"
                value={tourDate.ticketUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-2xl border border-blue-400/70 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 shadow-[0_10px_24px_rgba(0,0,0,0.2)] outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSaving ? "Saving..." : "Create Tour Date"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/artists/${artistId}`)}
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