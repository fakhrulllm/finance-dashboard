function TransactionList({
  data,
  setFilter,
  filter,
  onDelete
}) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(num)
  }

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow mt-6">

      <h2 className="text-lg font-bold mb-4">
        Recent Transactions
      </h2>

      {/* FILTER TYPE */}
      <div className="flex gap-2 mb-4">
        {["all", "income", "expense"].map(item => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 py-1 rounded capitalize transition ${
              filter === item
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-400">
            No transactions found
          </p>
        ) : (
          data.map((item) => {

            const isIncome = item.type === "income"

            return (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className={`font-bold ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}>
                    {isIncome ? "+" : "-"} {formatRupiah(item.amount)}
                  </p>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>

              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

export default TransactionList