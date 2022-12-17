import { PokemonType } from '@/types/api';
import Image from 'next/image';

const PokemonPage = async ({ promise }: { promise: Promise<PokemonType> }) => {
  const pokemon = await promise;
  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='max-h-sm align-content-center flex min-h-full min-w-full max-w-sm flex-col	 justify-between gap-4 rounded-md p-6 text-center transition-all'>
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
      <main className='m-2 flex flex-row place-content-center place-items-center gap-4 capitalize'>
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
      </main>
      <footer>
        <p className='text-sm'>
          {description[description.length - 1].flavor_text}
        </p>
      </footer>
    </article>
  );
};

export default PokemonPage;
