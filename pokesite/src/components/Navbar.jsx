import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PokéSite</Link>
      </div>
      <div className="navbar-links">
        <Link to="/pokemons">Pokémons</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/about">Perfil</Link>
      </div>
    </nav>
  );
};

export default Navbar;
