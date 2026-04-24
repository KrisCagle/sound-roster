import { isArtistOwner } from "./ownership"

describe("isArtistOwner", () => {
  test("returns true when the current user owns the artist", () => {
    expect(isArtistOwner({ id: 1 }, { userId: 1 })).toBe(true)
  })

  test("returns false when the current user does not own the artist", () => {
    expect(isArtistOwner({ id: 1 }, { userId: 2 })).toBe(false)
  })

  test("returns false when there is no current user", () => {
    expect(isArtistOwner(null, { userId: 2 })).toBe(false)
  })

  test("handles string and number ids safely", () => {
    expect(isArtistOwner({ id: "7" }, { userId: 7 })).toBe(true)
  })
})