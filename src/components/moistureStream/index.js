import React, { useState, useEffect } from "react";
import socketIOClient  from 'socket.io-client';

import "./moistureStream.scss";

const socket = socketIOClient('http://localhost:3016');

const MoistureStream = () => {
  const [moistureNumber, setMoistureNumber] = useState(0);
  const [moistureStatus, setMoistureStatus] = useState("dry");
  const [moistureIndicatorColor, setMoistureIndicatorColor] = useState("dryStyle");


    
  useEffect(() => {
    socket.on('moisture-data', (data) => {
      console.log('YO');
      console.log(data.val);
      // data = JSON.parse(data);
      setMoistureNumber(data.val);
  
      if(data.val <= 150 ){
        console.log(data.val);
        console.log('we dry folks');
        setMoistureStatus("Dry");
        setMoistureIndicatorColor(`dryStyle`);
      } else if (data.val >= 151 && data.val <= 250 ){
        console.log('we moist folks');
        setMoistureStatus("Moist");
        setMoistureIndicatorColor(`moistStyle`);
      } else{
        console.log(data.val);
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
