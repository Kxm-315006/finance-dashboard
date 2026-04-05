import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AddTransactionForm = () => {
    const { addTransaction } = useAppContext();

    const [form, setForm] = useState({
        date: "",
        amount: "",
        category: "",
        type: "expense",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.date || !form.amount || !form.category) return;

        addTransaction({
            ...form,
            amount: Number(form.amount),
        });

        setForm({
            date: "",
            amount: "",
            category: "",
            type: "expense",
        });
    };

    return (
        <form className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
                Add Transaction
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <input
                    type="date"
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={form.date}
                    onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Amount"
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={form.amount}
                    onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={form.category}
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                />

                <select
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={form.type}
                    onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                    }
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

            </div>

            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Add
            </button>
        </form>
    );
};

export default AddTransactionForm;