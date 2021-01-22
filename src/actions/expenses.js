import { v4 as uuid } from "uuid";

export const addExpense = ({ description, note, amount, createdAt } = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

export const deleteExpense = (id = "") => {
  console.log("delete expense called");
  return {
    type: "DELETE_EXPENSE",
    id,
  };
};

export const syncExpenses = (expenses) => ({
  type: "SYNC_EXPENSES",
  expenses,
});
