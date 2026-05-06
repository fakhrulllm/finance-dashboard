import { Link, useLocation } from "react-router-dom"

function Sidebar() {
  const location = useLocation()

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" }
  ]

  return (
    <div className="w-64 bg-gradient-to-b from-teal-700 to-teal-900 text-white p-6">

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-xl font-bold">
          <span className="text-white">Finance</span>{" "}
          <span className="text-teal-200">Dashboard</span>
        </h1>
      </div>

      {/* MENU */}
      <ul className="space-y-3">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-white text-teal-700 font-semibold"
                  : "hover:bg-teal-700"
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