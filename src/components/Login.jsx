import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { openDB } from 'idb';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const db = await openDB('PasswordManagerDB', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'username' });
        db.createObjectStore('passwords', { keyPath: 'id', autoIncrement: true });
      },
    });

    const user = await db.get('users', username);
    if (user && user.password === password) {
      localStorage.setItem('currentUser', username);
      navigate('/passwords');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        <Link to="/create-user" className="create-user-button">Crear nuevo usuario</Link>
      </div>
    </div>
  );
};

export default Login;