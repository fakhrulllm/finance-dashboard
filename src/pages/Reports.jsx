import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import ReportsChart from "../components/ReportsChart"

import useTransactions from "../hooks/useTransactions"


function Reports() {

  const {
    transactions = []
  } = useTransactions()

  // TOTAL INCOME
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0)

  // TOTAL EXPENSE
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0)

  // TOTAL TRANSACTIONS
  const totalTransactions = transactions.length

  // MONTHLY REPORT
  const monthlyData = transactions.reduce((acc, item) => {

    const month = item.date?.slice(3, 10)

    if (!month) return acc

    if (!acc[month]) {
      acc[month] = {
        income: 0,
        expense: 0
      }
    }

    acc[month][item.type] += Number(item.amount || 0)

    return acc

  }, {})

  // CHART DATA
  const chartData = Object.keys(monthlyData).map(month => ({
    month,
    ...monthlyData[month]
  }))

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-4 md:p-8 space-y-6">

        <Navbar />

        <div className="space-y-6">

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                Total Transactions
              </p>

              <h2 className="text-2xl font-bold">
                {totalTransactions}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                Total Income
              </p>

              <h2 className="text-2xl font-bold text-green-500">
                Rp {(totalIncome || 0).toLocaleString("id-ID")}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                Total Expense
              </p>

              <h2 className="text-2xl font-bold text-red-500">
                Rp {(totalExpense || 0).toLocaleString("id-ID")}
              </h2>
            </div>

          </div>

          {/* CHART */}
          <ReportsChart data={chartData} />

        </div>

      </div>

    </div>
  )
}

export default Reports