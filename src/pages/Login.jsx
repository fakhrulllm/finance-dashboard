import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import useAuth from "../hooks/useAuth"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      login(name, password)
      navigate("/")
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
          Login
        </h1>

        <input
          placeholder="Username"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-teal-600 text-white py-3 rounded-lg">
          Login
        </button>

        <p className="text-center text-sm">
          Belum punya akun?
          <Link to="/register" className="text-teal-600 ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login