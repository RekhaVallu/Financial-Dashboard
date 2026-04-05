// Mock API - Simulates backend API calls with network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))
export const fetchTransactions = async () => {
  await delay()
  const savedTransactions = localStorage.getItem("app-transactions")
  return {
    success: true,
    data: savedTransactions ? JSON.parse(savedTransactions) : [],
    message: "Transactions fetched successfully"
  }
}
// Add new transaction
export const addTransactionAPI = async (transaction) => {
  await delay()
  
  if (!transaction.description || !transaction.amount || !transaction.category) {
    return {
      success: false,
      message: "Invalid transaction data"
    }
  }

  return {
    success: true,
    data: {
      ...transaction,
      id: Date.now()
    },
    message: "Transaction added successfully"
  }
}

// Get transaction summary
export const getTransactionSummary = async () => {
  await delay()
  const savedTransactions = localStorage.getItem("app-transactions")
  const transactions = savedTransactions ? JSON.parse(savedTransactions) : []

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return {
    success: true,
    data: {
      totalIncome,
      totalExpenses,
      balance,
      transactionCount: transactions.length
    },
    message: "Summary fetched successfully"
  }
}

// Get category breakdown
export const getCategoryBreakdown = async () => {
  await delay()
  const savedTransactions = localStorage.getItem("app-transactions")
  const transactions = savedTransactions ? JSON.parse(savedTransactions) : []

  const categorySpending = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  return {
    success: true,
    data: categorySpending,
    message: "Category breakdown fetched successfully"
  }
}

// Filtering of transactions
export const filterTransactions = async (type = "all") => {
  await delay()
  const savedTransactions = localStorage.getItem("app-transactions")
  const transactions = savedTransactions ? JSON.parse(savedTransactions) : []

  const filtered = type === "all" 
    ? transactions 
    : transactions.filter(t => t.type === type)

  return {
    success: true,
    data: filtered,
    message: `Filtered transactions by type: ${type}`
  }
}

// Search transactions
export const searchTransactions = async (query) => {
  await delay()
  const savedTransactions = localStorage.getItem("app-transactions")
  const transactions = savedTransactions ? JSON.parse(savedTransactions) : []

  const results = transactions.filter(t =>
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  )

  return {
    success: true,
    data: results,
    message: `Search results for: ${query}`
  }
}
