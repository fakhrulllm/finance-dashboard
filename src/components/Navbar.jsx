import { useNavigate } from "react-router-dom"

import useAuth from "../hooks/useAuth"

function Navbar() {

  const navigate = useNavigate()

  const {
    user,
    logout
  } = useAuth()

  const handleLogout = () => {

    logout()

    navigate("/login")
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500">
          {user?.name || "User"}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar