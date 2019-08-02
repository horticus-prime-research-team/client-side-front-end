import React from "react";

import mike from "../../assets/mike.png";
import felipe from "../../assets/felipe.png";
import chloie from "../../assets/chloie.jpg";
import plantLogo from "../../assets/plantLogo.png";

import "./about-us.scss";

const AboutUs = () => {
  return (
    <div classNam="main">

      <section className="title">
        <h1>About Us</h1>
      </section>
      
      <section className="bios">

        <section className="card">
          <img className="image" alt="" src={plantLogo} />
          <h3>HPv2</h3>
          <p>We do stuff.</p>

        </section>

        <section className="card">
          <img className="image" alt="" src={felipe} />
          <h3>Felipe</h3>
          <p>Felipe likes to explore new restaurants and cuisines.</p>
        </section>

        <section className="card">
          <img className="image" alt="" src={chloie} />
          <h3>Chloie</h3>
          <p>Chloie loves kayaking, painting and IndiBindi.</p>
        </section>

        <section className="card">
          <img className="image" alt="" src={mike} />
          <h3>Mike</h3>
          <p>Mike loves rocking out with his guitar.</p>
        </section>

      </section>
    </div>
  );
}

export default AboutUs;
