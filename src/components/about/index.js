import React from 'react';
import mike from '../../assets/mike.png';
import felipe from '../../assets/felipe.png';
import chloie from '../../assets/chloie.jpg';

import "./about.scss";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <p onClick={this.props.aboutUs}>Home</p>
        <h1>About Us</h1>
        <img className='image' src={felipe}/>
        <h3>Felipe</h3>
        <p></p>
        <img className='image' src={chloie} />
        <h3>Chloie</h3>
        <p></p>
        <img className='image' src={mike} />
        <h3>Mike</h3>
        <p></p>
      </div>
    );
  }
}