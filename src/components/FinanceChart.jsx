import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function FinanceChart({ data }) {

  // GROUP BY DATE
  const grouped = data.reduce((acc, item) => {

    const date = item.date

    if (!acc[date]) {
      acc[date] = {
        date,
        income: 0,
        expense: 0
      }
    }

    if (item.type === "income") {
      acc[date].income += Number(item.amount)
    } else {
      acc[date].expense += Number(item.amount)
    }

    return acc

  }, {})

  const chartData = Object.values(grouped)

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6">

      <div className="mb-5">

        <h2 className="font-semibold mb-4 text-sm md:text-base">
          Financial Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Income and expense analytics
        </p>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <Tooltip />

          {/* INCOME */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#1D4ED8"
            strokeWidth={3}
            dot={false}
          />

          {/* EXPENSE */}
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default FinanceChart