import React from "react"
const SummaryCard = ({
  title,
  amount,
  icon,
  bgColor,
  textColor,
  trend,
  trendUp,
}) => {

  const formatAmount = (value) => {
    return "₹" + value.toLocaleString("en-IN")
  }
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
      {/* Top row - icon on left, trend on right */}
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
          {/* Show the emoji icon passed as prop */}
          {icon}
        </div>
        {trend && (
          <span
            className={`
              text-xs font-semibold px-2 py-1 rounded-full
              ${trendUp
                // If trendUp is true=green badge (positive)
                ? "bg-green-100 text-green-600"
                // If trendUp is false=red badge (negative)
                : "bg-red-100 text-red-600"
              }
            `}
          >
            {trendUp ? "▲" : "▼"} {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
        {title}
      </p>

      <p className={`text-2xl font-bold ${textColor}`}>
        {formatAmount(amount)}
      </p>

    </div>
  )
}

export default SummaryCard