export const verifyPincodeMatchesCity = async (pincode, city) => {
  try {
    const res = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    )
    const data = await res.json()
    if (!data[0] || data[0].Status !== "Success") return false
    return data[0].PostOffice.some((o) =>
      o.District.toLowerCase() === city.toLowerCase()
    )
  } catch {
    return false
  }
}
