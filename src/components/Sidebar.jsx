import { Link, useLocation } from "react-router-dom"

function Sidebar() {

  const location = useLocation()

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" }
  ]

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-950 to-blue-950 p-6">

      {/* LOGO */}
      <div className="mb-12">

        <h1 className="text-2xl font-bold tracking-wide">

          <span className="text-white">
            Corporate
          </span>

          <span className="text-yellow-400 ml-2">
            Finance
          </span>

        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Control Center
        </p>

      </div>

      {/* MENU */}
      <ul className="space-y-3">

        {menu.map((item, index) => (

          <li key={index}>

            <Link
              to={item.path}
              className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-700 text-white font-semibold shadow-sm"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>

          </li>

        ))}

      </ul>

    </div>
  )
}

export default Sidebar