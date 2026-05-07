import { useState } from "react"

function AddTransaction({ onAdd }) {

  const [form, setForm] = useState({
    name: "",
    amount: "",
    type: "expense"
  })

  const handleChange = (e) => {

    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
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

    setForm({
      name: "",
      amount: "",
      type: "expense"
    })
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow mt-6 space-y-4"
    >

      <h2 className="font-bold text-slate-800">
        Add Transaction
      </h2>

      {/* RESPONSIVE FORM */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Transaction Name"
          className="flex-1 border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          placeholder="Amount"
          className="flex-1 border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>

        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition whitespace-nowrap"
        >
          Add
        </button>

      </div>

    </form>
  )
}

export default AddTransaction