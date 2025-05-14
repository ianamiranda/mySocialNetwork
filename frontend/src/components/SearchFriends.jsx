import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SearchFriends.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const SearchFriends = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchFollows();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/user/all');
      setUsers(res.data.filter(u => u.idUser !== userId));
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const fetchFollows = async () => {
    try {
      const followedRes = await axios.get(`http://localhost:8080/api/follow/followed/${userId}`);
      const followedIds = followedRes.data.map(f => f.followed.idUser);
      setFriends(followedIds);
      setFollowed(followedRes.data);

      const followersRes = await axios.get(`http://localhost:8080/api/follow/followers/${userId}`);
      setFollowers(followersRes.data);
    } catch (err) {
      console.error("Error fetching follows", err);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user-profile/${userId}`);
  };

  const handleFollow = async (targetUserId, e) => {
    e.stopPropagation();
    try {
      console.log("Sending follow request from", userId, "to", targetUserId);
      await axios.post('http://localhost:8080/api/follow', {
        followerId: userId,
        followedId: targetUserId,
      });
      await axios.post('http://localhost:8080/api/notifications/createFollow', {
        targetUserId: targetUserId ,
        actorUserId: userId
      });
      fetchFollows();
    } catch (err) {
      console.error("Error following user", err);
    }
  };

  const handleUnfollow = async (targetUserId, e) => {
    e.stopPropagation();
    try {
      console.log("Sending unfollow request from", userId, "to", targetUserId);
      await axios.delete('http://localhost:8080/api/follow', {
        params: {
          followerId: userId,
          followedId: targetUserId,
        },
      });
      fetchFollows();
    } catch (err) {
      console.error("Error unfollowing user", err);
    }
  };

  const renderUserCard = (user, isFriendAction = false) => (
    <div key={user.idUser} className="user-card" onClick={() => handleUserClick(user.idUser)}>
      <div className="user-image">
        {user.imgUser ? (
          <img
            src={user.imgUser}
            alt={user.nameUser}
            className="profile-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
            }}
          />
        ) : (
          <FaUserCircle size={60} />
        )}
      </div>

      <div className="user-info">
        <h4>{user.nameUser}</h4>
        <p>{user.descriptionUser}</p>
      </div>

      {isFriendAction && (
        <div className="action-btn">
          {friends.includes(user.idUser) ? (
            <button className="remove-btn" onClick={(e) => handleUnfollow(user.idUser, e)}>Unfollow friend</button>
          ) : (
            <button className="add-btn" onClick={(e) => handleFollow(user.idUser, e)}>Add friend</button>
          )}
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === 'all') {
      return users
        .filter(user => user.nameUser.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => renderUserCard(user, true));
    } else if (activeTab === 'followers') {
      return followers.length === 0 ? (
        <p>No followers yet.</p>
      ) : (
        followers.map(f => renderUserCard(f.follower))
      );
    } else if (activeTab === 'followed') {
      return followed.length === 0 ? (
        <p>You haven't added anyone yet.</p>
      ) : (
        followed.map(f => renderUserCard(f.followed))
      );
    }
  };

  return (
    <div className="search-friends-container">
      <h2 className="search-title">Search Friends</h2>

      <div className="filter-buttons">
        <button onClick={() => setActiveTab('all')}>All Users</button>
        <button onClick={() => setActiveTab('followers')}>Followers</button>
        <button onClick={() => setActiveTab('followed')}>Followed</button>
      </div>

      {activeTab === 'all' && (
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="user-list">
        {renderTabContent()}
      </div>

      <Footer active="search" />
    </div>
  );
};

export default SearchFriends;
