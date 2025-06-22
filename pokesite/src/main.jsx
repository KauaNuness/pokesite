import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Pokemons from './pages/Pokemons';
import PokemonEspecifico from './pages/PokemonEspecifico';
import PrivateRoute from './routes/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Protegidas */}
        <Route
          path="/pokemons"
          element={
            <PrivateRoute>
              <Pokemons />
            </PrivateRoute>
          }
        />
        <Route
          path="/pokemon/:name"
          element={
            <PrivateRoute>
              <PokemonEspecifico />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
