import { combineReducers, createStore } from "redux";
import expensesReducer from "../reducers/expenses";
import userReducer from "../reducers/user";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      user: userReducer,
    })
  );
  return store;
};

export default configureStore;
