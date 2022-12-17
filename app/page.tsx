import { Suspense } from 'react';
import PokeCard from '@/app/(components)/PokeCard';
import PokeAPI from 'pokeapi-typescript';

async function getPokemon(name: string) {
  let data = await PokeAPI.Pokemon.fetch(name);
  return data;
}

async function getPokemonSpecies(name: string) {
  let data = await PokeAPI.PokemonSpecies.fetch(name);
  return data;
}

export default async function Home() {
  const pokemonList = [];
  const resourceList = await PokeAPI.Pokemon.list(150, 0);

  for (let pokemon of resourceList.results) {
    const pokemonBasic = getPokemon(pokemon.name);
    const pokemonSpecies = getPokemonSpecies(pokemon.name);
    const [basicData, speciesData] = await Promise.all([
      pokemonBasic,
      pokemonSpecies,
    ]);
    pokemonList.push({ ...basicData, ...speciesData });
  }

  return (
    <section className='min-w-screen top-[100px] grid grid-flow-row-dense	 place-content-center	 place-items-center gap-2 px-8 py-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      <Suspense
        fallback={
          <div className='m-8 flex h-96 w-60 animate-pulse flex-col rounded shadow-md sm:w-80'>
            <div className='h-48 rounded-t dark:bg-tertiary-700'></div>
            <div className='flex-1 space-y-4 px-4 py-8 dark:bg-tertiary-900 sm:p-8'>
              <div className='h-6 w-full rounded dark:bg-tertiary-700'></div>
              <div className='h-6 w-full rounded dark:bg-tertiary-700'></div>
              <div className='h-6 w-3/4 rounded dark:bg-tertiary-700'></div>
            </div>
          </div>
        }
      >
        {pokemonList.map((pokemon) => (
          <>
            {/* @ts-expect-error Server Component */}
            <PokeCard promise={pokemon} key={pokemon.name} />
          </>
        ))}
      </Suspense>
    </section>
  );
}
