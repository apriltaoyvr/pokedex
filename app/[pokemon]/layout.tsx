import PokemonPage from './page';
import PokeAPI, { IEvolutionChain } from 'pokeapi-typescript';

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
  let basicData, speciesData;
  speciesData = await getPokemonSpecies(params.pokemon);

  try {
    basicData = await getPokemon(params.pokemon);
  } catch (error) {
    basicData = await getPokemon(speciesData.varieties[0].pokemon.name);
  }

  const evolutionChain: IEvolutionChain = await fetch(
    speciesData.evolution_chain.url
  ).then((r) => r.json());

  const pokemon = {
    ...basicData,
    ...speciesData,
    evolutionChain: evolutionChain.chain,
  };

  return (
    <>
      <main className='m-h-full flex w-full place-content-center place-items-center'>
        {/* @ts-expect-error Server Component */}
        <PokemonPage pokemon={pokemon} />
      </main>
    </>
  );
}
