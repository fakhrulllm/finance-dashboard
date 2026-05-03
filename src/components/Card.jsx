function Card({ title, value = 0 }) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(num || 0)
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-lg 
                p-5 rounded-2xl 
                shadow-md hover:shadow-xl 
                transition duration-300 
                border border-white/20">

      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-2xl font-bold text-gray-800 mt-2">
        {formatRupiah(value)}
      </p>

      {/* garis bawah aesthetic */}
      <div className="mt-3 h-1 rounded bg-gradient-to-r from-teal-400 to-teal-600"></div>

    </div>
  )
}

export default Card