import React from "react";

const Insights = ({ transactions }) => {
    // 🔹 Empty state
    if (!transactions || transactions.length === 0) {
        return (
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-400">
                No insights available
            </div>
        );
    }

    // 🔹 Highest Spending Category
    const expenseTransactions = transactions.filter(
        (t) => t.type === "expense"
    );

    const categoryTotals = {};

    expenseTransactions.forEach((t) => {
        categoryTotals[t.category] =
            (categoryTotals[t.category] || 0) + t.amount;
    });

    let highestCategory = "N/A";
    let highestAmount = 0;

    for (let category in categoryTotals) {
        if (categoryTotals[category] > highestAmount) {
            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    }

    // 🔹 Monthly Comparison
    const monthlyTotals = {};

    transactions.forEach((t) => {
        const month = t.date.slice(0, 7); // YYYY-MM
        monthlyTotals[month] =
            (monthlyTotals[month] || 0) + t.amount;
    });

    const months = Object.keys(monthlyTotals).sort();

    let comparison = "Not enough data";

    if (months.length >= 2) {
        const last = monthlyTotals[months.length - 1];
        const prev = monthlyTotals[months.length - 2];

        if (last > prev) {
            comparison = "Spending increased compared to last month 📈";
        } else if (last < prev) {
            comparison = "Spending decreased compared to last month 📉";
        } else {
            comparison = "Spending remained the same";
        }
    }

    // 🔹 Overall Insight
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    let overallInsight = "";

    if (totalExpenses > totalIncome) {
        overallInsight = "⚠️ You are spending more than you earn.";
    } else if (totalExpenses === totalIncome) {
        overallInsight = "⚖️ Your income and expenses are balanced.";
    } else {
        overallInsight = "✅ Your finances are in good shape.";
    }

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
                Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Highest Spending */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm">
                        Highest Spending Category
                    </h3>
                    <p className="text-lg font-bold mt-1">
                        {highestCategory} (₹{highestAmount.toLocaleString()})
                    </p>
                </div>

                {/* Monthly Comparison */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm">
                        Monthly Comparison
                    </h3>
                    <p className="text-lg font-semibold mt-1">
                        {comparison}
                    </p>
                </div>

                {/* Overall Insight */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm">
                        Overall Insight
                    </h3>
                    <p className="text-lg font-semibold mt-1">
                        {overallInsight}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Insights;