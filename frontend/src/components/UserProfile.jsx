import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = ({ userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('Error at obtaining user data:', err);
      });

    axios.get(`http://localhost:8080/api/posts/user/${id}/public`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error('Error at obtaining posts:', err);
      });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>{user.nameUser}'s Profile</h2>

      <div className="profile-image">
        {user.imgUser ? (
          <img src={user.imgUser} alt="Profile" className="profile-img" />
        ) : (
          <FaUserCircle size={100} />
        )}
      </div>

      <div className="profile-info">
        <h3>{user.nameUser}</h3>
        <p>{user.descriptionUser || 'No bio for this user'}</p>
      </div>

      <div className="user-posts">
        <h3>Publicaciones</h3>
        {posts.length === 0 ? (
          <p>This user has no posts</p>
        ) : (
          posts.map((post) => (
            <div key={post.idPost} className="post">
              <h4>{post.namePost}</h4>
              <p>{post.text}</p>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate('/search-friends')} className="back-btn">
        Return
      </button>
    </div>
  );
};

export default UserProfile;
