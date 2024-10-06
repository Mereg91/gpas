import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openDB } from 'idb';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const db = await openDB('PasswordManagerDB', 1);
    const existingUser = await db.get('users', username);
    if (existingUser) {
      alert('El nombre de usuario ya existe');
      return;
    }

    await db.add('users', { username, password });
    alert('Usuario creado exitosamente');
    navigate('/');
  };

  return (
    <div className="create-user-container">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleCreateUser}>
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
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;