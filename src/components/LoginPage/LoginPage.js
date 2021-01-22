import React from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { addUser } from "../../actions/user";

class LoginPage extends React.Component {
  state = {
    loginClicked: true,
    signupClicked: false,
  };
  loginHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        "https://expensestracker-952cc-default-rtdb.firebaseio.com/users.json"
      )
      .then((response) => {
        let users = Object.keys(response.data).map((usKey) => {
          return { ...response.data[usKey], userUniqueKey: usKey };
        });
        let loggedInUser = users.find((user) => {
          return user.email === e.target.email.value;
        });
        if (loggedInUser.password === e.target.password.value) {
          localStorage.setItem("authToken", loggedInUser.userid);
          this.props.addUser(loggedInUser);
          this.props.history.push("/");
        }
      });
  };
  signupViewHandler = () => {
    this.setState({ signupClicked: true, loginClicked: false });
  };
  signupHandler = (e) => {
    e.preventDefault();
    let user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      userid: uuid(),
    };
    axios
      .post(
        "https://expensestracker-952cc-default-rtdb.firebaseio.com/users.json",
        user
      )
      .then((response) => {
        localStorage.setItem("authToken", user.userid);
        this.props.addUser(user);
        this.props.history.push("/");
      })
      .catch((error) => {
        alert("cannot sign up");
      });
  };
  render() {
    return (
      <div>
        <h2>Please Login to continue using the app</h2>
        {this.state.loginClicked && (
          <form onSubmit={(e) => this.loginHandler(e)}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Enter email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button>Login</button>
          </form>
        )}
        {this.state.signupClicked && (
          <button
            onClick={() =>
              this.setState({ loginClicked: true, signupClicked: false })
            }
          >
            Existing users click here to Login
          </button>
        )}
        <hr />
        <p>OR</p>
        {this.state.signupClicked && (
          <form onSubmit={(e) => this.signupHandler(e)}>
            <div>
              <label htmlFor="name">Email</label>
              <input type="text" name="name" placeholder="Enter Username" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Enter email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button>Sign Up</button>
          </form>
        )}
        {this.state.loginClicked && (
          <button onClick={this.signupViewHandler}>
            Click here to create an account
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(undefined, mapDispatchToProps)(LoginPage);
