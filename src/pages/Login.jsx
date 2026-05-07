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
    <div className="flex items-center justify-center min-h-screen bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5"
      >

        {/* HEADER */}
        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-800">
             Welcome to FinTrack
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Manage your personal finances smarter
          </p>

        </div>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-700"
          onChange={(e) => setName(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl transition font-medium"
        >
          Sign In
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-slate-500">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-700 font-medium ml-1 hover:underline"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Login