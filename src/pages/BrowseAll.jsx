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
      <main>
        <h1>Browse All Artists</h1>
        <p>Please sign in to browse artists.</p>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main>
        <h1>Browse All Artists</h1>
        <p>Loading artists...</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Browse All Artists</h1>
      <p>{artists.length} artists</p>

      {artists.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <section>
          {artists.map((artist) => (
            <article
              key={artist.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  width="200"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x300"
                  }}
                />
              </div>

              <h2>{artist.name}</h2>
              <p>{artist.originCity}</p>
              <p>Active Since: {artist.activeSince}</p>
              <p>{artist.bio}</p>

              <div>
                <strong>Genres:</strong>
                {artist.genres.length === 0 ? (
                  <span> None listed</span>
                ) : (
                  <ul>
                    {artist.genres.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                )}
              </div>

              <Link to={`/artists/${artist.id}`}>View Artist Profile</Link>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}