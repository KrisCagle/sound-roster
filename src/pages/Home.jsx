import { Link } from "react-router-dom"

export const Home = ({ currentUser }) => {
  const primaryButtonText = currentUser ? "Take Me to Artist Roster" : "Log In"
  const primaryButtonLink = currentUser ? "/roster" : "/login"

  const secondaryButtonText = currentUser ? "View Upcoming Shows" : "Create Account"
  const secondaryButtonLink = currentUser ? "/upcoming-shows" : "/register"

  const featureCards = [
    {
      title: "Manage Artists",
      description:
        "Keep artist profiles, genres, and key details organized in one place.",
    },
    {
      title: "Track Tour Dates",
      description:
        "Add, edit, and review upcoming shows across your full roster.",
    },
    {
      title: "Stay Organized",
      description:
        "Give your workflow more structure so you can focus on the next move.",
    },
  ]

  const previewShows = [
    {
      artist: "Nova Reyes",
      venue: "The Basement East",
      city: "Nashville, TN",
      date: "April 15, 2026",
    },
    {
      artist: "Neon Harbor",
      venue: "Mercury Lounge",
      city: "New York, NY",
      date: "May 2, 2026",
    },
    {
      artist: "Golden Static",
      venue: "The Troubadour",
      city: "Los Angeles, CA",
      date: "May 18, 2026",
    },
  ]

  const managerHighlights = [
    "Keep your roster organized in one clean workspace",
    "Stay ahead of upcoming shows and artist activity",
    "Make faster day to day decisions with less clutter",
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-600 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="relative px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16">
          <div className="relative">
            <div className="absolute inset-x-4 top-6 h-full rounded-[2rem] bg-black/20 blur-2xl sm:inset-x-8 sm:top-8 sm:rounded-[2.5rem] sm:blur-3xl" />
            <div className="absolute -bottom-4 left-4 right-4 h-16 rounded-full bg-black/30 blur-xl sm:-bottom-6 sm:left-8 sm:right-8 sm:h-20 sm:blur-2xl" />

            <div className="relative rounded-[2rem] border border-blue-400/70 bg-neutral-700/90 px-5 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[3rem] md:px-16 md:py-20">
              <div className="flex flex-col items-center text-center">
                

                <h1 className="mt-6 max-w-4xl text-3xl font-light leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Manage your artists and tour schedules, all in one place.
                </h1>

                <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg md:text-2xl">
                  SoundRoster is designed for managers balancing artists,
                  schedules, and relationships.
                </p>

                <div className="mt-10 flex w-full max-w-xl flex-col gap-4 sm:mt-12 sm:flex-row sm:justify-center">
                  <Link
                    to={primaryButtonLink}
                    className="group relative inline-flex min-h-[52px] w-full items-center justify-center overflow-hidden rounded-2xl border border-blue-400 bg-neutral-700 px-6 py-3 text-lg font-medium text-white shadow-2xl sm:px-10 sm:py-4 sm:text-xl"
                  >
                    <span className="absolute inset-0 h-full w-full rounded-2xl bg-blue-400 blur-md transition-all duration-700 ease" />
                    <span className="absolute left-1/2 top-10 h-20 w-40 -translate-x-1/2 -mt-10 rounded-full bg-blue-300 blur-md transition-all duration-900 ease" />
                    <span className="absolute inset-0 h-full w-full transition duration-700 ease group-hover:rotate-180">
                      <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-blue-600 blur-lg" />
                      <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-fuchsia-600 blur-lg" />
                    </span>
                    <span className="relative text-white">{primaryButtonText}</span>
                  </Link>

                  <Link
                    to={secondaryButtonLink}
                    className="group relative inline-flex min-h-[52px] w-full items-center justify-center overflow-hidden rounded-2xl border border-blue-400 bg-neutral-700 px-6 py-3 text-lg font-medium text-white shadow-2xl sm:px-10 sm:py-4 sm:text-xl"
                  >
                    <span className="absolute inset-0 h-full w-full rounded-2xl bg-blue-400 blur-md transition-all duration-700 ease" />
                    <span className="absolute left-1/2 top-10 h-20 w-40 -translate-x-1/2 -mt-10 rounded-full bg-blue-300 blur-md transition-all duration-900 ease" />
                    <span className="absolute inset-0 h-full w-full transition duration-700 ease group-hover:rotate-180">
                      <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-blue-600 blur-lg" />
                      <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-fuchsia-600 blur-lg" />
                    </span>
                    <span className="relative text-white">{secondaryButtonText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[2rem] border border-blue-400/60 bg-white/10 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-8"
              >
                <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
                <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg">
                  {card.description}
                </p>
              </article>
            ))}
          </section>

          <section className="rounded-[2rem] border border-blue-400/60 bg-neutral-700/80 px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-10 md:px-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                  Why Managers Use SoundRoster
                </p>

                <h2 className="mt-4 text-3xl font-light text-white sm:text-4xl">
                  Built for the day to day work behind growing artists.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
                  SoundRoster gives managers a cleaner way to stay on top of
                  artist information, upcoming dates, and the details that keep
                  a roster manageable.
                </p>

                <div className="mt-6 space-y-4">
                  {managerHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-blue-400/40 bg-white/5 px-4 py-4"
                    >
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-300" />
                      <p className="text-sm leading-6 text-gray-200 sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-blue-400/50 bg-white/10 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.22)] sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-blue-200">
                      Dashboard Preview
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Upcoming Activity
                    </h3>
                  </div>
                  <div className="rounded-full border border-blue-300/30 bg-white/10 px-3 py-1 text-sm text-blue-200">
                    Live View
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {previewShows.slice(0, 2).map((show) => (
                    <div
                      key={`${show.artist}-${show.venue}-compact`}
                      className="rounded-2xl border border-blue-400/40 bg-neutral-700/70 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-wide text-blue-200">
                            {show.artist}
                          </p>
                          <h4 className="mt-2 text-lg font-semibold text-white">
                            {show.venue}
                          </h4>
                          <p className="mt-1 text-sm text-gray-300">
                            {show.city}
                          </p>
                        </div>

                        <div className="rounded-full border border-blue-200/40 bg-purple-200/80 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm sm:text-sm">
                          {show.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Link
                    to={currentUser ? "/upcoming-shows" : "/login"}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-blue-400/80 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:bg-white/15 sm:text-base"
                  >
                    {currentUser ? "Open Upcoming Shows" : "Log In to View More"}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}