import Image from 'next/image';
import { Suspense } from 'react';
import CardSkeleton from '../../components/CardSkeleton';
import PokeTypes from '../../components/PokeTypes';
import { getPokemonBasic } from '@/api/pokedex';
import { PageProps } from './page';
import { IPokemon } from 'pokeapi-typescript';

export default async function Forms({ pokemon }: { pokemon: PageProps }) {
  const formArray: IPokemon[] = [];

  if (pokemon.hasForms) {
    for (let variation of pokemon.varieties) {
      const form = await getPokemonBasic(variation.pokemon.name);
      formArray.push(form);
    }
  }

  return (
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
                <h3 className='capitalize'>{form.name.replaceAll('-', ' ')}</h3>
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
  );
}
