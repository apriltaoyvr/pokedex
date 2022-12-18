import { PokemonType } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';
import PokeAPI, { IChainLink } from 'pokeapi-typescript';

const PokemonPage = async ({ pokemon }: { pokemon: PokemonType }) => {
  const description = pokemon.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  );

  return (
    <article className='align-content-center flex min-h-full min-w-full max-w-sm flex-col	 place-content-center place-items-center gap-4 rounded-md py-12 px-4 text-center transition-all'>
      <header className='flex flex-col place-content-center place-items-center gap-2'>
        <h1 className='text-3xl font-semibold capitalize	'>
          {pokemon.name}
        </h1>
        <span className="text-sm font-semibold"> 
          Pokemon #{pokemon.id}
        </span>
      </header>
      <section>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
          quality={100}
          draggable='false'
        />
      </section>
      <section className='m-2 flex flex-row place-content-center place-items-center gap-4 capitalize'>
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
      </section>
      <section className='mb-4'>
        <p className='m-w-prose'>
          {description[description.length - 1].flavor_text}
        </p>
      </section>
      <footer>
        <h2 className='mb-4 text-lg font-semibold'>Evolution Chain</h2>
        {!(
          !pokemon.evolutionChain.evolves_to.length &&
          !pokemon.evolves_from_species
        ) && (await buildEvolutionTree(pokemon.evolutionChain, pokemon.name))}
      </footer>
    </article>
  );
};

export default PokemonPage;

async function buildEvolutionTree(evolutionChain: IChainLink, current: string) {
  const evolutions = [];

  for (let evolution of evolutionChain.evolves_to) {
    evolutions.push(await buildEvolutionTree(evolution, current));
  }

  const evData = await PokeAPI.Pokemon.fetch(evolutionChain.species.name);
  const content = (
    <Link href={`/${evolutionChain.species.name}`}>
      <figure
        key={evolutionChain.species.name}
        className='flex flex-col place-content-center place-items-center gap-2'
      >
        <main
          className={`${
            evolutionChain.species.name == current
              ? 'current-evolution'
              : 'other-evolution'
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
            alt={'a'}
            src={evData.sprites.front_default}
          ></Image>
        </main>
        <div className='flex flex-row place-content-center gap-2'>
          {evolutions}
        </div>
      </figure>
    </Link>
  );
  return <>{content}</>;
}
