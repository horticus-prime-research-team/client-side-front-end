import React, { useState } from "react";
import socketIOClient  from 'socket.io-client';

import "./moistureStream.scss";

const socket = socketIOClient('http://localhost:3006');

const MoistureStream = () => {
  const [moistureStatus, setMoistureStatus] = useState(0);
  const [moistureIndicatorColor, setMoistureIndicatorColor] = useState(
    "dryStyle"
  );

  socket.on('moisture-data', (data) => {
    data = JSON.parse(data);
    setMoistureStatus(data.moistureNumber);

    if(moistureStatus <= 150 ){
      setMoistureIndicatorColor(`dryStyle`);
    } else if (moistureStatus >= 151 || moistureStatus <= 250 ){
      setMoistureIndicatorColor(`moistStyle`);
    } else{
      setMoistureIndicatorColor('wetStyle');
    }
  })

  return (
    <section className="moistureStream">
      <h2>Moisture Number: {moistureStatus}</h2>
      <div className={moistureIndicatorColor} />
    </section>
  );
};

export default MoistureStream;
