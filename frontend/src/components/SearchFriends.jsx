import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SearchFriends.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import Footer from './Footer';

const SearchFriends = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchUsers();
    fetchFollows();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/user/all');
      setUsers(res.data.filter(u => u.idUser !== userId));
    } catch (err) {}
  };

  const fetchFollows = async () => {
    try {
      const followedRes = await axios.get(`http://localhost:8080/api/follow/followed/${userId}`);
      const followedIds = followedRes.data.map(f => f.followed.idUser);
      setFriends(followedIds);
      setFollowed(followedRes.data);

      const followersRes = await axios.get(`http://localhost:8080/api/follow/followers/${userId}`);
      setFollowers(followersRes.data);
    } catch (err) {}
  };

  const handleAddFriend = async (targetUserId) => {
    try {
      await axios.post('http://localhost:8080/api/follow', {
        followerId: userId,
        followedId: targetUserId
      });
      fetchFollows();
    } catch (err) {}
  };

  const handleRemoveFriend = async (targetUserId) => {
    try {
      await axios.delete('http://localhost:8080/api/follow', {
        params: {
          followerId: userId,
          followedId: targetUserId
        }
      });
      fetchFollows();
    } catch (err) {}
  };

  const filteredUsers = users.filter(user =>
    (user.nameUser || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUserCard = (user, isFriendAction = false) => (
    <div key={user.idUser} className="user-card">
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
            <button className="remove-btn" onClick={() => handleRemoveFriend(user.idUser)}>Unfollow friend</button>
          ) : (
            <button className="add-btn" onClick={() => handleAddFriend(user.idUser)}>Add friend</button>
          )}
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === 'all') {
      return filteredUsers.map(user => renderUserCard(user, true));
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
