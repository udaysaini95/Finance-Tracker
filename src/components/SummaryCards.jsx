const SummaryCards = () => {
  const { transactions } = useDashboard();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <Card title="Total Balance" amount={balance} color="text-blue-600" />
      <Card title="Total Income" amount={income} color="text-green-600" />
      <Card title="Total Expenses" amount={expenses} color="text-red-600" />
    </div>
  );
};

const Card = ({ title, amount, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <p className="text-sm text-gray-500 font-medium">{title}</p>
    <h2 className={`text-3xl font-bold mt-2 ${color}`}>
      ${amount.toLocaleString()}
    </h2>
  </div>
);
