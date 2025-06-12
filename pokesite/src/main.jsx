import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Pokemons from './pages/Pokemons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} /> {/* 👈 rota 404 */}
        <Route path="/pokemons" element={<Pokemons />} /> {/* 👈 nova rota */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
