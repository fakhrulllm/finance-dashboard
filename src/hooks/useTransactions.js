import { useEffect, useState } from "react";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD =================
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const savedTransactions = localStorage.getItem(
      `transactions_${currentUser.email}`,
    );

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    setLoading(false);
  }, []);

  // ================= SAVE =================
  useEffect(() => {
    if (loading) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    localStorage.setItem(
      `transactions_${currentUser.email}`,
      JSON.stringify(transactions),
    );
  }, [transactions, loading]);

  // ================= ADD =================
  const addTransaction = (newData) => {
    setTransactions((prev) => [newData, ...prev]);
  };

  // ================= DELETE =================
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= RESET =================
  const resetTransactions = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    setTransactions([]);

    localStorage.removeItem(`transactions_${currentUser.email}`);
  };

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    resetTransactions,
  };
};

export default useTransactions;
