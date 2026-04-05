import React from "react";

const SummaryCards = ({ income = 0, expenses = 0, balance = 0 }) => {
    const cards = [
        {
            title: "Total Balance",
            amount: balance,
            textColor: "text-blue-600 dark:text-blue-400",
            bgCircle: "bg-blue-500",
        },
        {
            title: "Income",
            amount: income,
            textColor: "text-green-600 dark:text-green-400",
            bgCircle: "bg-green-500",
        },
        {
            title: "Expenses",
            amount: expenses,
            textColor: "text-red-600 dark:text-red-400",
            bgCircle: "bg-red-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md 
                     flex justify-between items-center
                     hover:shadow-xl hover:-translate-y-1 
                     transition-all duration-300"
                >
                    {/* Left Content */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 text-sm">
                            {card.title}
                        </h2>

                        <p className={`text-2xl font-bold mt-1 ${card.textColor}`}>
                            ₹{card.amount.toLocaleString()}
                        </p>
                    </div>

                    {/* Right Circle Indicator */}
                    <div
                        className={`w-12 h-12 rounded-full ${card.bgCircle} opacity-20`}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;