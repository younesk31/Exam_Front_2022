import "../css/style2.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import AdminCrud from "./AdminCrud";
import AccountStatus from "./AccountStatus";
import DiningEvents from "./DiningEvents";
import ManageMember from "./ManageMember";
import More from "./More";

export default function Nesting(props) {
  let userrole = props.userrole;
  return (
    <Router>
      <Header userrole={userrole} />
      <div className="content">
        <Switch>
          {userrole === "user" && (
            <Route exact path="/account">
              <AccountStatus />
            </Route>
          )}
          {userrole === "user" && (
            <Route exact path="/">
              <DiningEvents />
            </Route>
          )}
          {userrole === "admin" && (
            <Route exact path="/manage">
              <ManageMember />
            </Route>
          )}
          {userrole === "admin" && (
            <Route exact path="/more">
              <More />
            </Route>
          )}
          {userrole === "admin" && (
            <Route path="/">
              <AdminCrud />
            </Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

const Header = (props) => {
  let userrole = props.userrole;
  return (
    <ul className="header">
      {userrole === "user" && (
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Dinner Events
          </NavLink>
        </li>
      )}
      {userrole === "user" && (
        <li>
          <NavLink exact activeClassName="selected" to="/account">
            Account Status
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Dinner Event Management
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink exact activeClassName="selected" to="/manage">
            Member Event Management
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink exact activeClassName="selected" to="/more">
            More Settings
          </NavLink>
        </li>
      )}
    </ul>
  );
};
