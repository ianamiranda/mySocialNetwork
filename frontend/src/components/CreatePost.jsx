import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = ({ userId }) => {
  const [formData, setFormData] = useState({
    namePost: '',
    text: '',
    // El tipo de post es fijo y se define como "PUBLIC"
    type: 'PUBLIC',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/api/posts', {
        ...formData,
        user: { idUser: userId },
      })
      .then((res) => {
        console.log('Post created successfully:', res.data);
        navigate('/'); // Redirect to home after post creation
      })
      .catch((err) => {
        console.error('Error at creating post:', err);
      });
  };

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="namePost" className="form-label">Title</label>
          <input
            type="text"
            id="namePost"
            name="namePost"
            placeholder="Post Title"
            value={formData.namePost}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text" className="form-label">Content</label>
          <textarea
            id="text"
            name="text"
            placeholder="Write your post content here..."
            value={formData.text}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>

        {/* Eliminamos la opción para seleccionar el tipo de post */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Post</button>
          <button type="button" className="back-btn" onClick={goBackHome}>Back to Home</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
