import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Pokemon } from '@/types/api';

const PokeCard = async ({ promise }: any) => {
  const pokemon: Pokemon = await promise;

  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='max-h-sm flex min-h-full min-w-full max-w-sm flex-col place-items-start	 justify-between gap-4 rounded-md bg-secondary-100/75 p-6 text-center text-secondary-900 shadow-md	transition-all	hover:bg-secondary-100/90	hover:shadow-xl	dark:bg-secondary-700 dark:text-secondary-100 hover:dark:bg-secondary-700/90	'>
      <Link href={`/`}>
        <header className='flex flex-col place-content-center place-items-center gap-2'>
          <span className='text-xl font-semibold capitalize	'>
            {pokemon.name}
          </span>
          <Suspense
            fallback={
              <div className='flex h-48 w-full items-center justify-center rounded bg-tertiary-300 dark:bg-tertiary-700 sm:w-96'>
                <svg
                  className='h-12 w-12 text-tertiary-200'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 640 512'
                >
                  <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                </svg>
              </div>
            }
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
            />
          </Suspense>
        </header>
        <main>
          <p className='text-sm'>
            {description[description.length - 1].flavor_text}
          </p>
        </main>
        <footer className='m-2 flex flex-row place-content-center place-items-center gap-4 capitalize '>
          {pokemon.types.map((type) => (
            <figure
              key={pokemon.name + type.type.name + type.slot}
              className={`bg-type-${type.type.name} rounded-full px-2 py-1 text-sm font-semibold shadow`}
            >
              <p className='dark:text-neutral-800'>{type.type.name}</p>
            </figure>
          ))}
        </footer>
      </Link>
    </article>
  );
};

export default PokeCard;
