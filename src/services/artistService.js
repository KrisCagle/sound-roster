const baseUrl = "http://localhost:8088"

export const getRosterArtistsForUser = async (userId) => {
  const [artists, artistGenres, genres] = await Promise.all([
    fetch(`${baseUrl}/artists`).then((res) => res.json()),
    fetch(`${baseUrl}/artistGenres`).then((res) => res.json()),
    fetch(`${baseUrl}/genres`).then((res) => res.json()),
  ])

  const userArtists = artists.filter((artist) => artist.userId === userId)

  return userArtists.map((artist) => {
    const matchingArtistGenres = artistGenres.filter(
      (artistGenre) => artistGenre.artistId === artist.id
    )

    const genreNames = matchingArtistGenres
      .map((artistGenre) =>
        genres.find((genre) => genre.id === artistGenre.genreId)
      )
      .filter(Boolean)
      .map((genre) => genre.name)

    return {
      ...artist,
      genres: genreNames,
    }
  })
}