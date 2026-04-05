import React from "react"
import { getTotalIncome, getTotalExpenses, 
    getBalance, getCategoryWiseSpending,
     getMonthlyData } from "./data"
import { useApp } from "./role"

const Insights = () => {
  const { transactionList } = useApp()
  const totalIncome = getTotalIncome(transactionList)
  const totalExpenses = getTotalExpenses(transactionList)
  const balance = getBalance(transactionList)
  const categorySpending = getCategoryWiseSpending(transactionList)
  const monthlyData = getMonthlyData(transactionList)

  const formatAmount = (value) => "₹" + value.toLocaleString("en-IN")

  const highestCategory = Object.entries(categorySpending).sort(
    (a, b) => b[1] - a[1]
  )[0]

  const savingsRate = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)

  const totalCategoryExpenses = Object.values(categorySpending).reduce(
    (sum, val) => sum + val, 0
  )

  const barColors = [
    "bg-blue-400",
    "bg-purple-400",
    "bg-orange-400",
    "bg-pink-400",
    "bg-yellow-400",
    "bg-teal-400",
    "bg-indigo-400",
  ]

  return (
    <div className="space-y-6">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Insights</h1>
        <p className="text-sm text-gray-500 dark:text-dark-textSecondary mt-1">Smart observations about your finances</p>
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Savings Rate */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6 border-l-4 border-blue-400">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Savings Rate</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{savingsRate}%</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {savingsRate > 20
              ? " Great! You're saving well above 20%"
              : " Try to save at least 20% of income"}
          </p>
        </div>

        {/* Highest Spending Category */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6 border-l-4 border-red-400">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Top Spending</p>
          <p className="text-3xl font-bold text-red-500 dark:text-red-400">{highestCategory[0]}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            💸 {formatAmount(highestCategory[1])} spent in this category
          </p>
        </div>

        {/* Net Balance */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6 border-l-4 border-green-400">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Net Savings</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatAmount(balance)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            ✅ Income minus all expenses this month
          </p>
        </div>

      </div>

      {/* CATEGORY SPENDING CHART */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6">
        <h2 className="text-base font-semibold text-gray-700 dark:text-dark-text mb-6">
          Category Breakdown
        </h2>

        <div className="space-y-4">
          {Object.entries(categorySpending)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount], index) => {
              const percentage = ((amount / totalCategoryExpenses) * 100).toFixed(1)

              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 dark:text-gray-500">{percentage}%</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {formatAmount(amount)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`${barColors[index % barColors.length]} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* MONTHLY COMPARISON */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6">
        <h2 className="text-base font-semibold text-gray-700 dark:text-dark-text mb-4">
          Monthly Summary
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-900 uppercase pb-3">Month</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-900 uppercase pb-3">Income</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-900 uppercase pb-3">Expenses</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-900 uppercase pb-3">Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {monthlyData.map((row) => (
                <tr key={row.month} className="hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-colors duration-150">
                  <td className="py-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">{row.month}</td>
                  <td className="py-3 text-sm text-green-600 dark:text-green-400 font-semibold text-right">
                    {formatAmount(row.income)}
                  </td>
                  <td className="py-3 text-sm text-red-500 dark:text-red-400 font-semibold text-right">
                    {formatAmount(row.expense)}
                  </td>
                  <td className={`py-3 text-sm font-semibold text-right ${
                    row.income - row.expense > 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {formatAmount(row.income - row.expense)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TIPS */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-100 mb-3">Observations</h2>
        <ul className="space-y-2">
          {[
            `You spent the most on ${highestCategory[0]}.`,
            `Your savings rate is ${savingsRate}%.`,
            "Track your daily expenses.",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-400 dark:text-blue-300 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Insights