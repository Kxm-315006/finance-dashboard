import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // 🔥 Load from localStorage OR default data
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved
            ? JSON.parse(saved)
            : [
                {
                    id: 1,
                    date: "2026-04-01",
                    amount: 3000,
                    category: "Shopping",
                    type: "expense",
                },
                {
                    id: 2,
                    date: "2026-04-02",
                    amount: 1500,
                    category: "Food",
                    type: "expense",
                },
                {
                    id: 3,
                    date: "2026-04-03",
                    amount: 50000,
                    category: "Salary",
                    type: "income",
                },
            ];
    });

    const [role, setRole] = useState("viewer");

    // 🔥 Save to localStorage
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // 🔥 Add transaction
    const addTransaction = (newTransaction) => {
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    return (
        <AppContext.Provider
            value={{
                transactions,
                addTransaction,
                role,
                setRole,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// 🔥 Custom Hook
export const useAppContext = () => useContext(AppContext);