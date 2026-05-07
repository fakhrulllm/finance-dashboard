# 💸 Finance Dashboard

A modern and responsive **Finance Dashboard** built with React, Tailwind CSS, and Vite.
This application allows users to track income and expenses, visualize financial data, and export reports.

---

## 🚀 Features

* 📊 Dashboard summary (Balance, Income, Expense)
* ➕ Add new transactions
* ❌ Delete transactions
* 🔍 Filter transactions (Income / Expense)
* 📈 Financial charts & reports
* 💾 Data persistence using LocalStorage
* 📤 Export data to Excel (.xlsx)
* 🧹 Reset all data
* ⚡ Fast performance with Vite
* 📱 Fully responsive UI

---

## 🛠️ Tech Stack

* ⚛️ React.js
* ⚡ Vite
* 🎨 Tailwind CSS
* 📊 Recharts
* 📁 XLSX (Excel Export)
* 💾 LocalStorage (No backend)

---

## 📦 Installation

Clone this repository:

```bash
git clone https://github.com/fakhrulllm/finance-dashboard.git
cd finance-dashboard
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🏗️ Build

```bash
npm run build
```

---

## 🌐 Live Demo

👉 https://finance-dashboard-one-kappa-18.vercel.app/

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── Card.jsx
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── TransactionList.jsx
│   ├── AddTransaction.jsx
│   ├── FinanceChart.jsx
│   └── ReportsChart.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📊 How It Works

* Data is stored locally using **LocalStorage**
* Transactions are managed using React state
* Charts update dynamically based on data
* Export feature converts data into Excel format

---

## 🎯 Future Improvements

### Near-term (Frontend Focus)
- 🔍 Search & filter transaksi
- 📅 Filter berdasarkan tanggal
- 📊 Monthly summary
- 💾 Import & export data
- 🎨 UI improvements

### Long-term
- 🔐 Authentication system
- ☁️ Backend integration
- 📊 Advanced analytics dashboard
- 🌙 Dark mode
- 📱 Mobile app version

---

## 👨‍💻 Author

**Fakhrul Maulana**

* GitHub: https://github.com/fakhrulllm

---

## ⭐ Notes

This project is part of my frontend portfolio to showcase:

* React fundamentals
* State management
* UI/UX design
* Data handling & visualization

---



import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Card from "./components/Card"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import TransactionList from "./components/TransactionList"
import AddTransaction from "./components/AddTransaction"
import FinanceChart from "./components/FinanceChart"
import ReportsChart from "./components/ReportsChart"

import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

function App() {
  const [transactionsData, setTransactionsData] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("transactions")

    setTimeout(() => {
      if (saved) {
        setTransactionsData(JSON.parse(saved))
      }
      setLoading(false)
    }, 800)
  }, [])

  // SAVE
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactionsData))
  }, [transactionsData])

  // ADD
  const handleAddTransaction = (newData) => {
    setTransactionsData(prev => [newData, ...prev])
  }

  // DELETE
  const handleDelete = (id) => {
    setTransactionsData(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  // RESET
  const handleReset = () => {
    if (!window.confirm("Yakin hapus semua data?")) return
    setTransactionsData([])
    localStorage.removeItem("transactions")
  }

  // EXPORT
  const handleExport = () => {
    if (transactionsData.length === 0) {
      alert("Tidak ada data untuk di export")
      return
    }

    const formatted = transactionsData.map(item => ({
      Nama: item.name,
      Tanggal: item.date,
      Tipe: item.type,
      Jumlah: `Rp ${item.amount.toLocaleString("id-ID")}`
    }))

    const ws = XLSX.utils.json_to_sheet(formatted)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Transactions")

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([buffer], { type: "application/octet-stream" })

    saveAs(blob, "transactions.xlsx")
  }

  // FILTER
  const filteredTransactions =
    filter === "all"
      ? transactionsData
      : transactionsData.filter(t => t.type === filter)

  // SUMMARY
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

  // REPORT
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">

      <Sidebar />

      <div className="flex-1 p-8 space-y-8">

        <Navbar username="Fakhrul" />

        <Routes>

          {/* DASHBOARD */}
          <Route path="/" element={
            loading ? (
              <p className="text-center text-gray-400 animate-pulse">
                Loading data...
              </p>
            ) : (
              <div className="space-y-6">

                {transactionsData.length === 0 && (
                  <p className="text-center text-gray-400">
                    No transactions yet 💸
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            )
          } />

          {/* REPORTS */}
          <Route path="/reports" element={
            <div className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white p-5 rounded-2xl shadow">
                  <p className="text-gray-500">Total Transactions</p>
                  <h2 className="text-xl font-bold">{totalTransactions}</h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                  <p className="text-gray-500">Total Income</p>
                  <h2 className="text-xl font-bold text-green-500">
                    Rp {totalIncome.toLocaleString("id-ID")}
                  </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                  <p className="text-gray-500">Total Expense</p>
                  <h2 className="text-xl font-bold text-red-500">
                    Rp {totalExpense.toLocaleString("id-ID")}
                  </h2>
                </div>

              </div>

              <ReportsChart data={chartData} />

            </div>
          } />

          {/* SETTINGS */}
          <Route path="/settings" element={
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">

              <h2 className="text-xl font-bold">Data Tools</h2>

              <div className="flex gap-4">

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Reset Data
                </button>

                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Export Excel
                </button>

              </div>

            </div>
          } />

        </Routes>

      </div>
    </div>
  )
}

export default App
