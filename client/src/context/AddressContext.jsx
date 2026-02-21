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
    const res = await addAddress(data)
    setAddresses(res.data)
  }

  const removeAddress = async (id) => {
    const res = await deleteAddress(id)
    setAddresses(res.data)
  }

  const makeDefault = async (id) => {
    const res = await setDefaultAddress(id)
    setAddresses(res.data)
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        createAddress,
        removeAddress,
        makeDefault,
        reload: loadAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}
