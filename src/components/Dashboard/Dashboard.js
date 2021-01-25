import React, { Component } from "react";
import { connect } from "react-redux";
import commaNumber from "comma-number";
import axios from "axios";
import userExpenses from "../../selectors/expenses";
// import Header from "../Header/Header";

import { deleteExpense, syncExpenses } from "../../actions/expenses";

import Loader from "../Loader/Loader";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  handleDeleteExpense = (exId) => {
    this.setState({ loading: true });
    axios
      .delete(
        "https://expensestracker-952cc-default-rtdb.firebaseio.com/expense/" +
          exId +
          ".json"
      )
      .then(async () => {
        await this.props.deleteExpense(exId);
        this.setState({ loading: false });
      })
      .catch((err) => {
        alert("cannot delete", err);
      });
  };

  componentDidMount() {
    if (!sessionStorage.getItem("authToken")) {
      this.props.history.push("/login");
    } else {
      axios
        .get(
          "https://expensestracker-952cc-default-rtdb.firebaseio.com/expense.json"
        )
        .then((response) => {
          if (Object.values(response.data)) {
            let data = Object.keys(response.data).map((exKey) => {
              return { ...response.data[exKey], expenseId: exKey };
            });
            this.props.syncExpenses(data);
          } else {
            this.props.syncExpenses([]);
          }
          //this.setState({ loading: false });
        })
        .catch((err) => {
          alert("no expenses");
          this.props.syncExpenses([]);
          //this.setState({ loading: false });
        });
    }
  }

  componentDidUpdate() {
    if (!sessionStorage.getItem("authToken")) {
      this.props.history.push("/login");
    } else {
      console.log("state after [UPDATE]", this.props.expenses);
      // axios
      //   .get(
      //     "https://expensestracker-952cc-default-rtdb.firebaseio.com/expense.json"
      //   )
      //   .then((response) => {
      //     console.log("state before setting sync", this.props.expenses);
      //     if (Object.values(response.data)) {
      //       let data = Object.keys(response.data).map((exKey) => {
      //         return { ...response.data[exKey], expenseId: exKey };
      //       });
      //       console.log("modified response", data);
      //       this.props.syncExpenses(data);
      //     } else {
      //       this.props.syncExpenses([]);
      //     }
      //     //this.setState({ loading: false });
      //   })
      //   .catch((err) => {
      //     this.props.syncExpenses([]);
      //     //this.setState({ loading: false });
      //   });
    }
  }

  render() {
    console.log("Expenses", this.props.expenses);
    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            {/* <Header /> */}
            <main id="Dashboard">
              <h2>{sessionStorage.getItem("userName")}'s dashboard</h2>
              {this.props.expenses.length === 0 && (
                <div className="no-expenses">
                  <p>Start adding expenses to view them</p>
                  <img
                    src="https://image.flaticon.com/icons/png/512/2037/2037061.png"
                    alt=""
                  />
                </div>
              )}
              {this.props.expenses.length > 0 && (
                <>
                  <p>Expenses are as shown below</p>
                  <ol className="expense-list">
                    {this.props.expenses.map((item) => {
                      return (
                        <li key={item.expenseId} className="expense-list-item">
                          <span className="date span-item">
                            {item.createdAt}
                          </span>
                          <span className="description span-item">
                            {item.description}
                          </span>
                          <span className="amount span-item">
                            {commaNumber(item.amount)}
                          </span>
                          <span className="note span-item">{item.note}</span>
                          <span
                            className="delete-button span-item"
                            onClick={() =>
                              this.handleDeleteExpense(item.expenseId)
                            }
                          >
                            X
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </>
              )}
            </main>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: userExpenses(state.expenses),
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExpense: (id) => dispatch(deleteExpense(id)),
    syncExpenses: (expenses) => dispatch(syncExpenses(expenses)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
