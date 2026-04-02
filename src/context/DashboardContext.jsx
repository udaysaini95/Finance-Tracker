import React, { createContext, useState, useContext, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // 1. Role State (Admin or Viewer)
  const [role, setRole] = useState("admin");

  // 2. Mock Data (Initial State)
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2026-03-01",
      amount: 2500,
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
      amount: 500,
      category: "Rent",
      type: "expense",
    },
    {
      id: 4,
      date: "2026-03-15",
      amount: 200,
      category: "Shopping",
      type: "expense",
    },
    {
      id: 5,
      date: "2026-03-20",
      amount: 1200,
      category: "Freelance",
      type: "income",
    },
  ]);

  // 3. Filter State
  const [filterType, setFilterType] = useState("all"); // all, income, expense
  const [searchTerm, setSearchTerm] = useState("");

  // Actions
  const addTransaction = (newTx) => {
    if (role !== "admin") return; // RBAC Check
    setTransactions([...transactions, { ...newTx, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    if (role !== "admin") return; // RBAC Check
    setTransactions(transactions.filter((tx) => tx.id !== id));
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
        deleteTransaction,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
