import PokeAPI, { IChainLink } from 'pokeapi-typescript';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageProps } from './page';
import CardSkeleton from '@/components/CardSkeleton';

export default async function Evolutions({ pokemon }: { pokemon: PageProps }) {
  const evolutionChain = pokemon.evolutionChain;
  const current = pokemon.name;

  return (
    <section>
      <h2 className='mb-4 text-xl font-bold'>Evolution Chain</h2>
      {await buildEvolutionTree(evolutionChain, current)}
    </section>
  );
}

async function buildEvolutionTree(evolutionChain: IChainLink, current: string) {
  const evolutions = [];

  for (let evolution of evolutionChain.evolves_to) {
    evolutions.push(await buildEvolutionTree(evolution, current));
  }

  let evData = await PokeAPI.Pokemon.fetch(evolutionChain.species.name);

  const content = (
    <Suspense fallback={<CardSkeleton name={evolutionChain.species.name} />}>
      <Link href={`/${evolutionChain.species.name}`}>
        <figure
          key={evolutionChain.species.name}
          className='flex flex-col place-content-center place-items-center gap-2'
        >
          <main
            className={`${
              evolutionChain.species.name == current
                ? 'current-evolution'
                : 'card'
            }`}
          >
            <span
              className={`capitalize ${
                evolutionChain.species.name == current
                  ? 'font-bold'
                  : 'font-semibold'
              }`}
            >
              {evolutionChain.species.name}
            </span>
            <Image
              width={96}
              height={96}
              alt={evolutionChain.species.name}
              src={evData.sprites.front_default}
            />
          </main>
          <div className='flex flex-row place-content-center gap-2'>
            {evolutions}
          </div>
        </figure>
      </Link>
    </Suspense>
  );
  return <article>{content}</article>;
}
