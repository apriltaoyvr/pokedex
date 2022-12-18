import { Suspense } from 'react';
import { getPokemon, getPokemonSpecies, getDirectory } from 'api/pokedex';
import PokeCard from '@/app/(components)/PokeCard';
import CardSkeleton from './(components)/PokeCard/skeleton';


export default async function Home() {
  const pokemonList = [];
  const resourceList = await getDirectory(150);

  for (let pokemon of resourceList.results) {
    const pokemonBasic = getPokemon(pokemon.name);
    const pokemonSpecies = getPokemonSpecies(pokemon.name);
    if (!pokemonSpecies) continue;
    pokemonList.push({ pokemonBasic, pokemonSpecies, name: pokemon.name });
  }

  return (
    <>
      <section className='min-w-screen top-[100px] grid w-full grid-flow-row-dense	 place-content-center	 place-items-center gap-2 px-8 py-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {pokemonList.map((pokemon) => (
          <Suspense
            key={pokemon.name}
            fallback={<CardSkeleton name={pokemon.name} />}
          >
            {/* @ts-expect-error Server Component */}
            <PokeCard promise={pokemon} key={pokemon.name} />
          </Suspense>
        ))}
      </section>
    </>
  );
}
