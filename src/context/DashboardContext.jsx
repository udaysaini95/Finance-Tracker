import React, { createContext, useState, useContext, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [role, setRole] = useState("admin");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("finance_transactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse transactions from local storage", e);
      }
    }
    return [
      {
        id: 1,
        date: "2026-03-01",
        amount: 30000,
        category: "Salary",
        type: "income",
      },
      {
        id: 2,
        date: "2026-03-05",
        amount: 150,
        category: "Food",
        type: "expense",
      },
      {
        id: 3,
        date: "2026-03-10",
        amount: 5000,
        category: "Rent",
        type: "expense",
      },
      {
        id: 4,
        date: "2026-03-15",
        amount: 2000,
        category: "Shopping",
        type: "expense",
      },
      {
        id: 5,
        date: "2026-03-20",
        amount: 4200,
        category: "Freelance",
        type: "income",
      },
    ];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("finance_theme") || "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("finance_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // local storage
  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const addTransaction = (newTx) => {
    if (role !== "admin") return;
    setTransactions([{ ...newTx, id: Date.now() }, ...transactions]);
  };

  const editTransaction = (id, updatedTx) => {
    if (role !== "admin") return;
    setTransactions(transactions.map((tx) => (tx.id === id ? { ...tx, ...updatedTx } : tx)));
  };

  const deleteTransaction = (id) => {
    if (role !== "admin") return;
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };
  
  const openModal = (tx = null) => {
      setEditingTx(tx);
      setIsModalOpen(true);
  };
  
  const closeModal = () => {
      setEditingTx(null);
      setIsModalOpen(false);
  };

  return (
    <DashboardContext.Provider
      value={{
        role,
        setRole,
        transactions,
        setTransactions,
        filterType,
        setFilterType,
        searchTerm,
        setSearchTerm,
        addTransaction,
        editTransaction,
        deleteTransaction,
        isModalOpen,
        openModal,
        closeModal,
        editingTx,
        theme,
        toggleTheme
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
