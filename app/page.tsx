import { Suspense } from 'react';
import { getDirectory } from 'api/pokedex';
import PokeCard from '@/components/PokeCard';
import CardSkeleton from '../components/CardSkeleton';

export default async function Home() {
  const resourceList = await getDirectory(100, 600);

  return (
    <>
      <section className='min-w-screen top-[100px] grid w-full grid-flow-row-dense	 place-content-center	 place-items-center gap-2 px-8 py-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {resourceList.results.map((pokemon) => (
          <Suspense
            key={pokemon.name}
            fallback={<CardSkeleton name={pokemon.name} />}
          >
            {/* @ts-expect-error Server Component */}
            <PokeCard name={pokemon.name} key={pokemon.name} />
          </Suspense>
        ))}
      </section>
    </>
  );
}
