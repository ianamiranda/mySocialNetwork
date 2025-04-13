import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaUserFriends, FaPlusCircle, FaBell, FaUser } from 'react-icons/fa';
import './Home.css';

const Footer = ({ current }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route) => (current ? current === route : location.pathname === route);

  return (
    <div className="footer-nav">
      <button onClick={() => navigate('/')} className={isActive('/') ? 'active' : ''}>
        <FaHome size={24} />
        <span>Home</span>
      </button>
      <button onClick={() => navigate('/search-posts')} className={isActive('/search-posts') ? 'active' : ''}>
        <FaSearch size={24} />
        <span>Post Search</span>
      </button>
      <button onClick={() => navigate('/search-friends')} className={isActive('/search-friends') ? 'active' : ''}>
        <FaUserFriends size={24} />
        <span>Friends</span>
      </button>
      <button onClick={() => navigate('/create-post')} className={isActive('/create-post') ? 'active' : ''}>
        <FaPlusCircle size={28} />
        <span>Post</span>
      </button>
      <button onClick={() => navigate('/notifications')} className={isActive('/notifications') ? 'active' : ''}>
        <FaBell size={24} />
        <span>Alerts</span>
      </button>
      <button onClick={() => navigate('/profile')} className={isActive('/profile') ? 'active' : ''}>
        <FaUser size={24} />
        <span>Profile</span>
      </button>
    </div>
  );
};

export default Footer;
