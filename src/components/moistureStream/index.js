import React, { useState, useEffect } from "react";
import socketIOClient  from 'socket.io-client';

import "./moistureStream.scss";

const socket = socketIOClient('https://calm-river-80577.herokuapp.com');

const MoistureStream = () => {
  const [moistureNumber, setMoistureNumber] = useState(0);
  const [moistureStatus, setMoistureStatus] = useState("dry");
  const [moistureIndicatorColor, setMoistureIndicatorColor] = useState("dryStyle");
    
  useEffect(() => {
    socket.on('moisture-data', (data) => {
      setMoistureNumber(data.val);
  
      if(data.val <= 299 ){
        setMoistureStatus("Dry");
        setMoistureIndicatorColor(`dryStyle`);
      } else if (data.val >= 300 && data.val <= 599 ){
        setMoistureStatus("Moist");
        setMoistureIndicatorColor(`moistStyle`);
      } else{
        setMoistureStatus("Wet");
        setMoistureIndicatorColor('wetStyle');
      }
    })
  }, []);

  return (
    <section className="moistureStream">
      <p className="description">Reads live incoming data from sensor</p>
      <h2 className='number'>Moisture Number: {moistureNumber}</h2>
      <div className={moistureIndicatorColor} />
      <h2 className='status'>Moisture Status: {moistureStatus}</h2>
      <p className='legend'>Legend: 0 - 299 Dry, 300 - 599 Moist, 600+ Wet</p>
    </section>
  );
};

export default MoistureStream;
