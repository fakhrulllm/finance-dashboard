import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import Login from "./pages/Login"
import Register from "./pages/Register"

import ProtectedRoute from "./components/ProtectedRoute"

import useTransactions from "./hooks/useTransactions"

function App() {

  const {
    transactionsData,
    filter,
    setFilter,
    loading,

    filteredTransactions,

    summaryCards,
    totalTransactions,
    totalIncome,
    totalExpense,
    chartData,

    handleAddTransaction,
    handleDelete,
    handleReset,
    handleExport
  } = useTransactions()

  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard
              loading={loading}
              transactionsData={transactionsData}
              summaryCards={summaryCards}
              filteredTransactions={filteredTransactions}
              filter={filter}
              setFilter={setFilter}
              handleDelete={handleDelete}
              handleAddTransaction={handleAddTransaction}
            />
          </ProtectedRoute>
        }
      />

      {/* REPORTS */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports
              totalTransactions={totalTransactions}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              chartData={chartData}
            />
          </ProtectedRoute>
        }
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings
              handleReset={handleReset}
              handleExport={handleExport}
            />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App