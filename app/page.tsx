import { fetchPokemon } from '../api/pokeapi';
import PokeCard from '@/app/(components)/PokeCard';

export default async function Home() {
  let page = 0;
  let perPage = 1255;
  const directory = await fetchPokemon(page, perPage);
  console.log(directory);

  return (
    <>
      {directory
        .filter((pokemon) => pokemon.is_default)
        .map((pokemon) => (
          <PokeCard
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.image}
            description={pokemon.description}
            types={pokemon.types}
            key={pokemon.name}
          />
        ))}
    </>
  );
}
