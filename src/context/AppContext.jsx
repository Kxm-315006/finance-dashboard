import { createContext, useContext, useEffect, useState } from "react";
import { transactions as initialData } from "../data/transactions";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : initialData;
    });

    const [role, setRole] = useState("viewer");

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (newTransaction) => {
        setTransactions([
            ...transactions,
            { ...newTransaction, id: Date.now() },
        ]);
    };

    return (
        <AppContext.Provider
            value={{ transactions, setTransactions, role, setRole, addTransaction }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);