import React, { useState, useEffect } from "react";
import socketIOClient  from 'socket.io-client';

import "./moistureStream.scss";

const socket = socketIOClient('http://localhost:3006');

const MoistureStream = () => {
  const [moistureNumber, setMoistureNumber] = useState(0);
  const [moistureStatus, setMoistureStatus] = useState("dry");
  const [moistureIndicatorColor, setMoistureIndicatorColor] = useState("dryStyle");


    
  useEffect(() => {
    socket.on('moisture-data', (data) => {
      data = JSON.parse(data);
      setMoistureNumber(data.moistureNumber);
  
      if(data.moistureNumber <= 150 ){
        console.log(data.moistureNumber);
        console.log('we dry folks');
        setMoistureStatus("Dry");
        setMoistureIndicatorColor(`dryStyle`);
      } else if (data.moistureNumber >= 151 && data.moistureNumber <= 250 ){
        console.log('we moist folks');
        setMoistureStatus("Moist");
        setMoistureIndicatorColor(`moistStyle`);
      } else{
        console.log(data.moistureNumber);
        console.log('we wet folks');
        setMoistureStatus("Wet");
        setMoistureIndicatorColor('wetStyle');
      }
    })
  }, []);






  return (
    <section className="moistureStream">
      <h2>Moisture Number: {moistureNumber}</h2>
      <h2>Moisture Status: {moistureStatus}</h2>
      <div className={moistureIndicatorColor} />
      <p>Legend: 0 - 150 Dry, 151 - 250 Moist, 250+ Wet</p>
    </section>
  );
};

export default MoistureStream;
