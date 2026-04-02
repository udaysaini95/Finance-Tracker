# Prosperly - Finance Dashboard

A fully-responsive financial dashboard tracking application designed with modern aesthetics and complete functionality. Built with React.js, Tailwind CSS (v4), and Recharts, this project focuses on outstanding User Experience (UX), elegant UI, and robust state management.

## 🌟 Key Features

1. **Dashboard Overview & Visualizations**
   - Clean summary cards providing real-time calculations for Total Balance, Income, and Expenses.
   - Interactive **Balance Trend** (Time-based line chart) mapped over time.
   - Interactive **Spending Breakdown** (Categorical pie chart) utilizing tailored colors.

2. **Transactions Management**
   - Tabular, easy-to-read view of all recent transactions with colored indicators.
   - Instant full-text search capability for categories.
   - Easy drop-down filtering by transaction type (Income/Expense).

3. **Role-Based UI Configuration (RBAC)**
   - Simulated roles for demonstration purposes configurable instantly via an elegant sliding toggle on the Navbar.
   - **Viewer Mode**: Clean read-only analytics.
   - **Admin Mode**: Grants the ability to **Add**, **Edit**, and **Delete** transaction records through an elegant modal.

4. **Dynamic Insights**
   - Automatically computes and highlights your highest spending category and reports the numerical value, providing intelligent copy directly relevant to your financial health.

5. **Local Storage Persistence**
   - Maintains your state reliably! Modifications made to the transaction ledger securely save to your browser's `localStorage` keeping your dashboard intact after refresh.
   
6. **Data Export**
   - Seamlessly export your current ledger view to a standard `.csv` file.

7. **Premium Glassmorphism Dark Mode Design**
   - Built with deep slate and indigo hues.
   - Utilizes custom keyframe animations and carefully tuned drop-shadows to generate a polished, "wow"-inducing experience.

## 🚀 Setup Instructions

1. Ensure you have Node.js installed.
2. Clone the repository and navigate into the root directory:
   ```bash
   cd Finance-Dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:5173` to explore your elegant dashboard.

## 🧠 Overview of Approach

* **Design:** Opted for a completely dark-themed, glassmorphic UI because it provides exceptional contrast for colorful data visualization while communicating a premium "fin-tech app" sensibility.
* **Component Architecture:** Separated distinct logical boundaries (e.g., `Charts.jsx` vs `TransactionsTable.jsx` vs `TransactionModal.jsx`) keeping files neat, encapsulated, and strictly responsible for one type of UI behavior.
* **Context over Prop-Drilling:** `DashboardContext.jsx` acts as the single source of truth for the entire application, maintaining UI states (modals, selected role, filters) and data states (transactions, local storage updates) globally.
* **Responsive Layout:** Exclusively used Tailwind properties to guarantee everything collapses cleanly onto mobile orientations with no loss to the styling.
