const userReducerDefaultState = {};

const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, ...action.user };
    case "DELETE_USER":
      return {};
    default:
      return state;
  }
};

export default userReducer;
