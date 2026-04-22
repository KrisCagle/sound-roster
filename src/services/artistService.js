const baseUrl = "http://localhost:8088"

export const getRosterArtistsForUser = async (userId) => {
  const [artists, artistGenres, genres] = await Promise.all([
    fetch(`${baseUrl}/artists`).then((res) => res.json()),
    fetch(`${baseUrl}/artistGenres`).then((res) => res.json()),
    fetch(`${baseUrl}/genres`).then((res) => res.json()),
  ])

  const userArtists = artists.filter(
    (artist) => String(artist.userId) === String(userId)
  )

  return userArtists.map((artist) => {
    const matchingArtistGenres = artistGenres.filter(
      (artistGenre) => String(artistGenre.artistId) === String(artist.id)
    )

    const genreNames = matchingArtistGenres
      .map((artistGenre) =>
        genres.find(
          (genre) => String(genre.id) === String(artistGenre.genreId)
        )
      )
      .filter(Boolean)
      .map((genre) => genre.name)

    return {
      ...artist,
      genres: genreNames,
    }
  })
}

export const getAllArtistsWithGenres = async () => {
  const [artists, artistGenres, genres] = await Promise.all([
    fetch(`${baseUrl}/artists`).then((res) => res.json()),
    fetch(`${baseUrl}/artistGenres`).then((res) => res.json()),
    fetch(`${baseUrl}/genres`).then((res) => res.json()),
  ])

  return artists.map((artist) => {
    const matchingArtistGenres = artistGenres.filter(
      (artistGenre) => String(artistGenre.artistId) === String(artist.id)
    )

    const genreNames = matchingArtistGenres
      .map((artistGenre) =>
        genres.find(
          (genre) => String(genre.id) === String(artistGenre.genreId)
        )
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

export const createArtist = async (artist) => {
  const response = await fetch(`${baseUrl}/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  })

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

export const deleteArtistById = async (artistId) => {
  const response = await fetch(`${baseUrl}/artists/${artistId}`, {
    method: "DELETE",
  })

  return response
}

export const getAllGenres = async () => {
  const response = await fetch(`${baseUrl}/genres`)
  return response.json()
}

export const getArtistGenreLinksByArtistId = async (artistId) => {
  const response = await fetch(`${baseUrl}/artistGenres`)
  const links = await response.json()

  return links.filter((link) => String(link.artistId) === String(artistId))
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
          artistId: String(artistId),
          genreId: String(genreId),
        }),
      })
    )
  )
}

export const deleteArtistGenreLinksByArtistId = async (artistId) => {
  const existingLinks = await getArtistGenreLinksByArtistId(artistId)

  await Promise.all(
    existingLinks.map((link) =>
      fetch(`${baseUrl}/artistGenres/${link.id}`, {
        method: "DELETE",
      })
    )
  )
}

export const getTourDatesByArtistId = async (artistId) => {
  const response = await fetch(`${baseUrl}/tourDates`)
  const tourDates = await response.json()

  return tourDates.filter(
    (tourDate) => String(tourDate.artistId) === String(artistId)
  )
}

export const getTourDateById = async (tourDateId) => {
  const response = await fetch(`${baseUrl}/tourDates/${tourDateId}`)
  return response.json()
}

export const createTourDate = async (tourDate) => {
  const response = await fetch(`${baseUrl}/tourDates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tourDate),
  })

  return response.json()
}

export const updateTourDate = async (tourDate) => {
  const response = await fetch(`${baseUrl}/tourDates/${tourDate.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tourDate),
  })

  return response.json()
}

export const deleteTourDateById = async (tourDateId) => {
  const response = await fetch(`${baseUrl}/tourDates/${tourDateId}`, {
    method: "DELETE",
  })

  return response
}

export const deleteTourDatesByArtistId = async (artistId) => {
  const tourDates = await getTourDatesByArtistId(artistId)

  await Promise.all(
    tourDates.map((tourDate) =>
      fetch(`${baseUrl}/tourDates/${tourDate.id}`, {
        method: "DELETE",
      })
    )
  )
}
export const getUpcomingTourDatesWithArtists = async () => {
  const [tourDates, artists] = await Promise.all([
    fetch(`${baseUrl}/tourDates`).then((res) => res.json()),
    fetch(`${baseUrl}/artists`).then((res) => res.json()),
  ])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return tourDates
    .filter((tourDate) => {
      const showDate = new Date(`${tourDate.date}T12:00:00`)
      return showDate >= today
    })
    .map((tourDate) => {
      const artist = artists.find(
        (artist) => String(artist.id) === String(tourDate.artistId)
      )

      return {
        ...tourDate,
        artistName: artist?.name || "Unknown Artist",
        artistPhotoUrl: artist?.photoUrl || "https://placehold.co/300x300",
      }
    })
    .sort(
      (a, b) =>
        new Date(`${a.date}T12:00:00`) - new Date(`${b.date}T12:00:00`)
    )
}