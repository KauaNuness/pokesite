import React, { useState, useEffect } from 'react';
import squirtleImg from '../assets/Squirtle.jpg';
import '../styles/Login.css';

export default function Login() {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('Email ou senha inválidos');
      }

      const token = await response.text();
      localStorage.setItem('token', token);
      setMensagem('Login realizado com sucesso! Redirecionando...');

      setTimeout(() => {
        window.location.href = '/pokemons';
      }, 1500);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Bem-vindo de volta</h1>
        <p>Faça login para continuar no Pokesite</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="register-link">
          Não possui conta? <a href="/register">Registre-se</a>
        </div>
      </div>
      <div className="login-image">
        <img src={squirtleImg} alt="Squirtle" />
      </div>
    </div>
  );
}
