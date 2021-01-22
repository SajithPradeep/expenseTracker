const userExpenses = (expenses) => {
  return expenses.filter((exp) => {
    return exp.userid === sessionStorage.getItem("authToken");
  });
};

export default userExpenses;
