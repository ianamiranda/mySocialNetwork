import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { FaSearch } from 'react-icons/fa'; // Importamos el ícono de la lupa
import './Home.css';

const Home = ({ logout, userId }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts/public')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching public posts:', err));
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}?userId=${userId}`);
      setPosts(posts.filter(post => post.idPost !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los posts por el título
  const filteredPosts = posts.filter((post) =>
    post.namePost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Welcome to Home</h1>
      <button onClick={logout} className="logout-btn">Logout</button>

      {/* Barra de búsqueda con el ícono de lupa a la izquierda */}
      <div className="search-bar">
        <button className="search-btn">
          <FaSearch size={20} />
        </button>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <p>No posts found with that title.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.idPost} className="post">
              <h3>{post.namePost}</h3>
              <p>{post.text}</p>
              <p className="post-author">Posted by: {post.user?.nameUser}</p>

              {/* Botón eliminar solo si el post pertenece al usuario autenticado */}
              {post.user?.idUser === userId && (
                <button className="delete-btn" onClick={() => handleDelete(post.idPost)}>
                  🗑️ Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <Footer current="/" />
    </div>
  );
};

export default Home;
