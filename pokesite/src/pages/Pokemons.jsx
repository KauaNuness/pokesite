import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Pokemons.css';
import { useNavigate } from 'react-router-dom';

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
      setNextUrl(res.data.next);

      const promises = res.data.results.map(p =>
        axios.get(p.url).then(res => res.data)
      );
      const dadosDetalhados = await Promise.all(promises);
      setPokemonList(prev => [...prev, ...dadosDetalhados]);
    } catch (err) {
      console.error('Erro ao buscar Pokémon:', err);
    }
  };

  return (
    <div className="pokemon-container">
      <h1>Pokédex</h1>
      <div className="pokemon-grid">
        {pokemonList.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <h3>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
            <button onClick={() => alert(`Você clicou em ${pokemon.name}`)}>
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
  );
};

export default Pokemons;
