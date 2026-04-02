import React from "react";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";
import { SummaryCards, Insights } from "./components/DashboardUI";
import { TransactionsTable } from "./components/TransactionsTable";
import { Shield, User } from "lucide-react";

const AppContent = () => {
  const { role, setRole } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black text-blue-600 tracking-tight">
            FINANCE.IO
          </h1>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setRole("viewer")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${role === "viewer" ? "bg-white shadow text-blue-600 font-bold" : "text-gray-500"}`}
            >
              <User size={16} /> Viewer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${role === "admin" ? "bg-white shadow text-blue-600 font-bold" : "text-gray-500"}`}
            >
              <Shield size={16} /> Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 space-y-8">
        <SummaryCards />
        <Insights />
        <div className="grid grid-cols-1 gap-8">
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}
