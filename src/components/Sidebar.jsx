function Sidebar({ menu, title, activeMenu, setActiveMenu }) {
    return (
        <div className="w-64 bg-gradient-to-b from-teal-700 to-teal-900 
           text-white p-6">

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
                    <li
                        key={index}
                        onClick={() => setActiveMenu(item)}
                        className={`px-3 py-2 rounded-lg cursor-pointer transition ${activeMenu === item
                            ? "bg-white text-teal-700 font-semibold"
                            : "hover:bg-teal-700"
                            }`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar