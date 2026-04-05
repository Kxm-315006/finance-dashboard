import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"];

const SpendingChart = ({ transactions = [] }) => {
    // ✅ Safety check
    if (!Array.isArray(transactions)) {
        return (
            <div className="mt-6 p-6 text-center text-red-500">
                Invalid data for chart
            </div>
        );
    }

    // 🔹 Filter expense transactions
    const expenses = transactions.filter(
        (t) => t.type === "expense"
    );

    // 🔹 Empty state
    if (expenses.length === 0) {
        return (
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-gray-400">
                No expense data for chart
            </div>
        );
    }

    // 🔹 Group by category
    const categoryData = {};

    expenses.forEach((t) => {
        const category = t.category || "Other";
        categoryData[category] =
            (categoryData[category] || 0) + Number(t.amount || 0);
    });

    const data = Object.keys(categoryData).map((key) => ({
        name: key,
        value: categoryData[key],
    }));

    // 🔥 Debug (remove later if you want)
    console.log("Chart Data:", data);

    return (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
                Spending Breakdown
            </h2>

            {/* 🔥 FIXED SIZE (NO RESPONSIVE BUG) */}
            <div className="flex justify-center">
                <PieChart width={320} height={320}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                </PieChart>
            </div>
        </div>
    );
};

export default SpendingChart;