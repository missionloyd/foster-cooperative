import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <login>

    </login>
  );
}

export default Login;
