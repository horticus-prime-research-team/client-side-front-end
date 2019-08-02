import React from "react";
import { Link } from "react-router-dom";

import "./header.scss"

class  Header extends React.Component {
  render() {
    return(
  <header>
    <nav className="nav">
      <ul className="ul">
        <li className="li">
          <Link to="/">Home</Link>
        </li>
        <li className="li">
          <Link to="/table">Table</Link>
        </li>
        <li className="li">
          <Link to="/chart">Chart</Link>
        </li>
        <li className="li">
          <Link to="/user">Handle Users</Link>
        </li>
        <li className="li">
          <Link to="/about-us">About Us</Link>
        </li>
        <li onClick={this.props.handleLogOff}>Log out</li>
      </ul>
    </nav>
  </header>
    )
  }
}

export default Header;
