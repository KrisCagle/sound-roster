import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <main className="min-h-screen bg-neutral-600 text-white">
      <section className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="relative w-full max-w-4xl">
          <div className="absolute inset-x-10 top-10 h-full rounded-[3rem] bg-black/20 blur-3xl" />
          <div className="absolute -bottom-6 left-8 right-8 h-20 rounded-full bg-black/30 blur-2xl" />

          <div className="relative rounded-[3rem] border border-blue-400/70 bg-neutral-700/90 px-8 py-14 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-16 md:py-20">
            <div className="flex flex-col items-center text-center">
              <h1 className="max-w-2xl text-4xl font-light leading-tight md:text-6xl">
                Manage your
                <br />
                artist roster, all
                <br />
                in one place.
              </h1>

              <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-gray-300 md:text-3xl">
                SoundRoster helps music managers
                <br />
                track artists, genres, and tour dates
              </p>

              <Link
                to="/login"
                className="group relative mt-12 inline-flex items-center justify-center overflow-hidden rounded-2xl border border-blue-400 bg-neutral-700 px-10 py-4 text-2xl font-medium text-white shadow-2xl"
              >
                <span className="absolute inset-0 h-full w-full rounded-2xl bg-blue-400 blur-md transition-all duration-700 ease" />
                <span className="absolute left-1/2 top-10 h-20 w-40 -translate-x-1/2 -mt-10 rounded-full bg-blue-300 blur-md transition-all duration-900 ease" />
                <span className="absolute inset-0 h-full w-full transition duration-700 ease group-hover:rotate-180">
                  <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-blue-600 blur-lg" />
                  <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-fuchsia-600 blur-lg" />
                </span>
                <span className="relative text-white">Log In</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}