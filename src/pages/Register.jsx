import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import useAuth from "../hooks/useAuth"

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      register(form)
      alert("Register berhasil")
      navigate("/login")
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Register
        </h1>

        <input
          placeholder="Name"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-teal-600 text-white py-3 rounded-lg">
          Register
        </button>

        <p className="text-center text-sm">
          Sudah punya akun?
          <Link to="/login" className="text-teal-600 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register