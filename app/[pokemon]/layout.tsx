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
}: {
  params: { pokemon: string };
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
      {/* @ts-expect-error Server Component */}
      <PokemonPage promise={pokemon} />
    </article>
  );
}
