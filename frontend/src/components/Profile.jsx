import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import './Profile.css';
import { FaUserCircle } from 'react-icons/fa';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nameUser: '',
    descriptionUser: '',
    password: '',
    imgUser: ''
  });

  useEffect(() => {
    console.log('userId:', userId); // Verifica si el ID se pasa correctamente

    if (!userId) return;

    axios.get(`http://localhost:8080/api/user/${userId}`)
      .then((res) => {
        setUser(res.data);
        setFormData({
          nameUser: res.data.nameUser,
          descriptionUser: res.data.descriptionUser || '',
          password: '',
          imgUser: res.data.imgUser || ''
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/user/${userId}`, formData)
      .then((res) => {
        setUser(res.data);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-image">
        {user.imgUser ? (
          <img src={user.imgUser} alt="Profile" className="profile-img" />
        ) : (
          <FaUserCircle size={100} />
        )}
      </div>

      {editing ? (
        <div className="edit-form">
          <input
            type="text"
            name="nameUser"
            placeholder="Username"
            value={formData.nameUser}
            onChange={handleChange}
          />
          <textarea
            name="descriptionUser"
            placeholder="Bio"
            value={formData.descriptionUser}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="imgUser"
            placeholder="Image URL"
            value={formData.imgUser}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile-info">
          <h3>{user.nameUser}</h3>
          <p>{user.descriptionUser || 'No bio available'}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}

      <Footer active="profile" />
    </div>
  );
};

export default Profile;
