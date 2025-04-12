import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';  // Importar Register

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Agregar ruta de registro */}
        {/* Aquí irán más rutas, como /home, /profile, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
