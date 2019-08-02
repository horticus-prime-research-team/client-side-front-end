import React from "react";
import Header from "../header";
import MoistureStream from "../moistureStream"
import Table from "../table";
import Chart from "../chart";
import User from "../users"
import AboutUs from "../about-us";
import { Switch, Route } from 'react-router-dom'


const Body = () => (
  <div>
    <Header />
    <main>
    <Switch>
      <Route exact path='/' component={MoistureStream}/>
      <Route path='/table' component={Table}/>
      <Route path='/chart' component={Chart}/>
      <Route path='/user' component={User}/>
      <Route path='/about-us' component={AboutUs}/>
    </Switch>
  </main>
  </div>
);

export default Body;
