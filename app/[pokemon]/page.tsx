import { Suspense } from 'react';
import Image from 'next/image';
import {
  IChainLink,
  IEvolutionChain,
  IPokemon,
  IPokemonSpecies,
} from 'pokeapi-typescript';
import Evolutions from './evolutions';
import Forms from './forms';
import PokeTypes from '../../components/PokeTypes';
import CardSkeleton from '../../components/CardSkeleton';

export interface PageProps extends IPokemon, IPokemonSpecies, IEvolutionChain {
  evolutionChain: IChainLink;
  hasForms: boolean;
}

export default function PokemonPage(props: any) {
  let pokemon: PageProps = props.pokemon;
  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='align-content-center flex min-h-full min-w-full max-w-sm flex-col	 place-content-center place-items-center gap-4 rounded-md py-12 px-4 text-center transition-all'>
      <header className='flex flex-col place-content-center place-items-center gap-2'>
        <h1 className='text-3xl font-semibold capitalize	'>{pokemon.name}</h1>
        <span className='text-sm font-semibold'>Pokemon #{pokemon.id}</span>
      </header>
      <section>
        <Suspense>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            draggable='false'
            width={96}
            height={96}
          />
        </Suspense>
      </section>
      <section className='m-2 flex flex-row place-content-center place-items-center gap-4 capitalize'>
        <PokeTypes types={pokemon.types} />
      </section>
      <section className='mb-4'>
        <p className='m-w-prose'>
          {description[description.length - 1].flavor_text}
        </p>
      </section>
      {(pokemon.evolutionChain.evolves_to.length ||
        pokemon.evolves_from_species) && (
        <section>
          {/* @ts-expect-error Server Component */}
          <Evolutions pokemon={pokemon} />
        </section>
      )}

      {pokemon.hasForms && (
        <>
          {/* @ts-expect-error Server Component */}
          <Forms pokemon={pokemon} />
        </>
      )}
    </article>
  );
}
