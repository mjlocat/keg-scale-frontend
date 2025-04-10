import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './NavBar.css';

function NavBar() {
  const { token, logout } = useAuth();

  return (
    <nav className="NavBar">
      <Link to="/">Home</Link>
      {!token && (
        <Link to="/login">Login</Link>
      )}
      {token && (
        <Link to="/config">Config</Link>
      )}
      {token && (
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      )}
    </nav>
  );
}

export default NavBar;