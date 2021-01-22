export const addUser = (user) => {
  return {
    type: "ADD_USER",
    user,
  };
};

export const deleteUser = () => {
  return {
    type: "DELETE_USER",
  };
};
