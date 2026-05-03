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

    // grouping per tanggal
    const grouped = data.reduce((acc, item) => {
        const date = item.date

        if (!acc[date]) {
            acc[date] = { date, income: 0, expense: 0 }
        }

        if (item.type === "income") {
            acc[date].income += item.amount
        } else {
            acc[date].expense += item.amount
        }

        return acc
    }, {})

    const chartData = Object.values(grouped)

    return (
        <div className="bg-white p-5 rounded-2xl shadow mt-6">
            <h2 className="font-semibold mb-4 text-gray-700">
                Financial Overview 📊
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />
                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#14b8a6" // teal
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444" // red
                        strokeWidth={3}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default FinanceChart