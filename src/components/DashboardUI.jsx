import React from "react";
import { useDashboard } from "../context/DashboardContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, Lightbulb } from "lucide-react";

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981"];

export const SummaryCards = () => {
  const { transactions } = useDashboard();
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const stats = [
    {
      label: "Total Balance",
      value: income - expense,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      label: "Total Income",
      value: income,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Total Expenses",
      value: expense,
      icon: TrendingDown,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              <h2 className={`text-2xl font-bold mt-1 ${s.color}`}>
                ${s.value.toLocaleString()}
              </h2>
            </div>
            <s.icon size={20} className="text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Insights = () => {
  const { transactions } = useDashboard();
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const topCategory = Object.keys(categoryTotals).reduce(
    (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
    "N/A",
  );

  return (
    <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
      <div className="bg-blue-600 p-2 rounded-lg text-white">
        <Lightbulb size={20} />
      </div>
      <div>
        <h4 className="font-bold text-blue-900">Financial Insight</h4>
        <p className="text-blue-700 text-sm mt-1">
          Your highest spending category is{" "}
          <span className="font-bold underline">{topCategory}</span>.
          {categoryTotals[topCategory] > 500
            ? " Consider reviewing these expenses to save more next month."
            : " Your spending habits look healthy!"}
        </p>
      </div>
    </div>
  );
};
