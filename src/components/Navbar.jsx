function Navbar({ username, activeMenu }) {
    return (
        <div className="bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-md 
                p-4 rounded-2xl 
                shadow-sm flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
                {activeMenu}
            </h2>

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center">
                    {username.charAt(0)}
                </div>
                <p className="text-gray-600 text-sm">
                    {username}
                </p>
            </div>
        </div>
    )
}

export default Navbar