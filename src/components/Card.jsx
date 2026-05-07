function Card({ title, value = 0 }) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(num || 0)
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">

      <h3 className="text-slate-500 text-sm font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold text-slate-800 mt-3">
        {formatRupiah(value)}
      </p>

      {/* accent line */}
      <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-blue-700 to-blue-500"></div>

    </div>
  )
}

export default Card