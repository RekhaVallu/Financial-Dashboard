
export const transactions = [
  { id: 1, date: "2024-04-01",
     particulars: "Monthly Salary", 
     category: "Salary", 
     type: "deposit",
      amount: 50000 },
  { id: 2, date: "2024-04-02",
     particulars: "Grocery Shopping",
      category: "Food",
       type: "withdrawal",
        amount: 2500 },
  { id: 3, date: "2024-04-03",
     particulars: "Netflix Subscription",
      category: "Entertainment",
       type: "withdrawal",
        amount: 649 },
  { id: 4, date: "2024-04-04",
     particulars: "Electricity Bill",
      category: "Utilities",
       type: "withdrawal",
        amount: 1800 },
  { id: 5, date: "2024-04-05",
     particulars: "Freelance Project", 
     category: "Freelance", 
     type: "deposit",
      amount: 12000 },
  { id: 6, date: "2024-04-06", 
    particulars: "Restaurant Dinner",
     category: "Food",
      type: "withdrawal", 
      amount: 1200 },
  { id: 7, date: "2024-04-07", 
    particulars: "Gym Membership", 
    category: "Health", 
    type: "withdrawal", 
    amount: 999 },
  { id: 8, date: "2024-04-08",
     particulars: "Online Course",
      category: "Education", 
      type: "withdrawal",
       amount: 2999 },
  { id: 9, date: "2024-04-09", 
    particulars: "Part Time Work",
     category: "Freelance", 
     type: "deposit",
      amount: 8000 },
  { id: 10, date: "2024-04-10",
     particulars: "Mobile Recharge",
      category: "Utilities", 
      type: "withdrawal", 
      amount: 399 },
  { id: 11, date: "2024-04-11",
     particulars: "Shopping - Clothes",
      category: "Shopping", 
      type: "withdrawal",
       amount: 3500 },
  { id: 12, date: "2024-04-12",
     particulars: "Dividend Income",
      category: "Investment", 
      type: "deposit", 
      amount: 5000 },
  { id: 13, date: "2024-04-13",
     particulars: "Medicine",
      category: "Health", 
      type: "withdrawal", 
      amount: 850 },
  { id: 14, date: "2024-04-14",
     particulars: "Petrol",
      category: "Transport",
       type: "withdrawal", 
       amount: 1500 },
  { id: 15, date: "2024-04-15", 
    particulars: "Bonus",
     category: "Salary",
      type: "deposit", 
      amount: 10000 },
]

export const getTotalIncome = (txnList = transactions) => {
  return txnList.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)
}

export const getTotalExpenses = (txnList = transactions) => {
  return txnList.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0)
}

export const getBalance = (txnList = transactions) => {
  return getTotalIncome(txnList) - getTotalExpenses(txnList)
}

export const getCategoryWiseSpending = (txnList = transactions) => {
  const expenses = txnList.filter((t) => t.type === "withdrawal")
  return expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
}

export const getMonthlyData = (txnList = transactions) => {
  return [
    { month: "January", income: 45000, expense: 18000 },
    { month: "February", income: 48000, expense: 21000 },
    { month: "March", income: 52000, expense: 19500 },
    { month: "April", income: getTotalIncome(txnList), expense: getTotalExpenses(txnList) },
  ]
}