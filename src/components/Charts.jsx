import React from "react";
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
  Legend,
} from "recharts";
import { useDashboard } from "../context/DashboardContext";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

export const DashboardCharts = () => {
  const { transactions, theme } = useDashboard();

  const lineData = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, curr) => {
      const prevBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const change = curr.type === "income" ? curr.amount : -curr.amount;
      acc.push({ date: curr.date, balance: prevBalance + change });
      return acc;
    }, []);

  const categoryDataMap = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = Object.keys(categoryDataMap).map((key) => ({
    name: key,
    value: categoryDataMap[key],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-lg border border-slate-300 dark:border-slate-700/50 shadow-xl bg-white/60 dark:bg-slate-900/60">
          <p className="text-slate-500 dark:text-slate-300 text-xs mb-1">{label}</p>
          <p className="text-slate-900 dark:text-white font-bold">₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          


      <div className="glass-panel p-6 rounded-2xl border border-slate-300 dark:border-slate-700/30 h-[400px] flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Balance Trend</h3>
        {lineData.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm">No data to display</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs max-w-[180px]">Add transactions to track your balance trend over time.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" fontSize={12} tickMargin={10} stroke={axisColor} tick={{fill: axisColor}} />
              <YAxis fontSize={12} stroke={axisColor} tick={{fill: axisColor}} tickFormatter={(value) => `₹${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#38bdf8"
                strokeWidth={4}
                dot={{ r: 4, fill: theme==='dark'?'#0f172a':'#fff', strokeWidth: 2, stroke: "#38bdf8" }}
                activeDot={{ r: 6, fill: "#38bdf8", stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      
          
          
      <div className="glass-panel p-6 rounded-2xl border border-slate-300 dark:border-slate-700/30 h-[400px] flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Spending Breakdown</h3>
        {pieData.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500">
                <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm">No spendings yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs max-w-[180px]">Add an expense record to see your spending breakdown here.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                wrapperStyle={{ color: axisColor, fontSize: '12px', fontWeight: '500' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
