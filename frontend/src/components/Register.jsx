import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';  // Import the register function from auth.js

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the backend to register the new user
      const response = await register(name, email, password);  // Call register API function
      console.log(response);  // Log the response for debugging
      alert('Registration successful!');
      navigate('/login');  // Redirect to the login page after successful registration
    } catch (error) {
      alert('Registration failed');
    }
  };

  // Navigate to the Login page
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={navigateToLogin}>Login here</button>
      </p>
    </div>
  );
};

export default Register;
