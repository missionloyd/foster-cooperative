//import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Mapview from '../../../components/map-component/Mapview.js';
import './Alerts.css';


function Alerts() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);

  return (
    <div>
      <div className = "alerts-container">
        <h1>Open Beds</h1>
        <Mapview/>
      </div>
    </div>
  );
}

export default Alerts;