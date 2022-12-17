import Link from 'next/link';
import Image from 'next/image';
import { PokemonType } from '@/types/api';

const PokeCard = async ({ promise }: any) => {
  const pokemon: PokemonType = await promise;

  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='max-h-sm align-content-center flex min-h-full min-w-full max-w-sm flex-col	 justify-between gap-4 rounded-md bg-neutral-200 p-6 text-center text-secondary-900 shadow-md	transition-all	hover:bg-secondary-100/90	hover:shadow-xl	dark:bg-secondary-700 dark:text-secondary-100 hover:dark:bg-secondary-700/90	'>
      <Link href={`/${pokemon.name}`}>
        <header className='flex flex-col place-content-center place-items-center gap-2'>
          <span className='text-2xl font-semibold capitalize	'>
            {pokemon.name}
          </span>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
            quality={100}
          />
        </header>
        <main>
          <p className='text-sm'>
            {description[description.length - 1].flavor_text}
          </p>
        </main>
        <footer className='m-2 flex flex-row place-content-center place-items-center gap-4 place-self-end capitalize'>
          {pokemon.types.map((type) => (
            <figure
              key={pokemon.name + type.type.name + type.slot}
              className={`bg-type-${type.type.name} rounded-full px-2 py-1 text-sm font-semibold shadow`}
            >
              <p className='text-neutral-800 transition-colors'>
                {type.type.name}
              </p>
            </figure>
          ))}
        </footer>
      </Link>
    </article>
  );
};

export default PokeCard;
