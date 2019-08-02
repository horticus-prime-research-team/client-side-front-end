import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";

export default class Main extends React.Component {
  render() {
    return <App />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);



// wrap app in brouser router

// nav bar with <Link /> component (comes from react)

// In link there is property to="/about>"

// Tell Link what component to render when that route is hit

// Have /route which linkes to home page
