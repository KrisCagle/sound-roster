import { normalizeRouteId } from "./idHelpers"

describe("normalizeRouteId", () => {
  test("converts numeric strings to numbers", () => {
    expect(normalizeRouteId("12")).toBe(12)
  })

  test("keeps non-numeric ids as strings", () => {
    expect(normalizeRouteId("abc123")).toBe("abc123")
  })

  test("keeps numbers as numbers", () => {
    expect(normalizeRouteId(7)).toBe(7)
  })
})