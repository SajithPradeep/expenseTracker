import "./App.css";
import AppRouter from "./router/AppRouter";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

// store.dispatch({
//   type: "ADD_EXPENSE",
//   expense: {
//     description: "Sajith",
//     id: 1,
//     note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, eos?",
//     createdAt: "12-12-2020",
//     amount: 100,
//   },
// });

const state = store.getState();

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
