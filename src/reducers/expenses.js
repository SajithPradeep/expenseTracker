const expensesReeducerDefaultState = [];

const expensesReducer = (state = expensesReeducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "DELETE_EXPENSE":
      return state.filter((expense) => {
        return expense.expenseId !== action.id;
      });
    case "SYNC_EXPENSES":
      return [...action.expenses];
    default:
      return state;
  }
};

export default expensesReducer;
