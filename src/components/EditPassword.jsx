import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { openDB } from 'idb';
import { encrypt, decrypt } from '../utils/encryption';

const EditPassword = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPassword = async () => {
      const db = await openDB('PasswordManagerDB', 1);
      const pwd = await db.get('passwords', parseInt(id));
      if (pwd) {
        setWebsite(pwd.website);
        setUsername(pwd.username);
        setPassword(decrypt(pwd.password));
      }
    };
    fetchPassword();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = await openDB('PasswordManagerDB', 1);
    await db.put('passwords', { 
      id: parseInt(id),
      website, 
      username, 
      password: encrypt(password)
    });
    navigate('/passwords');
  };

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <h2>Editar Contraseña</h2>
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
      <button type="submit" className="submit-button">Actualizar</button>
    </form>
  );
};

export default EditPassword;