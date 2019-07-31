import React from "react";
import Login from "./components/login/login";
import LoginProvider from "./components/login/loginContext";

import "./style/reset.scss"
import "./style/layout.scss"

export default class App extends React.Component {
  render() {
    return (
      <>
        <LoginProvider>
          <Login />
        </LoginProvider>
      </>
    );
  }
}
