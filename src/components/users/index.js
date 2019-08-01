import React from "react";
import superagent from "superagent";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API: 'http://localhost:3020',
      email: '',
      password: '',
      role: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    superagent
      .post(`${this.state.API}/signup`)
      .send({email: this.state.email, password: this.state.password, role: this.state.role})
      .then(response => {
        let token = response.text;
        console.log(token);
        this.context.login(token);
      })
      .catch(err => console.error(err));
  };

  handleChange = e => {
    e.preventDefault();

    // console.log(typeof e.target.value);
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
  
      <select name='role' onChange={this.handleChange}>
        <option value="admin">Admin</option>
        <option value="senior">Senior</option>
        <option value="assistant">Assistant</option>
      </select>
  
        <input type="submit" value="Create User" />
      </form>
    );
  }
};

export default Users;
