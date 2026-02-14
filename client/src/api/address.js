import api from "./api";

export const fetchAddresses = () => api.get("/users/me");
export const addAddress = (data) => api.post("/users/address", data);
export const deleteAddress = (id) => api.delete(`/users/address/${id}`);
export const setDefaultAddress = (id) =>
  api.put(`/users/address/default/${id}`);
