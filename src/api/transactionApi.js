import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getTransactions = async () => {
    const { data } = await axios.get(API_URL)
    return data
}

export const addTransactionApi = async (payload) => {
    const { data } = await axios.post(API_URL, payload)
    return data
}

export const deleteTransactionApi = async (id) => {
    return axios.delete(`${API_URL}/${id}`)
}