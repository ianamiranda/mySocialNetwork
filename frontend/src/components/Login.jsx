import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';  // Import the login function from auth.js

const Login = ({ loginCallback }) => {  // Pass the loginCallback prop to set authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);  // Call login API function
      console.log(response);  // Log the response for debugging
      loginCallback();  // Update the authentication state
      navigate('/');  // Redirect to the home page after successful login
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  // Navigate to the Register page
  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={navigateToRegister}>Register here</button>
      </p>
    </div>
  );
};

export default Login;
