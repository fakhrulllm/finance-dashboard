import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

function ReportsChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
      <h2 className="font-bold mb-4 text-gray-700 dark:text-white">
        Monthly Report
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="income" fill="#14b8a6" />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReportsChart