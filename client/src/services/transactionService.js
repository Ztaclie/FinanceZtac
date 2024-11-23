import api from "./api";

export const getTransactions = (token) => {
  return api.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addTransaction = (transactionData, token) => {
  return api.post("/transactions", transactionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTransaction = (id, token) => {
  return api.delete(`/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
