import React from "react"
import { useApp } from "./role"

const Navbar = () => {
  const { role, setRole, activePage, setActivePage, theme, toggleTheme } = useApp()
  const navTabs = [
    { label: "Dashboard", page: "dashboard" },
    { label: "Transactions", page: "transactions" },
    { label: "Insights", page: "insights" },
  ]

  return (
    <nav className="bg-white dark:bg-dark-surface shadow-md px-6 py-4 transition-colors duration-200">
      <div className="flex items-center justify-between">

        {/* LEFT SIDE - Logo and Title */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
            F
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-dark-text">
            FinanceDashboard
          </span>
        </div>

       {/* Desktop Navigation Tabs */}
<div className="hidden md:flex items-center gap-2">
  {navTabs.map((tab) => (
    <button
      key={tab.page}
      onClick={() => setActivePage(tab.page)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        activePage === tab.page ? "nav-active" : "nav-inactive"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

        {/* Role Switcher */}
        <div className="flex items-center gap-3">

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <span
            className={`
              text-xs font-semibold px-3 py-1 rounded-full
              ${role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
              }
            `}
          >
            {role === "admin" ? " Admin" : " Viewer"}
          </span>

          {/* Role switcher dropdown */}
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
{/* Mobile Navigation */}
<div className="flex md:hidden items-center gap-2 mt-3">
  {navTabs.map((tab) => (
    <button
      key={tab.page}
      onClick={() => setActivePage(tab.page)}
      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
        activePage === tab.page ? "nav-active" : "nav-inactive"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

    </nav>
  )
}

export default Navbar