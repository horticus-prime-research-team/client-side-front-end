import React from "react";
import { LoginContext } from "./loginContext";
import superagent from "superagent";

import MoistureStream from "../moistureStream";
import Table from "../table";
import Chart from "../chart";
import User from "../users";
import Logo from "../../assets/plantLogo.png"
import About from "../about";

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
    this.state = { email: "", password: "", aboutToggle: false };
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
  
  aboutUs = (e) => {
    e.preventDefault();
  
    this.setState({aboutToggle: !this.state.aboutToggle});
  }
  
  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
  
          <If condition={this.state.aboutToggle}>
            <About aboutUs={this.aboutUs} />
          </If>
  
          <If condition={this.state.aboutToggle === false}>
            <p onClick={this.aboutUs}>About Us</p>
            <button onClick={this.context.logout}>Log Out</button>
            {/* Add here MoistureStream, Table and Chart after editing */}
  
            <MoistureStream />
            <Table />
            <Chart />
            <User />
  
            <About />
          </If>
        </If>
  
        <If condition={!this.context.loggedIn}>
          <section className="login" >

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
