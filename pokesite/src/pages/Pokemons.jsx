import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Pokemons.css';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import bannerImg from '../assets/banner.jpg';
import Navbar from '../components/Navbar';

const tiposPT = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Grama',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada',
};

const traduzirTipo = (tipo) => tiposPT[tipo] || tipo;

const Pokemons = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buscarListaDePokemons('https://pokeapi.co/api/v2/pokemon?limit=20');
  }, []);

  const buscarListaDePokemons = async (url) => {
    try {
      const res = await axios.get(url);
      const promises = res.data.results.map(p =>
        axios.get(p.url).then(res => res.data)
      );
      const dadosDetalhados = await Promise.all(promises);
      const filtrados = dadosDetalhados.filter(pokemon => pokemon.id <= 151);

      setPokemonList(prev => {
        const mapa = new Map();
        prev.forEach(p => mapa.set(p.id, p));
        filtrados.forEach(p => mapa.set(p.id, p));
        return Array.from(mapa.values());
      });

      if (filtrados.length === dadosDetalhados.length && dadosDetalhados.every(p => p.id <= 151)) {
        setNextUrl(res.data.next);
      } else {
        setNextUrl(null);
      }
    } catch (err) {
      console.error('Erro ao buscar Pokémon:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pokemon-container">
        <div className="banner-section">
          <img src={bannerImg} alt="Banner Pokémon" className="banner-img" />
        </div>
        <h1 className="page-title">Pokédex</h1>
        <div className="pokemon-grid">
          {pokemonList.map(pokemon => (
            <div key={pokemon.id} className="pokemon-card">
              <h3>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p><strong>Tipo(s):</strong> {pokemon.types.map(t => traduzirTipo(t.type.name)).join(', ')}</p>
              <button onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
                Ver Pokémon
              </button>
            </div>
          ))}
        </div>
        {nextUrl && (
          <button className="load-button" onClick={() => buscarListaDePokemons(nextUrl)}>
            Carregar mais
          </button>
        )}
      </div>
    </>
  );
};

export default Pokemons;
