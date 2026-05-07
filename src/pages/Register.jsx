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

      alert("Registration successful")

      navigate("/login")

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
            Create Account
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Create your FinTrack account
          </p>

        </div>

        {/* NAME */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-700"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-700"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-700"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        {/* BUTTON */}
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl transition font-medium"
        >
          Create Account
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-slate-500">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-700 font-medium ml-1 hover:underline"
          >
            Sign In
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Register