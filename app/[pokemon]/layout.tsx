import PokemonPage from './page';
import PokeAPI, { IEvolutionChain } from 'pokeapi-typescript';
import { getPokemonBasic, getPokemonSpecies } from '@/api/pokedex'

export default async function SubpageLayout({
  params,
}: {
  params: { pokemon: string };
}) {
  let basicData, speciesData, hasForms;
  speciesData = await getPokemonSpecies(params.pokemon);

  try {
    basicData = await getPokemonBasic(params.pokemon);
  } catch (error) {
    basicData = await getPokemonBasic(speciesData.varieties[0].pokemon.name);
    hasForms = true;
  }

  const evolutionChain: IEvolutionChain = await fetch(
    speciesData.evolution_chain.url
  ).then((r) => r.json());

  const pokemon = {
    ...basicData,
    ...speciesData,
    evolutionChain: evolutionChain.chain,
    hasForms: hasForms,
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
