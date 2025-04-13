import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserFriends, FaPlusCircle, FaBell, FaUser } from 'react-icons/fa';
import './Home.css'; // Optional external styling

const Home = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNav = (route) => {
    navigate(route);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Home</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      {/* Footer Navigation */}
      <div className="footer-nav">
        <button onClick={() => handleNav('/search-posts')}>
          <FaSearch size={24} />
          <span>Posts</span>
        </button>
        <button onClick={() => handleNav('/search-friends')}>
          <FaUserFriends size={24} />
          <span>Friends</span>
        </button>
        <button onClick={() => handleNav('/create-post')}>
          <FaPlusCircle size={28} />
          <span>Post</span>
        </button>
        <button onClick={() => handleNav('/notifications')}>
          <FaBell size={24} />
          <span>Alerts</span>
        </button>
        <button onClick={() => handleNav('/profile')}>
          <FaUser size={24} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
