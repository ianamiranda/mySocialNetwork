import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import SearchFriends from './components/SearchFriends';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserId(userData.idUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Home logout={logout} userId={userId} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={<Login loginCallback={login} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile userId={userId} /> : <Navigate to="/login" />}
        />
        <Route 
          path="/create-post" 
          element={isAuthenticated ? <CreatePost userId={userId} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/search-friends" 
          element={isAuthenticated ? <SearchFriends userId={userId} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
