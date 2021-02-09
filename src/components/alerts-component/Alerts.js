//import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Mapview from '../map-component/Mapview';
import './Alerts.css';


function Alerts() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);

  return (
    <alerts>
      <div className = "alerts-container">
        <h1>Open Beds</h1>
        <Mapview/>
      </div>
    </alerts>
  );
}

export default Alerts;