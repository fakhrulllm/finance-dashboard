const summaryCards = [
  {
    title: "Balance",
    value: totalBalance,
    type: totalBalance >= 0 ? "positive" : "negative"
  },
  {
    title: "Income",
    value: totalIncome,
    type: "positive"
  },
  {
    title: "Expense",
    value: totalExpense,
    type: "negative"
  }
]