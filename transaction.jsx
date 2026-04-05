import React, { useState } from "react"
import { useApp } from "./role"

const Transactions = () => {
  const {
    role,
    transactionList,
    addTransaction,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  } = useApp()

  const [showForm, setShowForm] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")

  const [formData, setFormData] = useState({
    date: "",
    particulars: "",
    category: "",
    type: "deposit",
    amount: "",
  })

  const formatAmount = (value) => "₹" + value.toLocaleString("en-IN")
  const allCategories = ["all", ...new Set(transactionList.map((t) => t.category))]

  const resetAdvanced = () => {
    setDateFrom("")
    setDateTo("")
    setCategoryFilter("all")
    setMinAmount("")
    setMaxAmount("")
    setSortBy("date-desc")
  }

  const filteredTransactions = transactionList
    .filter((txn) => {
      const matchesFilter = filter === "all" || txn.type === filter
      const matchesSearch =
        txn.particulars.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDateFrom = dateFrom ? txn.date >= dateFrom : true
      const matchesDateTo = dateTo ? txn.date <= dateTo : true
      const matchesCategory = categoryFilter === "all" || txn.category === categoryFilter
      const matchesMinAmount = minAmount ? txn.amount >= parseInt(minAmount) : true
      const matchesMaxAmount = maxAmount ? txn.amount <= parseInt(maxAmount) : true
      return (
        matchesFilter &&
        matchesSearch &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesCategory &&
        matchesMinAmount &&
        matchesMaxAmount
      )
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date)
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date)
      if (sortBy === "amount-desc") return b.amount - a.amount
      if (sortBy === "amount-asc") return a.amount - b.amount
      return 0
    })

  // ─── EXPORT FUNCTIONS ───────────────────────────────────────

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = (data, filename) => {
    const headers = ["ID", "Date", "Particulars", "Category", "Type", "Amount"]
    const rows = data.map((t) => [t.id, t.date, t.particulars, t.category, t.type, t.amount])
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    downloadFile(csv, filename, "text/csv")
  }

  const exportJSON = (data, filename) => {
    const json = JSON.stringify(data, null, 2)
    downloadFile(json, filename, "application/json")
  }

  // ─────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.date || !formData.particulars || !formData.category || !formData.type || !formData.amount) {
      alert("Please fill in all fields!")
      return
    }
    addTransaction({ ...formData, amount: parseInt(formData.amount) })
    setFormData({ date: "", particulars: "", category: "", type: "deposit", amount: "" })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-dark-textSecondary mt-1">
            {filteredTransactions.length} transactions found
          </p>
        </div>
        <div className="flex items-center gap-2">

          {/* EXPORT BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition-all duration-200 shadow-sm"
            >
              ⬇️ Export
            </button>

            {/* Export Dropdown */}
            {showExport && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 overflow-hidden">

                {/* Filtered exports */}
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
                    Filtered ({filteredTransactions.length})
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { exportCSV(filteredTransactions, "filtered_transactions.csv"); setShowExport(false) }}
                      className="flex-1 text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all font-medium"
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => { exportJSON(filteredTransactions, "filtered_transactions.json"); setShowExport(false) }}
                      className="flex-1 text-xs bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-all font-medium"
                    >
                      JSON
                    </button>
                  </div>
                </div>

                {/* All exports */}
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
                    All ({transactionList.length})
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { exportCSV(transactionList, "all_transactions.csv"); setShowExport(false) }}
                      className="flex-1 text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-all font-medium"
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => { exportJSON(transactionList, "all_transactions.json"); setShowExport(false) }}
                      className="flex-1 text-xs bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-all font-medium"
                    >
                      JSON
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm"
            >
              {showForm ? "✕ Cancel" : "+ Add Transaction"}
            </button>
          )}
        </div>
      </div>

      {/* ADD TRANSACTION FORM */}
      {showForm && role === "admin" && (
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-700 dark:text-dark-text mb-4">Add New Transaction</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Particulars</label>
              <input
                type="text"
                name="particulars"
                value={formData.particulars}
                onChange={handleChange}
                placeholder="e.g. Monthly Salary"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Food, Salary"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 5000"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-all"
              >
                Add Transaction
              </button>
            </div>

          </form>
        </div>
      )}

      {/* FILTER AND SEARCH BAR */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md p-4 space-y-3">

        {/* Search + Type Filter + Advanced Button Row */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          />
          <div className="flex gap-2">
            {["all", "deposit", "withdrawal"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all
                  ${filter === f
                    ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (showAdvanced) resetAdvanced()
              setShowAdvanced(!showAdvanced)
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              showAdvanced
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600"
            }`}
          >
            🔧 Advanced
          </button>
        </div>

        {/* ADVANCED FILTERS PANEL */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="amount-desc">Amount (Highest First)</option>
                <option value="amount-asc">Amount (Lowest First)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Min Amount (₹)</label>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="e.g. 500"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">Max Amount (₹)</label>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={resetAdvanced}
                className="w-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 transition-all"
              >
                ✕ Reset Filters
              </button>
            </div>

          </div>
        )}

      </div>

      {/* TRANSACTIONS LIST */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm dark:shadow-md overflow-hidden">

        <div className="grid grid-cols-5 px-6 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
          <p className="text-xs font-semibold text-white uppercase">Date</p>
          <p className="text-xs font-semibold text-white uppercase">Particulars</p>
          <p className="text-xs font-semibold text-white uppercase">Category</p>
          <p className="text-xs font-semibold text-white uppercase">Type</p>
          <p className="text-xs font-semibold text-white uppercase text-right">Amount</p>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-sm">No transactions found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTransactions.map((txn) => (
              <div
                key={txn.id}
                className="transaction-row grid grid-cols-5 px-6 py-4 border-b border-gray-100 dark:border-gray-700 transition-colors"
              >
                <p className="text-sm font-medium">{txn.date}</p>
                <p className="text-sm">{txn.particulars}</p>
                <p className="text-sm">{txn.category}</p>
                <span
                  className={`
                    text-xs font-semibold px-2 py-1 rounded-full w-fit h-fit
                    ${txn.type === "deposit"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                    }
                  `}
                >
                  {txn.type}
                </span>
                <p
                  className={`
                    text-sm font-bold text-right
                    ${txn.type === "deposit" ? "text-green-600" : "text-red-500"}
                  `}
                >
                  {txn.type === "deposit" ? "+" : "-"}{formatAmount(txn.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Transactions