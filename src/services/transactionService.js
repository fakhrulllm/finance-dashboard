// src/services/transactionService.js
const KEY = "transactions"

export const getTransactions = () => {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export const saveTransactions = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export const clearTransactions = () => {
  localStorage.removeItem(KEY)
}