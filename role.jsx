import { createContext, useState, useContext, useEffect } from "react"
import { transactions } from "./data"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer")
  const [transactionList, setTransactionList] = useState(() => {
    const savedTransactions = localStorage.getItem("app-transactions")
    return savedTransactions ? JSON.parse(savedTransactions) : transactions
  })
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activePage, setActivePage] = useState("dashboard")
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme")
    return savedTheme || "light"
  })

  useEffect(() => {
    const htmlElement = document.documentElement
    if (theme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
    localStorage.setItem("app-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("app-transactions", JSON.stringify(transactionList))
  }, [transactionList])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const addTransaction = (newTransaction) => {
    const transactionWithId = {
      ...newTransaction,
      id: Date.now(),
    }
    setTransactionList([transactionWithId, ...transactionList])
  }

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        transactionList,
        addTransaction,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        activePage,
        setActivePage,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return useContext(AppContext)
}