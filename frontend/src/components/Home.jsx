import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { FaSearch } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Home.css';

const Home = ({ logout, userId }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({});
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts/public')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching public posts:', err));
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      axios.get(`http://localhost:8080/api/likes/exists?userId=${userId}&postId=${post.idPost}`)
        .then((res) => {
          setLikes((prevLikes) => ({
            ...prevLikes,
            [post.idPost]: res.data
          }));
        })
        .catch((err) => console.error('Error checking like status:', err));
    });
  }, [posts, userId]);

  useEffect(() => {
    const fetchLikeCounts = async () => {
      const newCounts = {};
      for (const post of posts) {
        try {
          const res = await axios.get(`http://localhost:8080/api/likes/count/${post.idPost}`);
          newCounts[post.idPost] = res.data;
        } catch (err) {
          console.error(`Error fetching like count for post ${post.idPost}:`, err);
        }
      }
      setLikeCounts(newCounts);
    };

    if (posts.length > 0) {
      fetchLikeCounts();
    }
  }, [posts]);

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

  const toggleLike = async (postId) => {
    try {
      await axios.post('http://localhost:8080/api/likes/toggle', null, {
        params: { userId, postId },
      });

      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: !prevLikes[postId]
      }));

      const res = await axios.get(`http://localhost:8080/api/likes/count/${postId}`);
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: res.data
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.namePost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Welcome to Home</h1>

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
          filteredPosts.map((post) => {
            const isLiked = likes[post.idPost];
            const likeCount = likeCounts[post.idPost] || 0;

            return (
              <div key={post.idPost} className="post">
                <h3>{post.namePost}</h3>
                <p>{post.text}</p>

                <div className="post-meta">
                  <p className="post-author">Posted by: {post.user?.nameUser}</p>
                  {post.user?.idUser === userId && (
                    <button className="delete-btn" onClick={() => handleDelete(post.idPost)}>
                      🗑️ Delete
                    </button>
                  )}
                </div>

                <div className="like-container">
                  <button
                    onClick={() => toggleLike(post.idPost)}
                    className={`like-btn ${isLiked ? 'liked' : ''}`}
                  >
                    {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>
                  <span className="like-count" style={{ color: likeCount === 0 ? 'gray' : 'black' }}>
                    {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer current="/" />
    </div>
  );
};

export default Home;
