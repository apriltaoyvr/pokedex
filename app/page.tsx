import { Suspense } from 'react';
import PokeCard from '@/app/(components)/PokeCard';
import Loading from './loading';

export default async function Home() {
  let page = 0;
  let perPage = 150;
  const directory = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/?offset=${
      page * perPage
    }&limit=${perPage}`
  );
  const data: Directory = await directory.json();

  const output: PokemonBasic[] = [];
  for (let result of data.results) {
    const pData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${result.name}/`
    ).then((response) => response.json());
    const pSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${result.name}/`
    ).then((response) => response.json());

    const pokemon: PokemonBasic = {
      name: pSpecies.name,
      id: pSpecies.id,
      image: pData.sprites.front_default,
      is_default: pData.is_default,
      types: pData.types,
      description: pSpecies.flavor_text_entries,
    };

    output.push(pokemon);
  }

  return (
    <Suspense fallback={<Loading />}>
      {output
        .filter((pokemon) => pokemon.is_default)
        .map((pokemon) => (
          <PokeCard
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.image}
            description={pokemon.description}
            types={pokemon.types}
            key={pokemon.description}
            is_default={true}
          />
        ))}
    </Suspense>
  );
}
