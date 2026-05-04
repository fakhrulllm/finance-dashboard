import { useState, useEffect } from "react"

import Card from "./components/Card"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import TransactionList from "./components/TransactionList"
import AddTransaction from "./components/AddTransaction"
import FinanceChart from "./components/FinanceChart"
import ReportsChart from "./components/ReportsChart"


function App() {

  const [activeMenu, setActiveMenu] = useState("Dashboard")
  const [transactionsData, setTransactionsData] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const menuItems = ["Dashboard", "Reports", "Settings"]

  // ================= FETCH =================
  useEffect(() => {
    const saved = localStorage.getItem("transactions")
    if (saved) {
      setTransactionsData(JSON.parse(saved))
    }
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getTransactions()
      setTransactionsData(data || [])
    } catch (err) {
      console.error("Fetch error:", err)
      setTransactionsData([]) // safety
    } finally {
      setLoading(false)
    }
  }

  // ================= CRUD =================
  const handleAddTransaction = async (newData) => {
    try {
      const saved = await addTransactionApi(newData)
      setTransactionsData(prev => [saved, ...prev])
    } catch (err) {
      console.error("Add error:", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTransactionApi(id)
      setTransactionsData(prev =>
        prev.filter(item => item.id !== id)
      )
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  // ================= RESET =================
  const handleReset = async () => {
    if (!confirm("Hapus semua data?")) return

    try {
      const all = await getTransactions()

      await Promise.all(
        all.map(item => deleteTransactionApi(item.id))
      )

      setTransactionsData([])
    } catch (err) {
      console.error("Reset error:", err)
    }
  }

  // ================= EXPORT =================
  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify(transactionsData, null, 2)],
      { type: "application/json" }
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")

    a.href = url
    a.download = "transactions.json"
    a.click()
  }

  // ================= FILTER =================
  const filteredTransactions =
    filter === "all"
      ? transactionsData
      : transactionsData.filter(t => t.type === filter)

  // ================= SUMMARY =================
  const totalIncome = transactionsData
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + (t.amount || 0), 0)

  const totalExpense = transactionsData
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + (t.amount || 0), 0)

  const totalBalance = totalIncome - totalExpense

  const summaryCards = [
    { title: "Balance", value: totalBalance },
    { title: "Income", value: totalIncome },
    { title: "Expense", value: totalExpense }
  ]

  // ================= REPORT =================
  const monthlyData = transactionsData.reduce((acc, item) => {
    const month = item.date?.slice(3, 10)

    if (!month) return acc

    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 }
    }

    acc[month][item.type] += item.amount || 0
    return acc
  }, {})

  const chartData = Object.keys(monthlyData).map(month => ({
    month,
    ...monthlyData[month]
  }))

  const totalTransactions = transactionsData.length

  // ================= UI =================
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">

      <Sidebar
        title="Finance Dashboard"
        menu={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 p-8 space-y-8">

        <Navbar username="Fakhrul" activeMenu={activeMenu} />

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* DASHBOARD */}
        {activeMenu === "Dashboard" && !loading && (
          <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summaryCards.map((item, i) => (
                <Card key={i} {...item} />
              ))}
            </div>

            <TransactionList
              data={filteredTransactions}
              setFilter={setFilter}
              filter={filter}
              onDelete={handleDelete}
            />

            <AddTransaction onAdd={handleAddTransaction} />

            <FinanceChart data={transactionsData} />

          </div>
        )}

        {/* REPORTS */}
        {activeMenu === "Reports" && (
          <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white/80 p-5 rounded-2xl shadow">
                <p>Total Transactions</p>
                <h2 className="text-xl font-bold">{totalTransactions}</h2>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl shadow">
                <p>Total Income</p>
                <h2 className="text-xl font-bold text-green-500">
                  Rp {totalIncome.toLocaleString()}
                </h2>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl shadow">
                <p>Total Expense</p>
                <h2 className="text-xl font-bold text-red-500">
                  Rp {totalExpense.toLocaleString()}
                </h2>
              </div>

            </div>

            <ReportsChart data={chartData} />

          </div>
        )}

        {/* SETTINGS */}
        {activeMenu === "Settings" && (
          <div className="bg-white/80 p-6 rounded-2xl shadow space-y-4">

            <h2 className="text-xl font-bold">Data Tools</h2>

            <div className="flex gap-4">

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Reset Data
              </button>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg"
              >
                Export JSON
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default App