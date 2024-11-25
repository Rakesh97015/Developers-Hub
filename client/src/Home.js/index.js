import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
      navigate('/login'); 
  };

  const handleRegisterClick=() =>{
    navigate('/register')
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-info">
      <NavBar/>
      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <h1 className="text-center text-white">Developer Hub</h1>
        <h6 className="text-center text-white">Create a developer profile/portfolio, share posts, and get help from other developers</h6>
        <div className="d-flex flex-column align-items-center">
          <button className="btn btn-primary mb-2" onClick={handleRegisterClick}>Sign Up</button>
          <button className="btn btn-secondary" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

