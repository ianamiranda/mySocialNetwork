import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout to update the state in App.jsx
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
