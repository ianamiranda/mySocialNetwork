import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';  // Import the login function from auth.js

const Login = ({ loginCallback }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);  // Call login API function
      console.log('Login response:', response);

      // Mostrar el ID del usuario si está presente en la respuesta
      if (response && response.idUser) {
        console.log('Usuario logueado con ID:', response.idUser);
      } else {
        console.log('No se recibió ID de usuario en la respuesta.');
      }

      loginCallback();  // Update the authentication state
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
      console.error('Error en login:', error.response?.data || error.message);
    }
  };

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
