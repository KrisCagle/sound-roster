export const normalizeRouteId = (id) => {
    return Number.isNaN(Number(id)) ? id : Number(id)
}