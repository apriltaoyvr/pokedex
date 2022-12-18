import PokeAPI from 'pokeapi-typescript';

export async function getDirectory(amount: number | 'all', offset = 0) {
  let data;

  try {
    if (amount === 'all') {
      data = await PokeAPI.PokemonSpecies.listAll();
    } else {
      data = await PokeAPI.PokemonSpecies.list(amount, offset);
    }
  } catch {
    throw new Error('Failed to fetch directory data');
  }

  return data;
}

export async function getPokemonBasic(name: string) {
  let data;

  data = await PokeAPI.Pokemon.fetch(name);

  return data;
}

export async function getPokemonSpecies(name: string) {
  let data;

  try {
    data = await PokeAPI.PokemonSpecies.fetch(name);
  } catch {
    throw new Error('Failed to fetch species data');
  }

  return data;
}

export async function getPokemonDetails(name: string) {
  let pokemonBasic, pokemonSpecies;
  pokemonSpecies = await getPokemonSpecies(name);

  try {
    pokemonBasic = await getPokemonBasic(name);
  } catch (error) {
    try {
      pokemonBasic = await getPokemonBasic(
        pokemonSpecies.varieties[0].pokemon.name
      );
    } catch {
      throw new Error('Failed to fetch data');
    }
  }

  return { ...pokemonBasic, ...pokemonSpecies };
}
