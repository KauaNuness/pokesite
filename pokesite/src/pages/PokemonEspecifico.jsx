import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/PokemonEspecifico.css';

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

const coresPT = {
  black: 'Preto',
  blue: 'Azul',
  brown: 'Marrom',
  gray: 'Cinza',
  green: 'Verde',
  pink: 'Rosa',
  purple: 'Roxo',
  red: 'Vermelho',
  white: 'Branco',
  yellow: 'Amarelo',
};

const gruposDeOvoPT = {
  monster: 'Monstro',
  water1: 'Água 1',
  bug: 'Inseto',
  flying: 'Voador',
  ground: 'Terrestre',
  fairy: 'Fada',
  plant: 'Planta',
  'human-like': 'Humanoide',
  water3: 'Água 3',
  mineral: 'Mineral',
  amorphous: 'Amorfo',
  water2: 'Água 2',
  ditto: 'Ditto',
  dragon: 'Dragão',
  undiscovered: 'Desconhecido',
};

const crescimentoPT = {
  slow: 'Lento',
  medium: 'Médio',
  fast: 'Rápido',
  'medium-slow': 'Médio-Lento',
  'fast-then-very-slow': 'Rápido e depois muito lento',
  'slow-then-very-fast': 'Lento e depois muito rápido',
};

const metodosAprendizadoPT = {
  level_up: 'Nível',
  machine: 'Máquina (TM/HM)',
  egg: 'Ovo',
  tutor: 'Tutor',
};

const traduzirNome = (nome, dicionario) => dicionario[nome] || nome;

const traduzirHabilidade = (nome) => {
  return nome.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const traduzirGolpe = (nome) => {
  return nome.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const PokemonEspecifico = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const buscarPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);

        const speciesRes = await axios.get(res.data.species.url);
        setSpecies(speciesRes.data);
      } catch (err) {
        console.error('Erro ao buscar Pokémon específico:', err);
      }
    };

    buscarPokemon();
  }, [name]);

  if (!pokemon || !species) return <p>Carregando...</p>;

  const flavorText = species.flavor_text_entries.find(f => f.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || 'Sem descrição disponível.';

  const categoria = species.genera.find(g => g.language.name === 'pt')?.genus || '';

  return (
    <>
      <Navbar />
      <div className="pokemon-detalhes" style={{ padding: '2rem' }}>
        <h1>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>

        <img src={pokemon.sprites.front_default} alt={pokemon.name} />

        <p><strong>Tipo(s):</strong> {pokemon.types.map(t => traduzirNome(t.type.name, tiposPT)).join(', ')}</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => `${traduzirHabilidade(a.ability.name)}${a.is_hidden ? ' (oculta)' : ''}`).join(', ')}</p>
        <p><strong>Experiência base:</strong> {pokemon.base_experience}</p>

        <hr />

        <h2>Informações Biológicas</h2>
        <p><strong>Categoria:</strong> {categoria}</p>
        <p><strong>Cor:</strong> {traduzirNome(species.color.name, coresPT)}</p>
        <p><strong>Grupos de ovo:</strong> {species.egg_groups.map(g => traduzirNome(g.name, gruposDeOvoPT)).join(', ')}</p>
        <p><strong>Taxa de captura:</strong> {species.capture_rate}</p>
        <p><strong>Felicidade base:</strong> {species.base_happiness}</p>
        <p><strong>Crescimento:</strong> {traduzirNome(species.growth_rate.name, crescimentoPT)}</p>
        <p><strong>É lendário?</strong> {species.is_legendary ? 'Sim' : 'Não'}</p>
        <p><strong>É mítico?</strong> {species.is_mythical ? 'Sim' : 'Não'}</p>

        <hr />

        <h2>Descrição da Pokédex</h2>
        <p>{flavorText}</p>

        <hr />

        <h2>Estatísticas base</h2>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name}>
              <strong>{traduzirNome(stat.stat.name, {
                hp: 'HP',
                attack: 'Ataque',
                defense: 'Defesa',
                'special-attack': 'Ataque Especial',
                'special-defense': 'Defesa Especial',
                speed: 'Velocidade',
              })}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>

        <hr />

        <h2>Golpes</h2>
        <p><strong>Total:</strong> {pokemon.moves.length}</p>
        <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {pokemon.moves.map((moveObj, index) => (
            <li key={index}>
              {traduzirGolpe(moveObj.move.name)} ({traduzirNome(moveObj.version_group_details[0]?.move_learn_method.name, metodosAprendizadoPT)})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PokemonEspecifico;
