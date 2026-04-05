💰 Finance Dashboard
A modern personal finance management dashboard built using React, Vite, and Tailwind CSS.
Track income & expenses, analyze spending patterns, and explore insights — all with a smooth UI and no backend dependency.

Features
1. Design & UI
Clean card-based layout with shadows & rounded corners
Color system:
🟢 Income
🔴 Expenses
🔵 Balance
Emoji-based visual indicators
Trend indicators (▲ / ▼)
Gradient highlights for insights
Custom scrollbar & smooth animations

2. Responsiveness
Mobile-first responsive design
Adaptive grid layouts:
Cards: 1 → 3 columns
Filters: 1 → 4 columns
Scrollable transaction table for small screens

3. Functionality
Feature	Description
Dashboard	Financial summary + charts
Transactions	Full list with filters & search
Insights	Analytics & category breakdown
Add Transaction	Admin-only form with validation
Filters	Type, date, category, amount
Export	CSV & JSON download
Dark Mode	Toggle with persistence
Role Switching	Viewer ↔ Admin
Mock API	Simulated async operations

👥 Role-Based Access
Feature        	Viewer	Admin
Dashboard	        ✅	  ✅
Transactions View	✅	  ✅
Insights	        ✅	  ✅
Add Transaction	  ❌	  ✅
Export Data	      ✅	  ✅
Filters	          ✅	  ✅

🛠 Tech Stack
Technology	Purpose
React 18	UI Components
Vite 5	Build tool
Tailwind CSS 4	Styling
PostCSS	CSS processing
Context API	State management

📁 Project Structure
/finance-dashboard
│
├── index.html            # Entry point
├── main.jsx              # React root
├── app.jsx               # Routing logic
├── role.jsx              # Global state (Context API)
│
├── components/
│   ├── navbar.jsx
│   ├── card.jsx
│
├── pages/
│   ├── dashboard.jsx
│   ├── transaction.jsx
│   ├── insights.jsx
│
├── utils/
│   ├── data.js
│   ├── mockapi.js
│
├── styles/
│   └── styles.css
│
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json

⚡ Setup & Installation

🔧 Prerequisites
Node.js (v18+)
npm

📦 Installation
npm install

▶️ Run Development Server
npm run dev

App runs at:
http://localhost:5173

📦 Production Build
npm run build
npm run preview

🧠 State Management
Handled using React Context API (role.jsx)
Global State
State	Purpose
role	Viewer/Admin
transactionList	All transactions
filter	Type filter
searchQuery	Search input
activePage	Current page
theme	Light/Dark
Persisted using localStorage
Synced via useEffect
No prop drilling

🔌 Mock API
Function	Description
fetchTransactions	Load data with delay
addTransactionAPI	Add new transaction
getTransactionSummary	Income, expense, balance
getCategoryBreakdown	Category grouping
filterTransactions	Type filtering
searchTransactions	Search logic

✨ Enhancements Implemented
✅ Dark mode (persistent)
✅ Data persistence (localStorage)
✅ Mock API simulation
✅ Smooth animations
✅ Export functionality
✅ Advanced filters

🔍 Attention to Detail
₹ Indian currency formatting (en-IN)
Dynamic chart scaling
Category color cycling
Smart savings insights (>20% logic)
Proper number parsing (no bugs)
Error handling with try/catch
Auto-reset filters
Auto-closing dropdowns
Custom scrollbar (light + dark)

📝 Assumptions
No real backend (localStorage used)
Works on modern browsers
Currency: INR (₹)
Role switching is UI-only (no auth)
Some data is mocked for demo
