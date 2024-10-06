import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { openDB } from 'idb';
import { decrypt } from '../utils/encryption';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPasswords = async () => {
      const db = await openDB('PasswordManagerDB', 1);
      const allPasswords = await db.getAll('passwords');
      setPasswords(allPasswords);
    };
    fetchPasswords();
  }, []);

  const handleDelete = async (id) => {
    const db = await openDB('PasswordManagerDB', 1);
    await db.delete('passwords', id);
    setPasswords(passwords.filter(pwd => pwd.id !== id));
  };

  const filteredPasswords = passwords.filter(pwd =>
    pwd.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pwd.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Mis Contraseñas</h2>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredPasswords.map((pwd) => (
          <li key={pwd.id} className="password-item">
            <div>
              <strong>{pwd.website}</strong> - {pwd.username}
              <button onClick={() => alert(decrypt(pwd.password))} className="show-password">Mostrar Contraseña</button>
            </div>
            <div>
              <Link to={`/edit/${pwd.id}`} className="edit-button">Editar</Link>
              <button onClick={() => handleDelete(pwd.id)} className="delete-button">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/add" className="add-button">Agregar nueva contraseña</Link>
    </div>
  );
};

export default PasswordList;