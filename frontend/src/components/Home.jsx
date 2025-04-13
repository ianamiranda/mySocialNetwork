import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // Importamos el nuevo componente Footer
import './Home.css';

const Home = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Home</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      {/* Footer separado */}
      <Footer current="/" />
    </div>
  );
};

export default Home;
