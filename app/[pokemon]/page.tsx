import { Suspense } from 'react';
import Image from 'next/image';
import { getPokemonBasic } from '@/api/pokedex';
import {
  IChainLink,
  IEvolutionChain,
  IPokemon,
  IPokemonSpecies,
} from 'pokeapi-typescript';
import Evolutions from './evolutions';
import PokeTypes from '../(components)/PokeTypes';
import CardSkeleton from '../(components)/CardSkeleton';

export interface PageProps extends IPokemon, IPokemonSpecies, IEvolutionChain {
  evolutionChain: IChainLink;
  hasForms: boolean;
}

export default async function PokemonPage(props: any) {
  let pokemon: PageProps = props.pokemon;
  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  const formArray: IPokemon[] = [];

  if (pokemon.hasForms) {
    for (let variation of pokemon.varieties) {
      const form = await getPokemonBasic(variation.pokemon.name);
      formArray.push(form);
    }
  }

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
        <section>
          <h2 className='mb-4 text-xl font-bold'>Varieties</h2>
          <div className='flex flex-row flex-wrap place-content-center place-items-center gap-4'>
            {formArray
              .filter((form) => form.is_default === false)
              .map((form) => (
                <Suspense
                  fallback={<CardSkeleton name={form.name} />}
                  key={form.name}
                >
                  <figure
                    className={`card flex flex-col place-content-center place-items-center`}
                  >
                    <h3 className='capitalize'>
                      {form.name.replaceAll('-', ' ')}
                    </h3>
                    <Image
                      src={form.sprites.front_default}
                      alt={form.name}
                      draggable={false}
                      width={96}
                      height={96}
                    />
                    <PokeTypes types={form.types} />
                  </figure>
                </Suspense>
              ))}
          </div>
        </section>
      )}
    </article>
  );
}
