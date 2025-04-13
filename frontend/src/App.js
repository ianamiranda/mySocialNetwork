import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Home logout={logout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={<Login loginCallback={login} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
