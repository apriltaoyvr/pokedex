import Link from 'next/link';
import Image from 'next/image';
import { PokemonType } from '@/types/api';

const PokeCard = async ({ promise }: any) => {
  const pokemonBasic = await promise.pokemonBasic;
  const pokemonSpecies = await promise.pokemonSpecies;
  const pokemon: PokemonType = { ...pokemonBasic, ...pokemonSpecies };

  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='max-h-sm align-content-center flex min-h-full min-w-full max-w-sm flex-col	 justify-between gap-4 rounded-md border border-secondary-300/50 bg-secondary-200/25 p-6 text-center text-secondary-800 shadow-md	transition-all	hover:bg-secondary-200/50	hover:shadow-xl	dark:border-secondary-700/50 dark:bg-secondary-700/10 dark:text-secondary-100	hover:dark:bg-secondary-700/50'>
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
