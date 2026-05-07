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
      window.confirm("Yakin hapus semua data?")

    if (!confirmReset) return

    resetTransactions()
  }

  // EXPORT EXCEL
  const handleExport = () => {

    if (transactions.length === 0) {
      alert("Tidak ada data untuk di export")
      return
    }

    exportExcel(transactions)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">

      <Sidebar />

      <div className="flex-1 p-8 space-y-8">

        <Navbar />

        <div className="bg-white p-6 rounded-2xl shadow space-y-6">

          <div>
            <h1 className="text-2xl font-bold">
              Settings
            </h1>

            <p className="text-gray-500">
              Manage your finance dashboard data
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={handleReset}
              className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
            >
              Reset Data 🗑️
            </button>

            <button
              onClick={handleExport}
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
            >
              Export Excel 📊
            </button>

          </div>

          {/* INFO */}
          <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl">

            <p className="text-sm text-gray-600">
              Total stored transactions:
              <span className="font-semibold ml-2">
                {transactions.length}
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Settings