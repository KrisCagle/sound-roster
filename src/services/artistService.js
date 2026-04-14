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

export const getArtistById = async (artistId) => {
  const response = await fetch(`${baseUrl}/artists/${artistId}`)
  return response.json()
}

export const getAllGenres = async () => {
  const response = await fetch(`${baseUrl}/genres`)
  return response.json()
}

export const getArtistGenreLinksByArtistId = async (artistId) => {
  const response = await fetch(`${baseUrl}/artistGenres?artistId=${artistId}`)
  return response.json()
}

export const updateArtist = async (artist) => {
  const response = await fetch(`${baseUrl}/artists/${artist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  })

  return response.json()
}

export const replaceArtistGenres = async (artistId, selectedGenreIds) => {
  const existingLinks = await getArtistGenreLinksByArtistId(artistId)

  await Promise.all(
    existingLinks.map((link) =>
      fetch(`${baseUrl}/artistGenres/${link.id}`, {
        method: "DELETE",
      })
    )
  )

  await Promise.all(
    selectedGenreIds.map((genreId) =>
      fetch(`${baseUrl}/artistGenres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId,
          genreId,
        }),
      })
    )
  )
}
export const getTourDatesByArtistId = async (artistId) => {
  const response = await fetch(`${baseUrl}/tourDates?artistId=${artistId}`)
  return response.json()
}