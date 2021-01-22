import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addExpense } from "../../actions/expenses";
import "./CreateExpense.css";

class CreateExpense extends Component {
  addExpenseHandler = (e) => {
    e.preventDefault();
    let expense = {
      description: e.target.description.value,
      amount: e.target.amount.value,
      note: e.target.note.value,
      createdAt: e.target.date.value,
      userid: sessionStorage.getItem("authToken"),
    };
    axios
      .post(
        "https://expensestracker-952cc-default-rtdb.firebaseio.com/expense.json",
        expense
      )
      .then(() => {
        this.props.addExpenseToStore(expense);
        this.props.history.push("/");
      })
      .catch((err) => {
        alert("cannot save the expense", err);
      });
  };
  componentDidMount() {
    if (!sessionStorage.getItem("authToken")) {
      this.props.history.push("/login");
    }
  }
  componentDidUpdate() {
    if (!sessionStorage.getItem("authToken")) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div id="create-expense">
        <section className="create-expense-header">
          <h2>Create Expense</h2>
        </section>
        <main className="add-expense-form">
          <form onSubmit={(e) => this.addExpenseHandler(e)}>
            <div className="add-expense-form-element">
              <label htmlFor="description">What for? </label>
              <input
                type="text"
                name="description"
                placeholder="Enter Expense Description"
              />
            </div>
            <div className="add-expense-form-element">
              <label htmlFor="amount">How much? </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter Expense Amount"
              />
            </div>
            <div className="add-expense-form-element">
              <label htmlFor="date">Date? </label>
              <input type="date" name="date" placeholder="Enter Expense Date" />
            </div>
            <div className="add-expense-form-element">
              <label htmlFor="note">Any explanations? </label>
              <input
                type="textarea"
                name="note"
                placeholder="Enter Expense Note"
              />
            </div>
            <button>Add Expense</button>
          </form>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addExpenseToStore: (expense) => dispatch(addExpense(expense)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense);
