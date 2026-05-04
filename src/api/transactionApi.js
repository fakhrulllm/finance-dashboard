import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getTransactions = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const addTransactionApi = async (data) => {
  const res = await axios.post(API_URL, data)
  return res.data
}

export const deleteTransactionApi = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
}