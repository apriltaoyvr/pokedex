import PokemonPage from './page';
import PokeAPI from 'pokeapi-typescript';

async function getPokemon(name: string) {
  let data = await PokeAPI.Pokemon.fetch(name);
  return data;
}

async function getPokemonSpecies(name: string) {
  let data = await PokeAPI.PokemonSpecies.fetch(name);
  return data;
}

export default async function SubpageLayout({
  params,
  children,
}: {
  params: { pokemon: string };
  children: React.ReactNode;
}) {
  const pokemonBasic = getPokemon(params.pokemon);
  const pokemonSpecies = getPokemonSpecies(params.pokemon);
  const [basicData, speciesData] = await Promise.all([
    pokemonBasic,
    pokemonSpecies,
  ]);

  const pokemon = { ...basicData, ...speciesData };

  return (
    <article>
      <PokemonPage promise={pokemon} />
    </article>
  );
}
