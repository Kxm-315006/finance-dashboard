import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import TransactionTable from "./components/TransactionTable";
import AddTransactionForm from "./components/AddTransactionForm";
import Insights from "./components/Insights";
import { useAppContext } from "./context/AppContext";
import SpendingChart from "./components/SpendingChart";

function App() {
  const { transactions, role, setRole } = useAppContext();

  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Proper Dark Mode Handling
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // 📊 Calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="min-h-screen transition-all duration-300 p-4 md:p-6 bg-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">

        {/* 🔹 Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

          <h1 className="text-3xl md:text-4xl font-bold">
            Finance Dashboard 💰
          </h1>

          <div className="flex gap-3 items-center">

            {/* Role Switch */}
            <select
              className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? "Light ☀️" : "Dark 🌙"}
            </button>

          </div>
        </div>

        {/* 🔹 Summary */}
        <SummaryCards
          income={income}
          expenses={expenses}
          balance={balance}
        />

        {/* 🔹 Admin Form */}
        {role === "admin" && (
          <div className="mt-6">
            <AddTransactionForm />
          </div>
        )}

        {/* 🔹 Insights */}
        <div className="mt-6">
          <Insights transactions={transactions} />
        </div>

        {/* 🔹 Table */}
        <div className="mt-6">
          <TransactionTable transactions={transactions} />
        </div>

      </div>
    </div>
  );
}

export default App;