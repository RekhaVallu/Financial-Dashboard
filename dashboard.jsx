import React, { useState, useEffect } from "react"
import SummaryCard from "./card"
import { useApp } from "./role"
import { getTotalIncome, getTotalExpenses,
     getBalance, getCategoryWiseSpending,
      getMonthlyData } from "./data"
import { getTransactionSummary } from "./mockapi"

const Dashboard = () => {
  const { transactionList } = useApp()
  const [apiLoading, setApiLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setApiLoading(true)
      try {
        const response = await getTransactionSummary()
        console.log("📊 Mock API Response:", response)
      } catch (error) {
        console.error("API Error:", error)
      } finally {
        setApiLoading(false)
      }
    }
    fetchData()
  }, [transactionList])

  const totalIncome = getTotalIncome(transactionList)
  const totalExpenses = getTotalExpenses(transactionList)
  const balance = getBalance(transactionList)
  const categorySpending = getCategoryWiseSpending(transactionList)
  const monthlyData = getMonthlyData(transactionList)

  const maxMonthlyValue = Math.max(
    ...monthlyData.map((m) => Math.max(m.income, m.expense))
  )

  const recentTransactions = transactionList.slice(0, 5)
  const formatAmount = (value) => "₹" + value.toLocaleString("en-IN")

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 dark:text-dark-textSecondary mt-1">Your financial summary for April 2024</p>
        </div>
        {apiLoading && <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">🔄 Loading...</span>}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          amount={balance}
          icon="💰"
          bgColor="bg-blue-100"
          textColor="text-blue-600"
          trend="+12% this month"
          trendUp={true}
        />
        <SummaryCard
          title="Total Deposits"
          amount={totalIncome}
          icon="📈"
          bgColor="bg-green-100"
          textColor="text-green-600"
          trend="+8% vs last month"
          trendUp={true}
        />
        <SummaryCard
          title="Total Withdrawals"
          amount={totalExpenses}
          icon="📉"
          bgColor="bg-red-100"
          textColor="text-red-500"
          trend="+3% vs last month"
          trendUp={false}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Monthly Bar Chart */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6">
          <h2 className="text-base font-semibold text-gray-700 dark:text-dark-text mb-4">
            Monthly Deposits vs Withdrawals
          </h2>
          <div className="space-y-4">
            {monthlyData.map((month) => (
              <div key={month.month}>
                <p className="text-xs text-gray-500 mb-1 font-medium">{month.month}</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs w-16 text-green-600">Deposit</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-green-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(month.income / maxMonthlyValue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-20 text-right">
                    {formatAmount(month.income)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-16 text-red-500">Withdraw</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-red-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(month.expense / maxMonthlyValue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-20 text-right">
                    {formatAmount(month.expense)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Spending Breakdown */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6">
          <h2 className="text-base font-semibold text-gray-700 dark:text-dark-text mb-4">
            Spending by Category
          </h2>
          <div className="space-y-3">
            {Object.entries(categorySpending).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm text-gray-600">{category}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {formatAmount(amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6">
        <h2 className="text-base font-semibold text-gray-700 dark:text-dark-text mb-4">
          Recent Transactions
        </h2>
        <div className="divide-y divide-gray-100">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center text-lg
                    ${txn.type === "deposit" ? "bg-green-100" : "bg-red-100"}
                  `}
                >
                  {txn.type === "deposit" ? "⬆️" : "⬇️"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{txn.particulars}</p>
                  <p className="text-xs text-gray-400">{txn.category} · {txn.date}</p>
                </div>
              </div>
              <span
                className={`
                  text-sm font-bold
                  ${txn.type === "deposit" ? "text-green-600" : "text-red-500"}
                `}
              >
                {txn.type === "deposit" ? "+" : "-"}{formatAmount(txn.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard