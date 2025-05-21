import React from 'react';
import squirtleImg from '../assets/Squirtle.jpg';
import '../styles/Login.css';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Bem-vindo de volta</h1>
        <p>Faça login para continuar no Pokesite</p>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
        <div className="register-link">
          Não possui conta?
          <a href="/register">Registre-se</a>
        </div>
      </div>
      <div className="login-image">
        <img src={squirtleImg} alt="Squirtle" />
      </div>
    </div>
  );
}
