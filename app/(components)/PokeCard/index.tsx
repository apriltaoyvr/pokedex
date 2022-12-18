import Link from 'next/link';
import Image from 'next/image';
import { getPokemonDetails } from '@/api/pokedex';
import PokeTypes from '../PokeTypes';

const PokeCard = async ({ name }: {name: string}) => {
  const pokemon = await getPokemonDetails(name);

  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='max-h-sm align-content-center card flex min-h-full min-w-full max-w-sm	 flex-col justify-between gap-4'>
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
          />
        </header>
        <main>
          <p className='text-sm'>
            {description[description.length - 1].flavor_text}
          </p>
        </main>
        <PokeTypes types={pokemon.types} />
      </Link>
    </article>
  );
};

export default PokeCard;
