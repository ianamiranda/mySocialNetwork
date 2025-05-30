import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import SearchFriends from './components/SearchFriends';
import UserProfile from './components/UserProfile'; 
import Messages from './components/Messages';
import GroupMessages from './components/GroupMessages';
import Notifications from './components/Notifications';

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
        {/* Ruta de Home sin logout */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home userId={userId} /> : <Navigate to="/login" />} 
        />

        {/* Ruta de Login */}
        <Route 
          path="/login" 
          element={<Login loginCallback={login} />} 
        />

        {/* Ruta de Registro */}
        <Route 
          path="/register" 
          element={<Register />} 
        />

        {/* Ruta de Profile con logout */}
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile userId={userId} logout={logout} /> : <Navigate to="/login" />}
        />

        {/* Ruta para Crear un Post */}
        <Route 
          path="/create-post" 
          element={isAuthenticated ? <CreatePost userId={userId} /> : <Navigate to="/login" />} 
        />

        {/* Ruta para Buscar Amigos */}
        <Route 
          path="/search-friends" 
          element={isAuthenticated ? <SearchFriends userId={userId} /> : <Navigate to="/login" />} 
        />

        {/* Ruta para Ver el Perfil de Otro Usuario */}
        <Route 
          path="/user-profile/:id" 
          element={isAuthenticated ? <UserProfile userId={userId} /> : <Navigate to="/login" />}
        />
        <Route 
          path="/messages"
          element={isAuthenticated ? <Messages userId={userId} /> : <Navigate to="/login" />}
        />  
        <Route
          path="/messages/group/:idGroup"
          element={isAuthenticated ? <GroupMessages userId={userId} /> : <Navigate to="/login" />}
        />

        <Route
          path="/notifications"
          element={isAuthenticated ? <Notifications userId={userId} /> : <Navigate to="/login" />}
        />

      </Routes>
    </Router>
  );
};

export default App;