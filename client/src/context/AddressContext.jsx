import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchAddresses,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from "../api/address";

const AddressContext = createContext()
export const useAddress = () => useContext(AddressContext)

export default function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)

  const loadAddresses = async () => {
    try {
      const res = await fetchAddresses()
      setAddresses(res.data.addresses || [])
    } catch {
      setAddresses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAddresses()
  }, [])
  const createAddress = async (data) => {
    await addAddress(data)
    await loadAddresses()
  }
  const removeAddress = async (id) => {
    await deleteAddress(id)
    await loadAddresses()
  }
  const makeDefault = async (id) => {
    await setDefaultAddress(id)
    await loadAddresses()
  }
  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        createAddress,
        removeAddress,
        makeDefault,
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}
