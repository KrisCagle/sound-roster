export const isArtistOwner = (currentUser, artist) => {
  return String(currentUser?.id) === String(artist?.userId)
}