import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

import useTransactions from "../hooks/useTransactions"

import { exportExcel } from "../utils/exportExcel"

function Settings() {

  const {
    transactions = [],
    resetTransactions
  } = useTransactions()

  // RESET DATA
  const handleReset = () => {

    const confirmReset =
      window.confirm("Are you sure you want to reset all transactions?")

    if (!confirmReset) return

    resetTransactions()
  }

  // EXPORT EXCEL
  const handleExport = () => {

    if (transactions.length === 0) {
      alert("No transaction data available")
      return
    }

    exportExcel(transactions)
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8 space-y-8">

        <Navbar />

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">

          {/* HEADER */}
          <div>

            <h1 className="text-2xl font-bold text-slate-800">
              System Management
            </h1>

            <p className="text-slate-500 mt-1">
              Manage financial data and export settings
            </p>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={handleReset}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
            >
              Reset Transactions
            </button>

            <button
              onClick={handleExport}
              className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition"
            >
              Export Financial Report
            </button>

          </div>

          {/* INFO */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">

            <p className="text-sm text-slate-600">
              Total Stored Transactions
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {transactions.length}
            </h2>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Settings