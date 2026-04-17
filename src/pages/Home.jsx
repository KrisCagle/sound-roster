import { Link } from "react-router-dom"

export const Home = ({ currentUser }) => {
  const buttonText = currentUser ? "Take Me to Artist Roster" : "Log In"
  const buttonLink = currentUser ? "/roster" : "/login"

  return (
    <main className="min-h-screen bg-neutral-600 text-white">
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="relative w-full max-w-4xl">
          <div className="absolute inset-x-4 top-6 h-full rounded-[2rem] bg-black/20 blur-2xl sm:inset-x-8 sm:top-8 sm:rounded-[2.5rem] sm:blur-3xl" />
          <div className="absolute -bottom-4 left-4 right-4 h-16 rounded-full bg-black/30 blur-xl sm:-bottom-6 sm:left-8 sm:right-8 sm:h-20 sm:blur-2xl" />

          <div className="relative rounded-[2rem] border border-blue-400/70 bg-neutral-700/90 px-5 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:rounded-[3rem] md:px-16 md:py-20">
            <div className="flex flex-col items-center text-center">
              <h1 className="max-w-2xl text-3xl font-light leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Manage your artist roster, all in one place.
              </h1>

              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:mt-8 sm:text-lg md:text-2xl lg:text-3xl">
                SoundRoster helps music managers track artists, genres, and tour dates.
              </p>

              <Link
                to={buttonLink}
                className="group relative mt-10 inline-flex min-h-[52px] w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-blue-400 bg-neutral-700 px-6 py-3 text-lg font-medium text-white shadow-2xl sm:mt-12 sm:w-auto sm:px-10 sm:py-4 sm:text-xl md:text-2xl"
              >
                <span className="absolute inset-0 h-full w-full rounded-2xl bg-blue-400 blur-md transition-all duration-700 ease" />
                <span className="absolute left-1/2 top-10 h-20 w-40 -translate-x-1/2 -mt-10 rounded-full bg-blue-300 blur-md transition-all duration-900 ease" />
                <span className="absolute inset-0 h-full w-full transition duration-700 ease group-hover:rotate-180">
                  <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-blue-600 blur-lg" />
                  <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-fuchsia-600 blur-lg" />
                </span>
                <span className="relative text-white">{buttonText}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}