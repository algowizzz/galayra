export const searchAddress = async (query) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&countrycodes=in&format=json&addressdetails=1&accept-language=en`
  )
  return await res.json()
}

export const reverseLookup = async (lat, lon) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=en`
  )
  return await res.json()
}
