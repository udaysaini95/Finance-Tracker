import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { TrendingUp, TrendingDown, Wallet, Lightbulb, ArrowRight } from "lucide-react";

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
      color: "text-blue-500 dark:text-blue-400",
      bgAlert: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      label: "Total Income",
      value: income,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bgAlert: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      label: "Total Expenses",
      value: expense,
      icon: TrendingDown,
      color: "text-rose-600 dark:text-rose-400",
      bgAlert: "bg-rose-500/10",
      border: "border-rose-500/20"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`relative overflow-hidden glass-panel p-6 rounded-2xl border border-slate-300 dark:${s.border} transition-shadow duration-300 hover:shadow-lg hover:shadow-${s.color.split('-')[1]}-500/10 group`}
        >
          {/* Subtle gradient glow inside card */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${s.bgAlert} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -mr-10 -mt-10 pointer-events-none`}></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-500">{s.label}</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-md">
                ₹{s.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            <div className={`p-3 rounded-xl bg-slate-200 dark:${s.bgAlert} ${s.color} shadow-inner transition-colors duration-300`}>
              <s.icon size={24} className="opacity-90" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Animated Accent Bar */}
          <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out opacity-80 ${
            i === 0 ? "bg-gradient-to-r from-blue-500 via-blue-400 to-transparent" :
            i === 1 ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent" :
            "bg-gradient-to-r from-rose-500 via-rose-400 to-transparent"
          }`}></div>
        </div>
      ))}
    </div>
  );
};

export const Insights = () => {
  const { transactions } = useDashboard();
  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  const totalExpense = expenseTransactions.reduce((a, b) => a + b.amount, 0);

  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const topCategory = Object.keys(categoryTotals).reduce(
    (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
    null,
  );

  const savingsRate = income > 0 ? (((income - totalExpense) / income) * 100).toFixed(1) : 0;
  const txCount = transactions.length;

  const insights = [
    topCategory
      ? { text: <>Highest spend: <span className="font-bold text-blue-600 dark:text-blue-400">{topCategory}</span> — ₹{categoryTotals[topCategory]?.toLocaleString()}. {categoryTotals[topCategory] > 1000 ? "Check if this can be reduced." : "Looks manageable."}</> }
      : { text: "No expense data yet. Add transactions to get insights." },
    { text: <> Savings rate: <span className="font-bold text-emerald-600 dark:text-emerald-400">{savingsRate}%</span> of income. {savingsRate >= 20 ? "Great discipline — keep it up!" : savingsRate > 0 ? "Aim for 20%+ to build a strong cushion." : "You're spending more than you earn — review urgently."} </> },
    { text: <> You have <span className="font-bold text-slate-800 dark:text-white">{txCount} transaction{txCount !== 1 ? "s" : ""}</span> logged. {txCount >= 10 ? "Good tracking habit — your data is meaningful." : "Log more entries for richer financial analysis."} </> },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-start gap-5 border border-slate-300 dark:border-blue-500/20 overflow-hidden relative group transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-blue-200 dark:bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-300 dark:group-hover:bg-blue-500/30 transition-colors duration-500 pointer-events-none"></div>
      <div className="absolute left-0 top-0 w-1 h-0 group-hover:h-full bg-gradient-to-b from-blue-500 via-blue-400 to-transparent transition-all duration-700 ease-out opacity-80"></div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg shadow-blue-500/30 shrink-0 relative z-10">
        <Lightbulb size={24} />
      </div>
      <div className="flex-1 w-full relative z-10">
        <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500 mb-3">Financial Insights</h4>
        {transactions.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic">
            No transactions yet. Add your first income or expense to unlock personalised financial insights.
          </p>
        ) : (
          <ul className="space-y-2">
            {insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>{ins.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
