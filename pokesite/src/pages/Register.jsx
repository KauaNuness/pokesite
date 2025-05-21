import React from "react";
import { Link } from "react-router-dom";
import charmanderImg from "../assets/Charmander.jpg";
import "../styles/Register.css";

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Registro</h1>
        <p>Junte-se a nós!</p>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme a Senha" />
          <input type="date" placeholder="Data de Nascimento" />
          <select>
            <option value="">Gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
            <option value="prefiro-nao-dizer">Prefiro não dizer</option>
          </select>
          <button type="submit">Registrar</button>
        </form>
        <p className="login-link">
          Já possui conta?
          <Link to="/"> Faça login</Link>
        </p>
      </div>
      <div className="register-image">
        <img src={charmanderImg} alt="Charmander" />
      </div>
    </div>
  );
}
