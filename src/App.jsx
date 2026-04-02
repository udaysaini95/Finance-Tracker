import React from "react";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";
import { SummaryCards, Insights } from "./components/DashboardUI";
import { DashboardCharts } from "./components/Charts";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionModal } from "./components/TransactionModal";
import { Shield, User, Plus, Download, Aperture } from "lucide-react";

const AppContent = () => {
  const { role, setRole, openModal, transactions, theme, toggleTheme } = useDashboard();

  const exportToCSV = () => {
    if (!transactions || transactions.length === 0) return;

    const BOM = "\uFEFF";
    const headers = ["No.", "Date", "Category", "Type", "Amount (₹)"];
    const csvRows = [headers.join(",")];

    transactions.forEach((tx, idx) => {
      const values = [
        idx + 1,
        `="${ tx.date || new Date().toISOString().split('T')[0]}"`,
        `"${tx.category}"`,
        `"${tx.type}"`,
        tx.amount
      ];
      csvRows.push(values.join(","));
    });

    const csvString = BOM + csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "prosperly_transactions.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [msgIdx, setMsgIdx] = React.useState(0);
  
  const funnyMessages = [
    "Brewing your financial insights...",
    "Almost there — your wealth awaits.",
  ];

  React.useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % funnyMessages.length);
    }, 1000);

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(msgTimer);
    }, 2100);
    
    return () => {
      clearTimeout(loadTimer);
      clearInterval(msgTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-[#060913] flex flex-col items-center justify-center font-sans relative overflow-hidden">
       
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col items-center gap-8 relative z-10">
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.5)] animate-coin-flip border-4 border-yellow-300/60">
            <span className="font-black text-amber-900 text-5xl">₹</span>
          </div>
          
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-baseline">
              Prosperly<span className="text-blue-500 font-black">.</span>
            </h1>
            <p key={msgIdx} className="animate-text-reveal text-slate-500 dark:text-slate-400 font-medium text-sm px-5 py-2.5 bg-white/60 dark:bg-slate-800/60 rounded-full border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm min-w-[260px] text-center">
              {funnyMessages[msgIdx]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <TransactionModal />
      
      <nav className="border-b border-slate-300 dark:border-slate-700/20 glass-panel sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 animate-fade-in-up group cursor-pointer shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/40 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                 <div className="absolute inset-0 bg-white/20 blur-md group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 -translate-x-full"></div>
                 <Aperture className="text-white w-5 h-5 animate-[spin_10s_linear_infinite]" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-baseline">
                Prosperly<span className="text-blue-500 font-black text-xl leading-3">.</span>
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 animate-fade-in-up delay-100 min-w-0">
              <button
                onClick={toggleTheme}
                className="h-9 w-9 flex items-center justify-center rounded-lg transition-all bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700 shrink-0"
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>

              <button
                onClick={exportToCSV}
                className="h-9 flex items-center gap-2 px-2.5 sm:px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white rounded-lg text-sm font-medium transition-all shrink-0"
                title="Export CSV"
              >
                <Download size={15} /> <span className="hidden sm:inline">Export</span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${role === "admin" ? "max-w-[40px] sm:max-w-[120px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"}`}>
                <button
                  onClick={() => openModal()}
                  className="h-9 flex items-center gap-1.5 px-2.5 sm:px-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap"
                >
                  <Plus size={15} /> <span className="hidden sm:inline">Add Record</span>
                </button>
              </div>

              <div className="h-9 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 shrink-0 flex">
                <div className="relative flex w-full h-full text-slate-500">
                  {/* Sliding Background */}
                  <div 
                    className={`absolute top-0 bottom-0 w-1/2 rounded-lg transition-transform duration-300 ease-in-out shadow-sm bg-white dark:bg-blue-600 ${role === "admin" ? "translate-x-full" : "translate-x-0"}`}
                  ></div>
                  
                  <button
                    onClick={() => setRole("viewer")}
                    className={`relative flex-1 flex items-center justify-center gap-1 px-3 sm:w-20 text-xs sm:text-sm font-medium transition-all duration-200 z-10 ${
                      role === "viewer" 
                        ? "text-slate-900 dark:text-white" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    <User size={15} /> <span className="hidden sm:inline">Viewer</span>
                  </button>
                  
                  <button
                    onClick={() => setRole("admin")}
                    className={`relative flex-1 flex items-center justify-center gap-1 px-3 sm:w-20 text-xs sm:text-sm font-medium transition-all duration-200 z-10 ${
                      role === "admin" 
                        ? "text-slate-900 dark:text-white" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    <Shield size={15} /> <span className="hidden sm:inline">Admin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col gap-2 animate-fade-in-up delay-100">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white dark:text-gradient">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Track and manage your financial activity meticulously.</p>
        </div>
        
        <div className="animate-fade-in-up delay-100 opacity-0" style={{ animationDelay: '150ms' }}>
          <SummaryCards />
        </div>
        <div className="animate-fade-in-up delay-200 opacity-0" style={{ animationDelay: '250ms' }}>
          <Insights />
        </div>
        <div className="animate-fade-in-up delay-300 opacity-0" style={{ animationDelay: '350ms' }}>
          <DashboardCharts />
        </div>
        
        <div className="pt-4 animate-fade-in-up delay-300 opacity-0" style={{ animationDelay: '450ms' }}>
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
