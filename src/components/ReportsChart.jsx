import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts"

function ReportsChart({ data }) {

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-800">
          Monthly Financial Report
        </h2>

        <p className="text-sm md:text-base text-slate-500 mt-1">
          Monthly income and expense summary
        </p>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <Tooltip />

          <Legend />

          {/* INCOME */}
          <Bar
            dataKey="income"
            fill="#1D4ED8"
            radius={[8, 8, 0, 0]}
          />

          {/* EXPENSE */}
          <Bar
            dataKey="expense"
            fill="#EF4444"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}

export default ReportsChart