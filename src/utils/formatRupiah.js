// src/utils/formatRupiah.js
export const formatRupiah = (num) => {
  return "Rp " + (num || 0).toLocaleString("id-ID")
}