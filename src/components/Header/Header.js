import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { connect } from "react-redux";
//import { deleteUser } from "../../actions/user";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  useEffect(() => {
    // console.log(
    //   "useEffect call tracking mount and update in [Header]",
    //   props.user
    // );
  }, [props.user]);

  const logoutHandler = () => {
    sessionStorage.removeItem("authToken");
    //const history = useHistory();
    props.history.push("/");
  };
  return (
    <header>
      <div className="left-header">
        <h1>Expensify</h1>
      </div>
      <div className="right-header">
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create Expense</NavLink>
          </li>
          <li>
            {props.user.name && (
              <button onClick={logoutHandler} className="user-icon">
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
