import React, { useState, useEffect } from "react";
import { useDashboard } from "../context/DashboardContext";
import { X } from "lucide-react";

export const TransactionModal = () => {
  const { isModalOpen, closeModal, editingTx, addTransaction, editTransaction } = useDashboard();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: "",
    category: "",
    type: "expense"
  });

  useEffect(() => {
    if (editingTx) {
      setFormData({
        date: editingTx.date,
        amount: editingTx.amount,
        category: editingTx.category,
        type: editingTx.type
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: "",
        category: "",
        type: "expense"
      });
    }
  }, [editingTx, isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    if (editingTx) {
      editTransaction(editingTx.id, payload);
    } else {
      addTransaction(payload);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm p-4 pt-10 sm:pt-4 animate-modal-backdrop overflow-y-auto">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative animate-modal-enter overflow-hidden my-auto">
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"></div>

        <button 
          onClick={closeModal}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={16} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingTx ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {editingTx ? "Update the details below" : "Fill in the details to log a new entry"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-modal-field" style={{ animationDelay: '60ms' }}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'income'})}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.type === 'income' 
                    ? 'bg-emerald-100/50 text-emerald-700 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/50' 
                    : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700/50 dark:hover:bg-slate-800'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'expense'})}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.type === 'expense' 
                    ? 'bg-rose-100/50 text-rose-700 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/50' 
                    : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700/50 dark:hover:bg-slate-800'
                }`}
              >
                Expense
              </button>
            </div>
          </div>
          
          <div className="animate-modal-field" style={{ animationDelay: '120ms' }}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">₹</span>
              <input 
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full pl-8 pr-4 py-2 bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="animate-modal-field" style={{ animationDelay: '180ms' }}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <input 
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
              placeholder="e.g. Groceries, Salary..."
            />
          </div>
          
          <div className="animate-modal-field" style={{ animationDelay: '240ms' }}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input 
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="animate-modal-field" style={{ animationDelay: '300ms' }}>
            <button 
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold rounded-lg transition-all duration-150 shadow-lg shadow-blue-500/30 dark:shadow-blue-600/20 relative overflow-hidden group"
            >
              <span className="relative z-10">{editingTx ? "Save Changes" : "Save Transaction"}</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
