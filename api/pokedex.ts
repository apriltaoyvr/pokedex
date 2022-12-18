import PokeAPI from 'pokeapi-typescript';

export async function getDirectory(amount: number | 'all', offset = 0) {
  let data;
  if (amount === 'all') {
    data = await PokeAPI.PokemonSpecies.listAll();
  } else {
    data = await PokeAPI.PokemonSpecies.list(amount, offset);
  }
  return data;
}

export async function getPokemon(name: string) {
  const data = await PokeAPI.Pokemon.fetch(name);
  return data;
}

export async function getPokemonSpecies(name: string) {
  const data = await PokeAPI.PokemonSpecies.fetch(name);
  return data;
}
