import React, { useState } from "react";

const TransactionTable = ({ transactions }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [type, setType] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [limit, setLimit] = useState("all");

    // 🔹 Empty state (no data at all)
    if (!transactions || transactions.length === 0) {
        return (
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-400">
                No transactions available
            </div>
        );
    }

    // 🔹 Unique categories
    const categories = [...new Set(transactions.map((t) => t.category))];

    // 🔹 Filtering logic
    let filtered = transactions
        .filter((t) =>
            t.category.toLowerCase().includes(search.toLowerCase())
        )
        .filter((t) =>
            category === "all" ? true : t.category === category
        )
        .filter((t) => (type === "all" ? true : t.type === type))
        .filter((t) =>
            fromDate ? new Date(t.date) >= new Date(fromDate) : true
        )
        .filter((t) =>
            toDate ? new Date(t.date) <= new Date(toDate) : true
        );

    // 🔹 Limit
    if (limit !== "all") {
        filtered = filtered.slice(0, Number(limit));
    }

    // 🔹 Export CSV
    const exportCSV = () => {
        const headers = ["Date", "Category", "Amount", "Type"];
        const rows = transactions.map((t) => [
            t.date,
            t.category,
            t.amount,
            t.type,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((e) => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>

            {/* 🔹 Export Button */}
            <button
                onClick={exportCSV}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Export CSV
            </button>

            {/* 🔹 Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search category..."
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Category */}
                <select
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories.map((c, index) => (
                        <option key={index} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                {/* Type */}
                <select
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                {/* From Date */}
                <input
                    type="date"
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                {/* To Date */}
                <input
                    type="date"
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />

                {/* Limit */}
                <select
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                >
                    <option value="all">Show All</option>
                    <option value="3">Show 3</option>
                    <option value="5">Show 5</option>
                </select>

            </div>

            {/* 🔹 Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500 dark:text-gray-400 border-b">
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Category</th>
                            <th className="pb-2">Amount</th>
                            <th className="pb-2">Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((t) => (
                            <tr
                                key={t.id}
                                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                <td className="py-2">{t.date}</td>
                                <td>{t.category}</td>
                                <td className="font-semibold">
                                    ₹{t.amount.toLocaleString()}
                                </td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${t.type === "income"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {t.type}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {/* 🔹 No filtered results */}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-400">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionTable;