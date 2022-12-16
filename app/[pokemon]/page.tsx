import Body from './Body';
import Evolutions from './(forms)/Evolutions';

export default async function PokemonPage({
  params,
}: {
  params: { pokemon: string };
}) {
  const pData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemon}/`
  ).then((response) => response.json());
  const pSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params.pokemon}/`
  ).then((response) => response.json());
  const pEvolution = await fetch(pSpecies.evolution_chain.url).then((response) =>
    response.json()
  );

  const localizedArray = pSpecies.flavor_text_entries.filter(
    (entry: any) => entry.language.name === 'en'
  );

  const pokemon: PokemonDetailed = {
    name: pData.name,
    id: pData.id,
    image: pData.sprites.front_default,
    types: pData.types,
    description: localizedArray[localizedArray.length - 1].flavor_text,
    is_default: pData.is_default,
    evolves_from: pSpecies.evolves_from_species,
    evolves_to: pEvolution.chain.evolves_to,
    evolves_final: pEvolution.chain.species.name,
    varieties: pSpecies.varieties,
  };

  return (
    <>
      <Body pokemon={pokemon}></Body>
      {/* @ts-expect-error Server Component */}
      <Evolutions pokemon={pokemon}></Evolutions>
    </>
  );
}
