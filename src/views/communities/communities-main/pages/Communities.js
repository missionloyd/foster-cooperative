import React from 'react';
//import { Link } from 'react-router-dom';
import './Communities.css';
import pic from '../../../../icons/pic.jpg';

function Communities() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);

  return (
    <div>
      <div className = "com-container">
        <h1>Welcome to the Community Page</h1>
        {/* <p>(Check out the alerts page)</p> */}
        <img src = {pic} alt=""></img>
      </div>
    </div>
  );
}

export default Communities;
