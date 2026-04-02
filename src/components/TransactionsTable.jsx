import React, { useState, useRef, useEffect } from "react";
import { Trash2, Search, Filter, Edit2, ArrowUpRight, ArrowDownRight, ArrowUpDown } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

const CustomSelect = ({ value, onChange, options, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Native select on mobile — always stays in bounds */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sm:hidden pl-3 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white outline-none shadow-sm appearance-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Custom styled dropdown on desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-2 pl-4 pr-3 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-sm whitespace-nowrap"
      >
        <span>{selectedOption.label}</span>
        <Icon size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 z-50 right-0 animate-dropdown bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          <div className="py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                  value === opt.value
                    ? "bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TransactionsTable = () => {
  const {
    transactions,
    deleteTransaction,
    role,
    filterType,
    setFilterType,
    searchTerm,
    setSearchTerm,
    openModal
  } = useDashboard();

  const [sortBy, setSortBy] = useState("date-desc");

  const filteredData = transactions
    .filter((tx) => {
      const matchesSearch = tx.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || tx.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  const sortOptions = [
    { value: "date-desc", label: "Newest First" },
    { value: "date-asc", label: "Oldest First" },
    { value: "amount-desc", label: "Amount: High-Low" },
    { value: "amount-asc", label: "Amount: Low-High" },
  ];

  const filterOptions = [
    { value: "all", label: "All Types" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  return (
    <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/10">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {filteredData.length} {filteredData.length === 1 ? 'entry' : 'entries'} found
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search category..."
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full md:w-48 lg:w-64 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <CustomSelect 
            value={sortBy} 
            onChange={setSortBy} 
            options={sortOptions} 
            icon={ArrowUpDown} 
            align="right" 
          />

          <CustomSelect 
            value={filterType} 
            onChange={setFilterType} 
            options={filterOptions} 
            icon={Filter} 
            align="right" 
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100/50 dark:bg-slate-800/30 text-xs uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
            <tr>
              <th className="hidden sm:table-cell px-6 py-5 border-b border-slate-200 dark:border-slate-700/50">Date</th>
              <th className="px-4 sm:px-6 py-5 border-b border-slate-200 dark:border-slate-700/50">Category</th>
              <th className="hidden sm:table-cell px-6 py-5 border-b border-slate-200 dark:border-slate-700/50">Status</th>
              <th className="px-4 sm:px-6 py-5 text-right border-b border-slate-200 dark:border-slate-700/50">Amount</th>
              {role === "admin" && (
                <th className="hidden sm:table-cell px-6 py-5 text-center border-b border-slate-200 dark:border-slate-700/50 w-20">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700/30">
            {filteredData.length > 0 ? (
              filteredData.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className="relative hover:bg-blue-50/40 dark:hover:bg-slate-800/30 transition-all duration-200 group animate-modal-field"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Left accent border on hover */}
                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium relative">
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r"></span>
                    {tx.date}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 shrink-0 ${tx.type === 'income' ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-100/50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                        {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{tx.category}</span>
                        <p className="text-xs text-slate-400 dark:text-slate-500 sm:hidden mt-0.5">{tx.date}</p>
                        {/* Mobile-only action buttons inside category cell */}
                        {role === "admin" && (
                          <div className="flex items-center gap-2 mt-2 sm:hidden">
                            <button
                              onClick={() => openModal(tx)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all active:scale-95"
                              title="Edit"
                            >
                              <Edit2 size={13} /> Edit
                            </button>
                            <button
                              onClick={() => deleteTransaction(tx.id)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-lg text-rose-600 dark:text-rose-400 text-xs font-medium hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-all active:scale-95"
                              title="Delete"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 group-hover:scale-105 ${
                        tx.type === "income"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                          : "bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td
                    className={`px-4 sm:px-6 py-4 text-sm font-bold text-right tabular-nums transition-all duration-200 ${
                      tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  {role === "admin" && (
                    <td className="hidden sm:table-cell px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                        <button
                          onClick={() => openModal(tx)}
                          className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md text-blue-600 hover:text-white hover:bg-blue-500 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-500 transition-all"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md text-rose-600 hover:text-white hover:bg-rose-500 dark:text-rose-400 dark:hover:text-white dark:hover:bg-rose-500 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700/50">
                      <Search size={24} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">No transactions found</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                      We couldn't find any clear transactions matching your current filters. 
                      Try adjusting the search term or type.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      {filteredData.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700/30 bg-slate-50/50 dark:bg-slate-800/10 flex flex-wrap gap-4 justify-between items-center text-sm">
          <span className="text-slate-500 dark:text-slate-400 text-xs">
            Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredData.length}</span> transaction{filteredData.length !== 1 ? 's' : ''}
          </span>
          <div className="flex gap-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
              +₹{filteredData.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} income
            </span>
            <span className="text-rose-600 dark:text-rose-400 font-semibold text-xs">
              -₹{filteredData.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} expenses
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
