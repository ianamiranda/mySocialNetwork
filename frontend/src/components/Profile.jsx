import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import './Profile.css';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nameUser: '',
    descriptionUser: '',
    password: '',
    imgUser: ''
  });
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    // Get user data
    axios.get(`http://localhost:8080/api/user/${userId}`)
      .then((res) => {
        setUser(res.data);
        setFormData({
          nameUser: res.data.nameUser,
          descriptionUser: res.data.descriptionUser || '',
          password: res.data.password || '',
          imgUser: res.data.imgUser || ''
        });
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });

    fetchUserPosts();
  }, [userId]);

  const fetchUserPosts = () => {
    axios.get(`http://localhost:8080/api/posts/user/${userId}/public`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching user posts:', err);
      });
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:8080/api/posts/${postId}`, {
        params: { userId }
      })
        .then(() => {
          setPosts(prev => prev.filter(post => post.idPost !== postId));
        })
        .catch((err) => {
          console.error('Error deleting post:', err);
          alert('You are not allowed to delete this post.');
        });
    }
  };

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
        console.error('Error saving user data:', err);
      });
  };

  const handleBack = () => {
    setEditing(false);
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
            placeholder="Current Password"
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
          <button onClick={handleBack}>Back to Profile</button>
        </div>
      ) : (
        <div className="profile-info">
          <h3>{user.nameUser}</h3>
          <p>{user.descriptionUser || 'No bio available'}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}

      <div className="user-posts">
        <h3>Your Public Posts</h3>
        {posts.length === 0 ? (
          <p>You haven't made any public posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.idPost} className="post">
              <h4>{post.namePost}</h4>
              <p>{post.text}</p>
              <button onClick={() => handleDelete(post.idPost)} className="delete-post-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <Footer active="profile" />
    </div>
  );
};

export default Profile;
