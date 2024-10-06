import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import PasswordList from './components/PasswordList';
import AddPassword from './components/AddPassword';
import EditPassword from './components/EditPassword';
import ColorSelector from './components/ColorSelector';

function App() {
  const [theme, setTheme] = useState('default');

  return (
    <Router>
      <div className={`App ${theme}`}>
        <ColorSelector setTheme={setTheme} />
        <h1 className="main-title">Gestor de Contraseñas</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/passwords" element={<PasswordList />} />
          <Route path="/add" element={<AddPassword />} />
          <Route path="/edit/:id" element={<EditPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;