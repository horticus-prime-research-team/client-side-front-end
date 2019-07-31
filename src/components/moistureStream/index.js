import React, { useState } from "react";
import "./moistureStream.scss";

const MoistureStream = () => {
  const [moistureStatus, setMoistureStatus] = useState("dry");
  const [moistureIndicatorColor, setMoistureIndicatorColor] = useState(
    "dryStyle"
  );


  // Socket IO function
  const getMoistureData = e => {
    e.preventDefault();


    // Get the API data - Breakdown payload wet, dry, moist and number?
    const payload = { number: 500, status: "wet" };


    setMoistureStatus(payload.status);
    changeButtonColor(payload.status);
  };
  //



  const changeButtonColor = moistureLevel => {
    setMoistureIndicatorColor(`${moistureLevel}Style`);
  };

  return (
    <section className="moistureStream">
      <h2>Moisture Content: {moistureStatus}</h2>
      <div className={moistureIndicatorColor} />
      <form onSubmit={e => getMoistureData(e)}>
        <input type="Submit" />
      </form>
    </section>
  );
};

export default MoistureStream;
