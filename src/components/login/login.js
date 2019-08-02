import React from "react";
import { LoginContext } from "./loginContext";
import superagent from "superagent";

import Body from "../body"

import Logo from "../../assets/plantLogo.png"

import "./login.scss"

// const API = process.env.REACT_APP_API;
const API = "https://polar-springs-72876.herokuapp.com";

const If = props => {
  return !!props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    superagent
      .get(`${API}/signin`)
      .auth(this.state.email, this.state.password)
      .then(response => {
        let token = response.text;
        this.context.login(token);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button className="logOff" onClick={this.context.logout}>Log Out</button>
          <Body handleLogOff={this.context.logout}/>
        </If>

        <If condition={!this.context.loggedIn}>
          <section className="login" >
            <h1>Horticus Prime v2</h1>
            <img src={Logo} alt="logo"/>
            <form className="loginForm" onSubmit={this.handleSubmit}>
              <input
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <input
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              <input type="submit" value="Login" />
            </form>
          </section>
        </If>
      </>
    );
  }
}

export default Login;
