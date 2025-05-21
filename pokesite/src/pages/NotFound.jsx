import React from 'react';
import '../styles/NotFound.css';
import bulbasaurImg from '../assets/Bulbasaur.jpg';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Essa página se perdeu na floresta com o Bulbasaur!</p>
        <a href="/">Voltar para o início</a>
      </div>
      <div className="notfound-image">
        <img src={bulbasaurImg} alt="Bulbasaur perdido" />
      </div>
    </div>
  );
}