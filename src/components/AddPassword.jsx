import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openDB } from 'idb';
import { encrypt } from '../utils/encryption';

const AddPassword = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = await openDB('PasswordManagerDB', 1);
    await db.add('passwords', { 
      website, 
      username, 
      password: encrypt(password)
    });
    navigate('/passwords');
  };

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <h2>Agregar Nueva Contraseña</h2>
      <input
        type="text"
        placeholder="Sitio web/Aplicación"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="submit-button">Guardar</button>
    </form>
  );
};

export default AddPassword;