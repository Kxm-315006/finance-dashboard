import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"];

const SpendingChart = ({ transactions }) => {
    // 🔹 Filter expenses only
    const expenses = transactions.filter((t) => t.type === "expense");

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
        categoryData[t.category] =
            (categoryData[t.category] || 0) + t.amount;
    });

    const data = Object.keys(categoryData).map((key) => ({
        name: key,
        value: categoryData[key],
    }));

    return (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
                Spending Breakdown
            </h2>

            <div className="w-full h-72">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendingChart;