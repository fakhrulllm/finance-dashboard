import { useState } from "react"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Card from "../components/Card"
import TransactionList from "../components/TransactionList"
import AddTransaction from "../components/AddTransaction"
import FinanceChart from "../components/FinanceChart"

import useTransactions from "../hooks/useTransactions"

function Dashboard() {

  const {
    transactions,
    loading,
    addTransaction,
    deleteTransaction
  } = useTransactions()

  const [filter, setFilter] = useState("all")

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter(t => t.type === filter)

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0)

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0)

  const totalBalance = totalIncome - totalExpense

  const cards = [
    {
      title: "Balance",
      value: totalBalance
    },
    {
      title: "Income",
      value: totalIncome
    },
    {
      title: "Expense",
      value: totalExpense
    }
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">

      <Sidebar />

      <div className="flex-1 p-8 space-y-8">

        <Navbar />

        {loading ? (
          <p className="text-center animate-pulse text-gray-400">
            Loading data...
          </p>
        ) : (
          <div className="space-y-6">

            {transactions.length === 0 && (
              <p className="text-center text-gray-400">
                No transactions yet 💸
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((item, index) => (
                <Card key={index} {...item} />
              ))}
            </div>

            <TransactionList
              data={filteredTransactions}
              filter={filter}
              setFilter={setFilter}
              onDelete={deleteTransaction}
            />

            <AddTransaction onAdd={addTransaction} />

            <FinanceChart data={transactions} />

          </div>
        )}

      </div>

    </div>
  )
}

export default Dashboard