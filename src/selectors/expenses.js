const userExpenses = (expenses) => {
  return expenses.filter((exp) => {
    return exp.userid === localStorage.getItem("authToken");
  });
};

export default userExpenses;
