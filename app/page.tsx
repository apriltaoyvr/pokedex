import { Suspense } from 'react';
import PokeAPI from 'pokeapi-typescript';
import PokeCard from '@/app/(components)/PokeCard';
import CardSkeleton from './(components)/PokeCard/skeleton';
import { PokemonType } from '@/types/api';

async function getPokemon(name: string) {
  let data = await PokeAPI.Pokemon.fetch(name);
  return data;
}

async function getPokemonSpecies(name: string) {
  let data = await PokeAPI.PokemonSpecies.fetch(name);
  return data;
}

export default async function Home() {
  const pokemonList: PokemonType[] = [];
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
    <>
      <div className='group relative z-0 my-[2rem] pt-8 w-2/5 max-w-lg'>
        <input
          type='text'
          name='pokemon-search'
          id='pokemon-search'
          className='dark:text-white peer block w-full appearance-none border-0 border-b-2 border-secondary-300 bg-transparent py-2.5 px-0 text-sm text-secondary-900 dark:text-secondary-100 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-secondary-600 dark:focus:border-primary-500'
        />
        <label
          htmlFor='pokemon-search'
          className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-secondary-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-primary-500 dark:text-secondary-400 peer-focus:dark:text-primary-400'
        >
          Search for a Pokemon
        </label>
      </div>
      <section className='min-w-screen top-[100px] grid grid-flow-row-dense	 place-content-center	 place-items-center gap-2 px-8 py-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        <Suspense fallback={<CardSkeleton />}>
          {pokemonList.map((pokemon) => (
            <>
              {/* @ts-expect-error Server Component */}
              <PokeCard promise={pokemon} key={pokemon.name} />
            </>
          ))}
        </Suspense>
      </section>
    </>
  );
}
