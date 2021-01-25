import React from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { addUser } from "../../actions/user";
import bcrypt from "bcryptjs";

import "./LoginPage.css";

class LoginPage extends React.Component {
  state = {
    loginClicked: true,
    signupClicked: false,
  };
  loginHandler = (e) => {
    e.preventDefault();
    let successFunction = (loggedInUser) => {
      sessionStorage.setItem("authToken", loggedInUser.userid);
      sessionStorage.setItem("userName", loggedInUser.name);
      this.props.addUser(loggedInUser);
      this.props.history.push("/");
    };
    axios
      .get(
        "https://expensestracker-952cc-default-rtdb.firebaseio.com/users.json"
      )
      .then((response) => {
        let users = Object.keys(response.data).map((usKey) => {
          return { ...response.data[usKey], userUniqueKey: usKey };
        });
        if (!users) {
          return alert("user does not exist. please sign up");
        }
        let loggedInUser = users.find((user) => {
          return user.email === e.target.email.value;
        });
        if (!loggedInUser) {
          return alert("user does not exist. please sign up");
        }
        bcrypt.compare(
          e.target.password.value,
          loggedInUser.password,
          function (err, result) {
            if (err) {
              return alert("pls try again");
            }
            if (result === true) {
              successFunction(loggedInUser);
            } else {
              console.log(this);
              alert("wrong credentials");
            }
          }
        );

        // if (loggedInUser.password === e.target.password.value) {
        //   sessionStorage.setItem("authToken", loggedInUser.userid);
        //   sessionStorage.setItem("userName", loggedInUser.name);
        //   this.props.addUser(loggedInUser);
        //   this.props.history.push("/");
        // }
      })
      .catch((err) => {
        alert("User not found. Please Sign Up to continue using the app");
      });
  };
  signupViewHandler = () => {
    this.setState({ signupClicked: true, loginClicked: false });
  };
  signupHandler = (e) => {
    e.preventDefault();
    let salt = bcrypt.genSaltSync(10);
    let user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: bcrypt.hashSync(e.target.password.value, salt),
      userid: uuid(),
    };

    axios
      .post(
        "https://expensestracker-952cc-default-rtdb.firebaseio.com/users.json",
        user
      )
      .then((response) => {
        sessionStorage.setItem("authToken", user.userid);
        sessionStorage.setItem("userName", user.name);
        this.props.addUser(user);
        this.props.history.push("/");
      })
      .catch((error) => {
        alert("cannot sign up");
      });
  };
  render() {
    return (
      <div id="login-page">
        <h2>Please Login / Sign Up to continue using the app</h2>
        {this.state.loginClicked && (
          <form onSubmit={(e) => this.loginHandler(e)} autoComplete="off">
            <div className="form-element">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Enter email" />
            </div>
            <div className="form-element">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button className="login-button">Login</button>
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
          <form onSubmit={(e) => this.signupHandler(e)} autoComplete="off">
            <div className="form-element">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="Enter Username" />
            </div>
            <div className="form-element">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Enter email" />
            </div>
            <div className="form-element">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button className="sign-up">Sign Up</button>
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
