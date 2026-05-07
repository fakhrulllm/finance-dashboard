import { useState } from "react"

function AddTransaction({ onAdd }) {

  const [form, setForm] = useState({
    name: "",
    amount: "",
    type: "expense"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.amount) return

    onAdd({
      id: Date.now(),
      name: form.name,
      amount: Number(form.amount),
      type: form.type,
      date: new Date().toLocaleDateString("id-ID")
    })

    setForm({ name: "", amount: "", type: "expense" })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow mt-6 space-y-3">

      <h2 className="font-bold text-slate-800">Add Transaction</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nama transaksi"
        className="w-full border p-2 rounded"
      />

      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        type="number"
        placeholder="Jumlah"
        className="w-full border p-2 rounded"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Tambah
      </button>

    </form>
  )
}

export default AddTransaction