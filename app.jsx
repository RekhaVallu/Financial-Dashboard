import React from "react"
import Navbar from "./navbar"
import Dashboard from "./dashboard"
import Transactions from "./transaction"
import Insights from "./insights"
import { useApp } from "./role"

const App = () => {
  const { activePage, theme } = useApp()

  const renderPage = () => {
    if (activePage === "dashboard") return <Dashboard />
    if (activePage === "transactions") return <Transactions />
    if (activePage === "insights") return <Insights />
    return <Dashboard />
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-200">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App