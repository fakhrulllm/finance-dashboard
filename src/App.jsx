import { useState, useEffect } from "react"

import Card from "./components/Card"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import TransactionList from "./components/TransactionList"
import AddTransaction from "./components/AddTransaction"
import FinanceChart from "./components/FinanceChart"
import ReportsChart from "./components/ReportsChart"

import {
  getTransactions,
  addTransactionApi,
  deleteTransactionApi
} from "./api/transactionApi"

function App() {

  // ================= STATE =================
  const [activeMenu, setActiveMenu] = useState("Dashboard")
  const [transactionsData, setTransactionsData] = useState(() => {
    const saved = localStorage.getItem("transactions")
    return saved ? JSON.parse(saved) : initialData
  })
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const menuItems = ["Dashboard", "Reports", "Settings"]

  // ================= FETCH API =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions()

        // hanya isi kalau localStorage kosong
        const saved = localStorage.getItem("transactions")

        if (!saved) {
          setTransactionsData(data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  // ================= LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactionsData))
  }, [transactionsData])

  // ================= CRUD =================
  const handleAddTransaction = async (newData) => {
    try {
      const saved = await addTransactionApi(newData)

      setTransactionsData(prev => {
        const updated = [saved, ...prev]
        localStorage.setItem("transactions", JSON.stringify(updated))
        return updated
      })

    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTransactionApi(id)

      setTransactionsData(prev => {
        const updated = prev.filter(item => item.id !== id)
        localStorage.setItem("transactions", JSON.stringify(updated))
        return updated
      })

    } catch (err) {
      console.error(err)
    }
  }

  // ================= RESET =================
  const handleReset = () => {
    if (confirm("Hapus semua data?")) {
      setTransactionsData([])
      localStorage.removeItem("transactions") // 🔥 fix biar beneran kosong
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
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpense = transactionsData
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const totalBalance = totalIncome - totalExpense

  const summaryCards = [
    { title: "Balance", value: totalBalance },
    { title: "Income", value: totalIncome },
    { title: "Expense", value: totalExpense }
  ]

  // ================= REPORT DATA =================
  const monthlyData = transactionsData.reduce((acc, item) => {
    const month = item.date.slice(3, 10)

    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 }
    }

    acc[month][item.type] += item.amount
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

      {/* SIDEBAR */}
      <Sidebar
        title="Finance Dashboard"
        menu={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* MAIN */}
      <div className="flex-1 p-8 space-y-8">

        <Navbar username="Fakhrul" activeMenu={activeMenu} />

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* DASHBOARD */}
        {activeMenu === "Dashboard" && !loading && (
          <div className="space-y-6">

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summaryCards.map((item, i) => (
                <Card key={i} {...item} />
              ))}
            </div>

            {/* LIST */}
            <TransactionList
              data={filteredTransactions}
              setFilter={setFilter}
              filter={filter}
              onDelete={handleDelete}
            />

            {/* FORM */}
            <AddTransaction onAdd={handleAddTransaction} />

            {/* CHART */}
            <FinanceChart data={transactionsData} />

          </div>
        )}

        {/* REPORTS */}
        {activeMenu === "Reports" && (
          <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow">
                <p className="text-gray-500">Total Transactions</p>
                <h2 className="text-xl font-bold">{totalTransactions}</h2>
              </div>

              <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow">
                <p className="text-gray-500">Total Income</p>
                <h2 className="text-xl font-bold text-green-500">
                  Rp {totalIncome.toLocaleString()}
                </h2>
              </div>

              <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow">
                <p className="text-gray-500">Total Expense</p>
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
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow space-y-4">

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