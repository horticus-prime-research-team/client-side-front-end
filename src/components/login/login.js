import React from "react";
import { LoginContext } from "./loginContext";
import superagent from "superagent";

import MoistureStream from "../moistureStream";
import Table from "../table";
import Chart from "../chart";
import User from "../users";
import Logo from "../../assets/plantLogo.png"

import "./login.scss"

// const API = process.env.REACT_APP_API;
const API = "https://api-js401.herokuapp.com";

const If = props => {
  return !!props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(this.state.username, this.state.password)
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
          <button onClick={this.context.logout}>Log Out</button>
          {/* Add here MoistureStream, Table and Chart after editing */}




        </If>

        <If condition={!this.context.loggedIn}>
          <section className="login" >

            <img src={Logo} alt="logo"/>

            <form className="loginForm" onSubmit={this.handleSubmit}>
              <input
                placeholder="UserName"
                name="username"
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

        <MoistureStream />
        <Table />
        <Chart />
        <User />
      </>
    );
  }
}

export default Login;
